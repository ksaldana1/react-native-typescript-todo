import { API } from '../../environment';
import { Todo } from '../types/domain';

const url = API;

function jsonPOSTRequest(toJSON?: any) {
  if (!toJSON) return { method: 'POST' };
  return {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(toJSON),
  };
}

const TodoService: Todo.Service = {
  fetchItems: async (): Promise<Todo.Item[]> => {
    const response = await fetch(`${API}/todo`, { method: 'GET' });
    return await response.json();
  },

  addItem: async (label: string): Promise<Todo.Item[]> => {
    const response = await fetch(`${API}/todo`, jsonPOSTRequest({ label }));
    return await response.json();
  },

  deleteItem: async (id: Todo.Item['id']): Promise<Todo.Item[]> => {
    const response = await fetch(`${API}/todo/delete`, jsonPOSTRequest({ id }));
    return await response.json();
  },

  toggleItem: async (id: Todo.Item['id']): Promise<Todo.Item[]> => {
    const response = await fetch(`${API}/todo/toggle`, jsonPOSTRequest({ id }));
    return await response.json();
  },

  clearCompletedItems: async (): Promise<Todo.Item[]> => {
    const response = await fetch(`${API}/todo/clear`, jsonPOSTRequest());
    return await response.json();
  },

  resetItems: async (): Promise<Todo.Item[]> => {
    const response = await fetch(`${API}/todo/reset`, jsonPOSTRequest());
    return await response.json();
  },
};

export default TodoService;
