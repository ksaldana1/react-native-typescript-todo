import * as React from 'react';
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
  background-color: rgba(0, 0, 0, 0.8);
`;

const Checkbox = (props: Props) => {
  return (
    <TouchableOpacity onPress={props.onToggle}>
      <Box>
        {props.isChecked && <Inner />}
      </Box>
    </TouchableOpacity>
  );
};

export default Checkbox;
