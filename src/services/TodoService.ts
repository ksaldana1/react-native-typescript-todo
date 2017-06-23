import { API } from '../../environment';
import { TodoItem } from '../types/domain';

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

export class TodoService {
  fetchItems = async (): Promise<TodoItem[]> => {
    const response = await fetch(`${API}/todo`, { method: 'GET' });
    return await response.json();
  };

  addItem = async (label: string): Promise<TodoItem[]> => {
    const response = await fetch(`${API}/todo`, jsonPOSTRequest({ label }));
    return await response.json();
  };

  deleteItem = async (id: TodoItem['id']): Promise<TodoItem[]> => {
    const response = await fetch(`${API}/todo/delete`, jsonPOSTRequest({ id }));
    return await response.json();
  };

  toggleItem = async (id: TodoItem['id']): Promise<TodoItem[]> => {
    const response = await fetch(`${API}/todo/toggle`, jsonPOSTRequest({ id }));
    return await response.json();
  };

  clearItems = async (): Promise<TodoItem[]> => {
    const response = await fetch(`${API}/todo/clear`, jsonPOSTRequest());
    return await response.json();
  };

  resetItems = async (): Promise<TodoItem[]> => {
    const response = await fetch(`${API}/todo/reset`, jsonPOSTRequest());
    return await response.json();
  };
}
