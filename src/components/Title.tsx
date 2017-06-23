import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styled from 'styled-components/native';

interface Props {
  children?: React.ReactNode;
  error?: boolean;
}

const Header = styled.View`
  background-color: ${(props: Props) => (props.error ? 'red' : 'skyblue')};
  padding: 15px;
`;

const TitleText = styled.Text`
  text-align: center;
  color: white;
`;

const Title = (props: Props) =>
  <Header error={props.error}>
    <TitleText>{props.children}</TitleText>
  </Header>;

export default Title;
