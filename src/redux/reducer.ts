import { Todo } from '../types/domain';
import { TodoAction } from './actions';

export interface TodoState {
  items: Todo.Item[];
  error: boolean;
  errorMsg: string;
}
const initialState: TodoState = {
  items: [],
  error: false,
  errorMsg: '',
};

export default function(state: TodoState = initialState, action: TodoAction.AllActions) {
  switch (action.type) {
    case TodoAction.Constants.SET_TODOS: {
      return {
        items: action.payload,
      };
    }
    case TodoAction.Constants.REQUEST_FAILED: {
      return {
        ...state,
        error: true,
        errorMsg: action.payload,
      };
    }
    case TodoAction.Constants.CLEAR_ERROR: {
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
