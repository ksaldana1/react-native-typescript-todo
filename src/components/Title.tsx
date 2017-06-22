import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styled from 'styled-components/native';

interface Props {
  children?: React.ReactNode;
}

const Header = styled.View`
  background-color: skyblue;
  padding: 15px;
`;

const TitleText = styled.Text`
  text-align: center;
  color: white;
`;

export default class Title extends React.PureComponent<Props, {}> {
  render() {
    return (
      <Header>
        <TitleText>{this.props.children}</TitleText>
      </Header>
    );
  }
}
