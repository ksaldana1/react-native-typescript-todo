import * as React from 'react';
import { TextInput } from 'react-native';
import styled from 'styled-components/native';

interface Props {
  onSubmit: (text: string) => void;
  placeholder: string;
}

interface State {
  text: string;
}

const StyledInput = styled.TextInput`
  height: 50px;
  padding: 15px;
`;

export default class Input extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  onChangeText = (text: string) => {
    this.setState({ text });
  };

  onSubmitEditing = () => {
    if (this.state.text === '') return;

    this.props.onSubmit(this.state.text);
    this.setState({ text: '' });
  };

  render() {
    return (
      <StyledInput
        placeholder={this.props.placeholder}
        onChangeText={this.onChangeText}
        onSubmitEditing={this.onSubmitEditing}
        value={this.state.text}
        blurOnSubmit={false}
      />
    );
  }
}
