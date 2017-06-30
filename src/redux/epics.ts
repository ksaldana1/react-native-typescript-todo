import { ActionsObservable, combineEpics } from 'redux-observable';
import { Observable } from 'rxjs/Rx';
import { Todo } from '../types/domain';
import { TodoAction } from './actions';

type Action$ = ActionsObservable<{ type: TodoAction.Constants }>;

export const fetch$ = (svc: Todo.Fetcher) => (action$: Action$) => {
  return action$
    .ofType(TodoAction.Constants.FETCH_TODOS)
    .switchMap(async (action: TodoAction.Types.Fetch) => {
      try {
        const response = await svc.fetchItems();
        return TodoAction.Creators.setTodos(response);
      } catch (e) {
        return TodoAction.Creators.requestFailed('Fetch Failed');
      }
    });
};

export const add$ = (svc: Todo.Adder) => (action$: Action$) => {
  return action$
    .ofType(TodoAction.Constants.ADD_ITEM)
    .mergeMap(async (action: TodoAction.Types.AddItem) => {
      try {
        const response = await svc.addItem(action.payload.label);
        return TodoAction.Creators.setTodos(response);
      } catch (e) {
        return TodoAction.Creators.requestFailed('Add Item Failed');
      }
    });
};

export const delete$ = (svc: Todo.Deleter) => (action$: Action$) => {
  return action$
    .ofType(TodoAction.Constants.REMOVE_ITEM)
    .mergeMap(async (action: TodoAction.Types.RemoveItem) => {
      try {
        const response = await svc.deleteItem(action.payload.id);
        return TodoAction.Creators.setTodos(response);
      } catch (e) {
        return TodoAction.Creators.requestFailed('Delete Item Failed');
      }
    });
};

export const toggle$ = (svc: Todo.Toggler) => (action$: Action$) => {
  return action$
    .ofType(TodoAction.Constants.TOGGLE_ITEM)
    .mergeMap(async (action: TodoAction.Types.ToggleItem) => {
      try {
        const response = await svc.toggleItem(action.payload.id);
        return TodoAction.Creators.setTodos(response);
      } catch (e) {
        return TodoAction.Creators.requestFailed('Toggle Item Failed');
      }
    });
};

export const clear$ = (svc: Todo.Clearer) => (action$: Action$) => {
  return action$
    .ofType(TodoAction.Constants.REMOVE_COMPLETED)
    .switchMap(async (action: TodoAction.Types.RemoveCompleted) => {
      try {
        const response = await svc.clearCompletedItems();
        return TodoAction.Creators.setTodos(response);
      } catch (e) {
        return TodoAction.Creators.requestFailed('Clear Items Failed');
      }
    });
};

export const error$ = (action$: Action$) => {
  return action$
    .ofType(TodoAction.Constants.REQUEST_FAILED)
    .switchMap((action: TodoAction.Types.RequestFail) => {
      return Observable.of(TodoAction.Creators.clearError()).delay(3000);
    });
};

import TodoService from '../services/TodoService';
export default combineEpics(
  add$(TodoService),
  delete$(TodoService),
  clear$(TodoService),
  toggle$(TodoService),
  fetch$(TodoService),
  error$
);
