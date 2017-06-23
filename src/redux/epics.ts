import { ActionsObservable, combineEpics } from 'redux-observable';
import {
  AddItemAction,
  ActionTypes,
  ActionCreators,
  TodoActions,
  RemoveItemAction,
} from './actions';
import 'rxjs';
import { TodoService } from '../services/TodoService';
import { ToggleItemCompletedAction, FetchAction, RemoveCompletedAction } from './actions';

const fetch$ = (svc: TodoService) => (action$: ActionsObservable<TodoActions>) => {
  return action$
    .ofType(ActionTypes.FETCH_TODOS)
    .mergeMap(async (action: FetchAction) => {
      try {
        const response = await svc.fetchItems();
        return response;
      } catch (e) {
        console.error('handle errors better', e);
      }
    })
    .map(results => {
      return ActionCreators.setTodos(results);
    });
};

const add$ = (svc: TodoService) => (action$: ActionsObservable<TodoActions>) => {
  return action$
    .ofType(ActionTypes.ADD_ITEM)
    .mergeMap(async (action: AddItemAction) => {
      try {
        const response = await svc.addItem(action.payload.label);
        return response;
      } catch (e) {
        console.error('handle errors better', e);
      }
    })
    .map(results => {
      return ActionCreators.setTodos(results);
    });
};

const delete$ = (svc: TodoService) => (action$: ActionsObservable<TodoActions>) => {
  return action$
    .ofType(ActionTypes.REMOVE_ITEM)
    .mergeMap(async (action: RemoveItemAction) => {
      try {
        const response = await svc.deleteItem(action.payload.id);
        return response;
      } catch (e) {
        console.error('handle errors better', e);
      }
    })
    .map(results => {
      return ActionCreators.setTodos(results);
    });
};

const toggle$ = (svc: TodoService) => (action$: ActionsObservable<TodoActions>) => {
  return action$
    .ofType(ActionTypes.TOGGLE_ITEM_COMPLETED)
    .mergeMap(async (action: ToggleItemCompletedAction) => {
      try {
        const response = await svc.toggleItem(action.payload.id);
        return response;
      } catch (e) {
        console.error('handle errors better', e);
      }
    })
    .map(results => {
      return ActionCreators.setTodos(results);
    });
};

const clear$ = (svc: TodoService) => (action$: ActionsObservable<TodoActions>) => {
  return action$
    .ofType(ActionTypes.REMOVE_COMPLETED)
    .mergeMap(async (action: RemoveCompletedAction) => {
      try {
        const response = await svc.clearItems();
        return response;
      } catch (e) {
        console.error('handle errors better', e);
      }
    })
    .map(results => {
      return ActionCreators.setTodos(results);
    });
};

const svc = new TodoService();
export default combineEpics(
  add$(svc),
  delete$(svc),
  clear$(svc),
  toggle$(svc),
  fetch$(svc)
);
