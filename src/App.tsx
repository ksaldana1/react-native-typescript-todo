import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/configureStore';
import { View, Text, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import TodoList from './containers/TodoList';

export default class App extends React.Component<{}, {}> {
  render() {
    return (
      <Provider store={store}>
        <TodoList />
      </Provider>
    );
  }
}
