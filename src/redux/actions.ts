import { TodoItem } from '../types/domain';

export enum ActionTypes {
  ADD_ITEM = 'ADD_ITEM',
  REMOVE_ITEM = 'REMOVE_ITEM',
  TOGGLE_ITEM_COMPLETED = 'TOGGLE_ITEM_COMPLETED',
  REMOVE_COMPLETED = 'REMOVE_COMPLETED',
  SET_TODOS = 'SET_TODOS',
}

export type AddItemAction = { type: ActionTypes.ADD_ITEM; payload: string };
const addItem = (label: string): AddItemAction => {
  return { type: ActionTypes.ADD_ITEM, payload: label };
};

export type RemoveItemAction = { type: ActionTypes.REMOVE_ITEM; payload: TodoItem };
const removeItem = (item: TodoItem): RemoveItemAction => {
  return { type: ActionTypes.REMOVE_ITEM, payload: item };
};

export type ToggleItemCompletedAction = {
  type: ActionTypes.TOGGLE_ITEM_COMPLETED;
  payload: TodoItem;
};
const toggleItemCompleted = (item: TodoItem): ToggleItemCompletedAction => {
  return {
    type: ActionTypes.TOGGLE_ITEM_COMPLETED,
    payload: item,
  };
};

export type RemoveCompletedAction = { type: ActionTypes.REMOVE_COMPLETED };
const removeCompleted = (): RemoveCompletedAction => {
  return { type: ActionTypes.REMOVE_COMPLETED };
};

export type SetTodos = { type: ActionTypes.SET_TODOS; payload: TodoItem[] };
const setTodos = (todos: TodoItem[]) => {
  return { type: ActionTypes.SET_TODOS, payload: todos };
};

export const ActionCreators = {
  addItem,
  removeItem,
  toggleItemCompleted,
  removeCompleted,
  setTodos,
};

export type TodoActions =
  | AddItemAction
  | RemoveItemAction
  | ToggleItemCompletedAction
  | RemoveCompletedAction
  | SetTodos;
