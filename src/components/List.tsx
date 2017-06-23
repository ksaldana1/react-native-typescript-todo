import * as React from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components/native';
import Item from './Item';
import { TodoItem } from '../types/domain';

interface Props {
  items: TodoItem[];
  onRemoveItem: (item: TodoItem) => void;
  onToggleItemCompleted: (item: TodoItem) => void;
  fetchTodos: () => void;
}

const Container = styled.ScrollView`
  flex: 1;
`;

export default class List extends React.Component<Props, {}> {
  constructor(props) {
    super(props);
  }

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
