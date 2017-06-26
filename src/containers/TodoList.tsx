import * as React from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import Title from '../components/Title';
import Input from '../components/Input';
import List from '../components/List';
import Footer from '../components/Footer';
import { Todo } from '../types/domain';
import { TodoState } from '../redux/reducer';
import { ActionTypes, ActionCreators } from '../redux/actions';

interface Props {
  items: Todo.Item[];
  isError: boolean;
  errorMsg: string;
  addItem: (label: string) => void;
  removeItem: (item: Todo.Item) => void;
  toggleItemCompleted: (item: Todo.Item) => void;
  removeCompleted: () => void;
  fetchTodos: () => void;
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
    const { isError } = this.props;
    return (
      <Container>
        <Title error={isError}>
          {isError ? this.props.errorMsg : 'Todo List'}
        </Title>
        <Input placeholder={'Enter an item'} onSubmit={this.props.addItem} />
        <Divider />
        <List
          items={this.props.items}
          onRemoveItem={this.props.removeItem}
          onToggleItemCompleted={this.props.toggleItemCompleted}
          fetchTodos={this.props.fetchTodos}
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
  isError: state.error,
  errorMsg: state.errorMsg,
});

const mapDispatchToProps = dispatch => ({
  addItem: (label: string) => dispatch(ActionCreators.addItem(label)),
  fetchTodos: () => dispatch(ActionCreators.fetchTodos()),
  removeItem: (item: Todo.Item) => dispatch(ActionCreators.removeItem(item.id)),
  toggleItemCompleted: (item: Todo.Item) =>
    dispatch(ActionCreators.toggleItemCompleted(item.id)),
  removeCompleted: () => dispatch(ActionCreators.removeCompleted()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
