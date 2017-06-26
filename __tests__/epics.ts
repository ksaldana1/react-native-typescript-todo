import { ActionsObservable } from 'redux-observable';

import { Observable } from 'rxjs/Rx';
import { add$, delete$, fetch$, toggle$, clear$ } from '../src/redux/epics';
import { ActionTypes } from '../src/redux/actions';

const mockData = [
  { label: 'todo1', id: '123', completed: false },
  { label: 'todo2', id: '456', completed: true },
];

describe('add$ epic', () => {
  const action$ = ActionsObservable.of({
    type: ActionTypes.ADD_ITEM,
    payload: { label: 'new' },
  });

  it('dispatches the correct action when it is successful', async () => {
    const mockResponse = [{ label: 'new', id: '789', completed: false }, ...mockData];
    const mockService = {
      addItem: () => Promise.resolve(mockResponse),
    };

    const expectedOutputActions = { type: ActionTypes.SET_TODOS, payload: mockResponse };

    const obs = add$(mockService)(action$);
    await expect(obs.toPromise()).resolves.toEqual(expectedOutputActions);
  });

  it('dispatches an error when the call fails', async () => {
    const mockService = {
      addItem: () => Promise.reject('error'),
    };

    const expectedOutputActions = {
      type: ActionTypes.REQUEST_FAILED,
      payload: 'Add Item Failed',
    };

    const obs = add$(mockService)(action$);
    await expect(obs.toPromise()).resolves.toEqual(expectedOutputActions);
  });
});

describe('delete$ epic', () => {
  const action$ = ActionsObservable.of({
    type: ActionTypes.REMOVE_ITEM,
    payload: { id: '456' },
  });

  it('dispatches the correct action when successful', async () => {
    const mockResponse = [mockData[0]];
    const mockService = {
      deleteItem: () => Promise.resolve(mockResponse),
    };

    const expectedOutputActions = { type: ActionTypes.SET_TODOS, payload: mockResponse };
    const obs = delete$(mockService)(action$);
    await expect(obs.toPromise()).resolves.toEqual(expectedOutputActions);
  });

  it('dispatches an error when the call fails', async () => {
    const mockService = {
      deleteItem: () => Promise.reject('error'),
    };

    const expectedOutputActions = {
      type: ActionTypes.REQUEST_FAILED,
      payload: 'Delete Item Failed',
    };

    const obs = delete$(mockService)(action$);
    await expect(obs.toPromise()).resolves.toEqual(expectedOutputActions);
  });
});

describe('fetch$ epic', () => {
  const action$ = ActionsObservable.of({
    type: ActionTypes.FETCH_TODOS,
  });

  it('dispatches the correct actions when successful', async () => {
    const mockResponse = mockData;
    const mockService = {
      fetchItems: () => Promise.resolve(mockResponse),
    };

    const expectedOutputActions = {
      type: ActionTypes.SET_TODOS,
      payload: mockResponse,
    };

    const obs = fetch$(mockService)(action$);
    await expect(obs.toPromise()).resolves.toEqual(expectedOutputActions);
  });

  it('dispatches an error when the call fails', async () => {
    const mockService = {
      fetchItems: () => Promise.reject('error'),
    };

    const expectedOutputActions = {
      type: ActionTypes.REQUEST_FAILED,
      payload: 'Fetch Failed',
    };

    const obs = fetch$(mockService)(action$);
    await expect(obs.toPromise()).resolves.toEqual(expectedOutputActions);
  });
});

describe('toggle$ epic', () => {
  const action$ = ActionsObservable.of({
    type: ActionTypes.TOGGLE_ITEM_COMPLETED,
    payload: { id: '123' },
  });

  it('dispatches the correct actions when successful', async () => {
    const mockResponse = mockData.map(todo => {
      if (todo.id === '123') {
        return { label: todo.label, id: todo.id, completed: !todo.completed };
      }
      return todo;
    });

    const mockService = {
      toggleItem: () => Promise.resolve(mockResponse),
    };

    const expectedOutputActions = {
      type: ActionTypes.SET_TODOS,
      payload: mockResponse,
    };

    const obs = toggle$(mockService)(action$);
    await expect(obs.toPromise()).resolves.toEqual(expectedOutputActions);
  });

  it('dispatches an error when the request fails', async () => {
    const mockService = {
      toggleItem: () => Promise.reject('error'),
    };

    const expectedOutputActions = {
      type: ActionTypes.REQUEST_FAILED,
      payload: 'Toggle Item Failed',
    };

    const obs = toggle$(mockService)(action$);
    await expect(obs.toPromise()).resolves.toEqual(expectedOutputActions);
  });
});

describe('clear$ epic', () => {
  const action$ = ActionsObservable.of({
    type: ActionTypes.REMOVE_COMPLETED,
  });
  it('dispatches the correct action when successful', async () => {
    const mockResponse = mockData.filter(item => !item.completed);
    const mockService = {
      clearCompletedItems: () => Promise.resolve(mockResponse),
    };

    const expectedOutputActions = {
      type: ActionTypes.SET_TODOS,
      payload: mockResponse,
    };

    const obs = clear$(mockService)(action$);
    await expect(obs.toPromise()).resolves.toEqual(expectedOutputActions);
  });

  it('dispatches an error when the request fails', async () => {
    const mockService = {
      clearItems: () => Promise.reject('error'),
    };

    const expectedOutputActions = {
      type: ActionTypes.REQUEST_FAILED,
      payload: 'Clear Items Failed',
    };
  });
});
