import { ActionsObservable, combineEpics } from 'redux-observable';
import { AddItemAction, ActionTypes, ActionCreators } from './actions';
import 'rxjs';

type Action = { type: string; payload?: any };

const addTodoEpic = (action$: ActionsObservable<Action>) => {
  return action$
    .ofType(ActionTypes.ADD_ITEM)
    .mergeMap(async (action: AddItemAction) => {
      const response = await fetch('http://localhost:4000/todo', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ label: action.payload }),
      });
      return await response.json();
    })
    .map(results => {
      return ActionCreators.setTodos(results);
    });
};

export const rootEpic = combineEpics(addTodoEpic);
