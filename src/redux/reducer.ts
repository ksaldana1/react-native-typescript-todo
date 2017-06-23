import { TodoItem } from '../types/domain';
import { ActionTypes, TodoActions } from './actions';

export interface TodoState { items: TodoItem[]; error: boolean; errorMsg: string }
const initialState: TodoState = {
  items: [],
  error: false,
  errorMsg: '',
};

export default function(state: TodoState = initialState, action: TodoActions) {
  switch (action.type) {
    case ActionTypes.SET_TODOS: {
      return {
        items: action.payload,
      };
    }
    case ActionTypes.REQUEST_FAILED: {
      return {
        ...state,
        error: true,
        errorMsg: action.payload,
      };
    }
    case ActionTypes.CLEAR_ERROR: {
      return {
        ...state,
        error: false,
        errorMsg: '',
      };
    }
    default: {
      return state;
    }
  }
}
