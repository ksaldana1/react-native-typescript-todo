import { TodoItem } from '../types/domain';
import { ActionTypes, TodoActions } from './actions';

export interface TodoState { items: TodoItem[] }
const initialState: TodoState = {
  items: [],
};

export default function(state: TodoState = initialState, action: TodoActions) {
  switch (action.type) {
    case ActionTypes.REMOVE_ITEM: {
      return {
        items: state.items.filter(item => item.label !== action.payload.label),
      };
    }
    case ActionTypes.TOGGLE_ITEM_COMPLETED: {
      return {
        items: state.items.map(item => {
          if (item.label === action.payload.label) {
            return { label: item.label, completed: !item.completed };
          }
          return item;
        }),
      };
    }
    case ActionTypes.REMOVE_COMPLETED: {
      return {
        items: state.items.filter(item => !item.completed),
      };
    }
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
