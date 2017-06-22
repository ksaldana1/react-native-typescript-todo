import { TodoItem } from '../types/domain';

export enum ActionTypes {
  ADD_ITEM = 'ADD_ITEM',
  REMOVE_ITEM = 'REMOVE_ITEM',
  TOGGLE_ITEM_COMPLETED = 'TOGGLE_ITEM_COMPLETED',
  REMOVE_COMPLETED = 'REMOVE_COMPLETED',
}

type AddItemAction = { type: ActionTypes.ADD_ITEM; payload: string };
const addItem = (label: string): AddItemAction => {
  return { type: ActionTypes.ADD_ITEM, payload: label };
};

type RemoveItemAction = { type: ActionTypes.REMOVE_ITEM; payload: TodoItem };
const removeItem = (item: TodoItem): RemoveItemAction => {
  return { type: ActionTypes.REMOVE_ITEM, payload: item };
};

type ToggleItemCompletedAction = {
  type: ActionTypes.TOGGLE_ITEM_COMPLETED;
  payload: TodoItem;
};
const toggleItemCompleted = (item: TodoItem): ToggleItemCompletedAction => {
  return {
    type: ActionTypes.TOGGLE_ITEM_COMPLETED,
    payload: item,
  };
};

type RemoveCompletedAction = { type: ActionTypes.REMOVE_COMPLETED };
const removeCompleted = (): RemoveCompletedAction => {
  return { type: ActionTypes.REMOVE_COMPLETED };
};

export const ActionCreators = {
  addItem,
  removeItem,
  toggleItemCompleted,
  removeCompleted,
};

type TodoActions =
  | AddItemAction
  | RemoveItemAction
  | ToggleItemCompletedAction
  | RemoveCompletedAction;

export interface TodoState { items: TodoItem[] }
const initialState: TodoState = {
  items: [],
};

export default function(state = initialState, action: TodoActions) {
  switch (action.type) {
    case ActionTypes.ADD_ITEM: {
      return {
        items: [{ label: action.payload, completed: false }, ...state.items],
      };
    }
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
    default: {
      return state;
    }
  }
}
