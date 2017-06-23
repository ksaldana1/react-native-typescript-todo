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

const Title = ({ children }: Props) =>
  <Header>
    <TitleText>{children}</TitleText>
  </Header>;

export default Title;
