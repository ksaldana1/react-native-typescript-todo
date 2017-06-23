import { TodoItem } from '../types/domain';

export enum ActionTypes {
  ADD_ITEM = 'ADD_ITEM',
  REMOVE_ITEM = 'REMOVE_ITEM',
  TOGGLE_ITEM_COMPLETED = 'TOGGLE_ITEM_COMPLETED',
  REMOVE_COMPLETED = 'REMOVE_COMPLETED',
  SET_TODOS = 'SET_TODOS',
  FETCH_TODOS = 'FETCH_TODOS',
  REQUEST_FAILED = 'REQUEST_FAILED',
  CLEAR_ERROR = 'CLEAR_ERROR',
}

export type AddItemAction = { type: ActionTypes.ADD_ITEM; payload: { label: string } };
const addItem = (label: string): AddItemAction => {
  return { type: ActionTypes.ADD_ITEM, payload: { label } };
};

export type RemoveItemAction = {
  type: ActionTypes.REMOVE_ITEM;
  payload: { id: TodoItem['id'] };
};
const removeItem = (id: TodoItem['id']): RemoveItemAction => {
  return { type: ActionTypes.REMOVE_ITEM, payload: { id } };
};

export type ToggleItemCompletedAction = {
  type: ActionTypes.TOGGLE_ITEM_COMPLETED;
  payload: { id: TodoItem['id'] };
};
const toggleItemCompleted = (id: TodoItem['id']): ToggleItemCompletedAction => {
  return {
    type: ActionTypes.TOGGLE_ITEM_COMPLETED,
    payload: { id },
  };
};

export type RemoveCompletedAction = { type: ActionTypes.REMOVE_COMPLETED };
const removeCompleted = (): RemoveCompletedAction => {
  return { type: ActionTypes.REMOVE_COMPLETED };
};

export type FetchAction = { type: ActionTypes.FETCH_TODOS };
const fetchTodos = (): FetchAction => {
  return { type: ActionTypes.FETCH_TODOS };
};

export type RequestFailAction = { type: ActionTypes.REQUEST_FAILED; payload: string };
const requestFailed = (error: string): RequestFailAction => {
  return { type: ActionTypes.REQUEST_FAILED, payload: error };
};

export type ClearErrorAction = { type: ActionTypes.CLEAR_ERROR };
const clearError = (): ClearErrorAction => {
  return { type: ActionTypes.CLEAR_ERROR };
};

/*
  Using this is as the default output of the epics observable is pretty lazy
  It will force re-renders of the entire app. If I was doing anything more than 
  a proof of concept, I would spend more time plucking/adding single items
  to the state tree
*/
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
  fetchTodos,
  requestFailed,
  clearError,
};

export type TodoActions =
  | FetchAction
  | RequestFailAction
  | AddItemAction
  | RemoveItemAction
  | ToggleItemCompletedAction
  | RemoveCompletedAction
  | ClearErrorAction
  | SetTodos;
