import { TodoItem } from '../types/domain';
import { ActionTypes, TodoActions } from './actions';

export interface TodoState { items: TodoItem[] }
const initialState: TodoState = {
  items: [],
};

export default function(state: TodoState = initialState, action: TodoActions) {
  switch (action.type) {
    case ActionTypes.SET_TODOS: {
      return {
        items: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
