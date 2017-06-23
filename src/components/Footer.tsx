import * as React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import styled from 'styled-components/native';

interface Props {
  onRemoveCompleted: () => void;
  children?: React.ReactNode;
}

const Container = styled.TouchableOpacity`
  padding-vertical: 15px
  align-items: center;
`;

const FooterText = styled.Text`
  color: #CD5C5C;
`;

const Footer = (props: Props) =>
  <Container onPress={props.onRemoveCompleted}>
    <FooterText>{props.children}</FooterText>
  </Container>;

export default Footer;
