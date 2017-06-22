import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import Checkbox from './Checkbox';
import { TodoItem } from '../types/domain';

interface Props {
  item: TodoItem;
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

export default class Item extends React.Component<Props, {}> {
  render() {
    return (
      <Container>
        <Text>{this.props.item.label}</Text>
        <RightSection>
          <Checkbox
            onToggle={() => this.props.onToggleItemCompleted()}
            isChecked={this.props.item.completed}
          />
          <TouchableOpacity onPress={() => this.props.onRemoveItem()}>
            <RemoveText> &times;</RemoveText>
          </TouchableOpacity>
        </RightSection>
      </Container>
    );
  }
}
