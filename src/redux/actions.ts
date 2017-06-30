import { Todo } from '../types/domain';

export namespace TodoAction {
  export enum Constants {
    ADD_ITEM = 'TODO/ADD_ITEM',
    REMOVE_ITEM = 'TODO/REMOVE_ITEM',
    TOGGLE_ITEM = 'TODO/TOGGLE_ITEM',
    REMOVE_COMPLETED = 'TODO/REMOVE_COMPLETED',
    SET_TODOS = 'TODO/SET_TODOS',
    FETCH_TODOS = 'TODO/FETCH_TODOS',
    REQUEST_FAILED = 'REQUEST_FAILED',
    CLEAR_ERROR = 'CLEAR_ERROR',
  }

  export namespace Types {
    export type AddItem = {
      type: Constants.ADD_ITEM;
      payload: { label: string };
    };

    export type RemoveItem = {
      type: Constants.REMOVE_ITEM;
      payload: { id: Todo.Item['id'] };
    };

    export type ToggleItem = {
      type: Constants.TOGGLE_ITEM;
      payload: { id: Todo.Item['id'] };
    };

    export type RemoveCompleted = { type: Constants.REMOVE_COMPLETED };
    export type Fetch = { type: Constants.FETCH_TODOS };
    export type RequestFail = { type: Constants.REQUEST_FAILED; payload: string };
    export type ClearError = { type: Constants.CLEAR_ERROR };
    export type SetTodos = { type: Constants.SET_TODOS; payload: Todo.Item[] };
  }

  export namespace Creators {
    export const addItem = (label: string): Types.AddItem => {
      return { type: TodoAction.Constants.ADD_ITEM, payload: { label } };
    };

    export const removeItem = (id: Todo.Item['id']): Types.RemoveItem => {
      return { type: TodoAction.Constants.REMOVE_ITEM, payload: { id } };
    };

    export const toggleItemCompleted = (id: Todo.Item['id']): Types.ToggleItem => {
      return {
        type: Constants.TOGGLE_ITEM,
        payload: { id },
      };
    };

    export const removeCompleted = (): Types.RemoveCompleted => {
      return { type: Constants.REMOVE_COMPLETED };
    };

    export const fetchTodos = (): Types.Fetch => {
      return { type: Constants.FETCH_TODOS };
    };

    export const requestFailed = (error: string): Types.RequestFail => {
      return { type: Constants.REQUEST_FAILED, payload: error };
    };

    export const clearError = (): Types.ClearError => {
      return { type: Constants.CLEAR_ERROR };
    };

    export const setTodos = (todos: Todo.Item[]): Types.SetTodos => {
      return { type: Constants.SET_TODOS, payload: todos };
    };
  }

  export type AllActions =
    | Types.Fetch
    | Types.RequestFail
    | Types.AddItem
    | Types.RemoveItem
    | Types.ToggleItem
    | Types.RemoveCompleted
    | Types.ClearError
    | Types.SetTodos;
}
