import React from 'react';
import { Provider } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import TodoList from './containers/TodoList';
import { createStore } from 'redux';
import reducer from './redux/reducer';

const store = createStore(reducer);

export default class App extends React.Component<{}, {}> {
  render() {
    return (
      <Provider store={store}>
        <TodoList />
      </Provider>
    );
  }
}
