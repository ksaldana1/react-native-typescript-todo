import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

interface Props {
  onToggle: () => void;
  isChecked: boolean;
}

const Box = styled.View`
  height: 20px;
  width: 20px;
  border: 2px black;
`;

const Inner = styled.View`
  flex: 1;
  margin: 2px;
  background-color: rgba(0,0,0,0.8)
`;

export default class Checkbox extends React.Component<Props, {}> {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onToggle}>
        <Box>
          {this.props.isChecked && <Inner />}
        </Box>
      </TouchableOpacity>
    );
  }
}
