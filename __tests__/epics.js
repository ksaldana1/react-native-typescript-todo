import { ActionsObservable } from 'redux-observable';

import { Observable } from 'rxjs/Rx';
import { add$ } from '../src/redux/epics';
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

  it('dispatches the correct action when it is successful', () => {
    const mockResponse = [{ label: 'new', id: '789', completed: false }, ...mockData];
    const mockService = {
      addItem: () => Promise.resolve(mockResponse),
    };

    const expectedOutputActions = { type: ActionTypes.SET_TODOS, payload: mockResponse };

    const obs = add$(mockService)(action$).toPromise();
    return obs.then(actionReceived => {
      expect(actionReceived).toEqual(expectedOutputActions);
    });
  });

  it('dispatches an error when the call fails', () => {
    const mockService = {
      addItem: () => Promise.reject('error'),
    };

    const expectedOutputActions = {
      type: ActionTypes.REQUEST_FAILED,
      payload: 'Add Item Failed',
    };

    const obs = add$(mockService)(action$).toPromise();
    return obs.then(actionReceived => {
      expect(actionReceived).toEqual(expectedOutputActions);
    });
  });
});
