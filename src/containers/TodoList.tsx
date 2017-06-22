import React from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import Title from '../components/Title';
import Input from '../components/Input';
import List from '../components/List';
import Footer from '../components/Footer';
import { TodoItem } from '../types/domain';
import { ActionTypes, ActionCreators, TodoState } from '../redux/reducer';

interface Props {
  items: TodoItem[];
  addItem: (label: string) => void;
  removeItem: (item: TodoItem) => void;
  toggleItemCompleted: (item: TodoItem) => void;
  removeCompleted: () => void;
}

const Container = styled.View`
  flex: 1;
`;

const Divider = styled.View`
  height: 1;
  background-color: whitesmoke;
`;

class TodoList extends React.Component<Props, {}> {
  render() {
    return (
      <Container>
        <Title> Todo List </Title>
        <Input placeholder={'Enter an item'} onSubmit={this.props.addItem} />
        <Divider />
        <List
          items={this.props.items}
          onRemoveItem={this.props.removeItem}
          onToggleItemCompleted={this.props.toggleItemCompleted}
        />
        <Divider />
        <Footer onRemoveCompleted={this.props.removeCompleted}>
          Remove Completed Items
        </Footer>
      </Container>
    );
  }
}

const mapStateToProps = (state: TodoState) => ({
  items: state.items,
});

const mapDispatchToProps = dispatch => ({
  addItem: (label: string) => dispatch(ActionCreators.addItem(label)),
  removeItem: (item: TodoItem) => dispatch(ActionCreators.removeItem(item)),
  toggleItemCompleted: (item: TodoItem) =>
    dispatch(ActionCreators.toggleItemCompleted(item)),
  removeCompleted: () => dispatch(ActionCreators.removeCompleted()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
