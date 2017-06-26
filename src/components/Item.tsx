import * as React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import Checkbox from './Checkbox';
import { Todo } from '../types/domain';

interface Props {
  item: Todo.Item;
  onToggleItemCompleted: () => void;
  onRemoveItem: () => void;
}

const Container = styled.View`
  padding: 15px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: whitesmoke;
`;

const RightSection = styled.View`
  flex-direction: row;
  align-items: center;
`;

const RemoveText = styled.Text`
  margin-left: 10px
  margin-bottom: 2px;
  color: #CD5C5C;
`;

const Item = (props: Props) => {
  return (
    <Container>
      <Text>{props.item.label}</Text>
      <RightSection>
        <Checkbox
          onToggle={() => props.onToggleItemCompleted()}
          isChecked={props.item.completed}
        />
        <TouchableOpacity onPress={() => props.onRemoveItem()}>
          <RemoveText> &times; </RemoveText>
        </TouchableOpacity>
      </RightSection>
    </Container>
  );
};

export default Item;
