import { ActionsObservable, combineEpics } from 'redux-observable';
import { Observable } from 'rxjs/Rx';
import { Todo } from '../types/domain';
import {
  ToggleItemCompletedAction,
  FetchAction,
  RemoveCompletedAction,
  RequestFailAction,
  AddItemAction,
  ActionTypes,
  ActionCreators,
  TodoActions,
  RemoveItemAction,
} from './actions';

type Action$ = ActionsObservable<{ type: ActionTypes }>;

export const fetch$ = (svc: Todo.Fetcher) => (action$: Action$) => {
  return action$
    .ofType(ActionTypes.FETCH_TODOS)
    .switchMap(async (action: FetchAction) => {
      try {
        const response = await svc.fetchItems();
        return ActionCreators.setTodos(response);
      } catch (e) {
        return ActionCreators.requestFailed('Fetch Failed');
      }
    });
};

export const add$ = (svc: Todo.Adder) => (action$: Action$) => {
  return action$.ofType(ActionTypes.ADD_ITEM).mergeMap(async (action: AddItemAction) => {
    try {
      const response = await svc.addItem(action.payload.label);
      return ActionCreators.setTodos(response);
    } catch (e) {
      return ActionCreators.requestFailed('Add Item Failed');
    }
  });
};

export const delete$ = (svc: Todo.Deleter) => (action$: Action$) => {
  return action$
    .ofType(ActionTypes.REMOVE_ITEM)
    .mergeMap(async (action: RemoveItemAction) => {
      try {
        const response = await svc.deleteItem(action.payload.id);
        return ActionCreators.setTodos(response);
      } catch (e) {
        return ActionCreators.requestFailed('Delete Item Failed');
      }
    });
};

export const toggle$ = (svc: Todo.Toggler) => (action$: Action$) => {
  return action$
    .ofType(ActionTypes.TOGGLE_ITEM_COMPLETED)
    .mergeMap(async (action: ToggleItemCompletedAction) => {
      try {
        const response = await svc.toggleItem(action.payload.id);
        return ActionCreators.setTodos(response);
      } catch (e) {
        return ActionCreators.requestFailed('Toggle Item Failed');
      }
    });
};

export const clear$ = (svc: Todo.Clearer) => (action$: Action$) => {
  return action$
    .ofType(ActionTypes.REMOVE_COMPLETED)
    .switchMap(async (action: RemoveCompletedAction) => {
      try {
        const response = await svc.clearCompletedItems();
        return ActionCreators.setTodos(response);
      } catch (e) {
        return ActionCreators.requestFailed('Clear Items Failed');
      }
    });
};

const error$ = (action$: Action$) => {
  return action$
    .ofType(ActionTypes.REQUEST_FAILED)
    .switchMap((action: RequestFailAction) => {
      return Observable.of(ActionCreators.clearError()).delay(3000);
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
