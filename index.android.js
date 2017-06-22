import React from 'react';
import App from './src/App';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';

export default class Todo extends React.Component {
  render() {
    return <App />;
  }
}

AppRegistry.registerComponent('Todo', () => Todo);
