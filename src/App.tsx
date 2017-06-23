import * as React from 'react';
import { Provider } from 'react-redux';
import TodoList from './containers/TodoList';
import { createStore, applyMiddleware } from 'redux';
import rootEpic from './redux/epics';
import reducer from './redux/reducer';
import { createEpicMiddleware } from 'redux-observable';
import { TodoActions } from './redux/actions';
import { TodoState } from './redux/reducer';

const epicMiddleware = createEpicMiddleware(rootEpic);
const store = createStore(reducer, applyMiddleware(epicMiddleware));

export default class App extends React.Component<{}, {}> {
  render() {
    return (
      <Provider store={store}>
        <TodoList />
      </Provider>
    );
  }
}
