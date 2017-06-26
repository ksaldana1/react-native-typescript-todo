import * as React from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components/native';
import Item from './Item';
import { Todo } from '../types/domain';

interface Props {
  items: Todo.Item[];
  onRemoveItem: (item: Todo.Item) => void;
  onToggleItemCompleted: (item: Todo.Item) => void;
  fetchTodos: () => void;
}

const Container = styled.ScrollView`
  flex: 1;
`;

export default class List extends React.Component<Props, {}> {
  componentDidMount() {
    this.props.fetchTodos();
  }

  render() {
    return (
      <Container>
        {this.props.items.map((item, i) => {
          return (
            <Item
              onRemoveItem={() => this.props.onRemoveItem(item)}
              onToggleItemCompleted={() => this.props.onToggleItemCompleted(item)}
              item={item}
              key={item.id}
            />
          );
        })}
      </Container>
    );
  }
}
