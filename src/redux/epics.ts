import { ActionsObservable, combineEpics } from 'redux-observable';
import {
  AddItemAction,
  ActionTypes,
  ActionCreators,
  TodoActions,
  RemoveItemAction,
} from './actions';
import { Observable } from 'rxjs/Rx';
import { TodoService } from '../services/TodoService';
import {
  ToggleItemCompletedAction,
  FetchAction,
  RemoveCompletedAction,
  RequestFailAction,
} from './actions';

const fetch$ = (svc: TodoService) => (action$: ActionsObservable<TodoActions>) => {
  return action$.ofType(ActionTypes.FETCH_TODOS).mergeMap(async (action: FetchAction) => {
    try {
      const response = await svc.fetchItems();
      return ActionCreators.setTodos(response);
    } catch (e) {
      return ActionCreators.requestFailed('Fetch Failed');
    }
  });
};

const add$ = (svc: TodoService) => (action$: ActionsObservable<TodoActions>) => {
  return action$.ofType(ActionTypes.ADD_ITEM).mergeMap(async (action: AddItemAction) => {
    try {
      const response = await svc.addItem(action.payload.label);
      return ActionCreators.setTodos(response);
    } catch (e) {
      return ActionCreators.requestFailed('Add Item Failed');
    }
  });
};

const delete$ = (svc: TodoService) => (action$: ActionsObservable<TodoActions>) => {
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

const toggle$ = (svc: TodoService) => (action$: ActionsObservable<TodoActions>) => {
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

const clear$ = (svc: TodoService) => (action$: ActionsObservable<TodoActions>) => {
  return action$
    .ofType(ActionTypes.REMOVE_COMPLETED)
    .mergeMap(async (action: RemoveCompletedAction) => {
      try {
        const response = await svc.clearItems();
        return ActionCreators.setTodos(response);
      } catch (e) {
        return ActionCreators.requestFailed('Clear Items Failed');
      }
    });
};

const error$ = (action$: ActionsObservable<TodoActions>) => {
  return action$
    .ofType(ActionTypes.REQUEST_FAILED)
    .mergeMap((action: RequestFailAction) => {
      return Observable.of(ActionCreators.clearError()).delay(3000);
    });
};

const svc = new TodoService();
export default combineEpics(
  add$(svc),
  delete$(svc),
  clear$(svc),
  toggle$(svc),
  fetch$(svc),
  error$
);
