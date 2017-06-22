import * as React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import styled from 'styled-components/native';

interface Props {
  onRemoveCompleted: () => void;
}

const Container = styled.TouchableOpacity`
  padding-vertical: 15px
  align-items: center;
`;

const FooterText = styled.Text`
  color: #CD5C5C;
`;

export default class Footer extends React.Component<Props, {}> {
  render() {
    return (
      <Container onPress={this.props.onRemoveCompleted}>
        <FooterText>{this.props.children}</FooterText>
      </Container>
    );
  }
}
