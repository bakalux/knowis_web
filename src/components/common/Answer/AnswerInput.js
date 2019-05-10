import React from 'react';
import { inject } from 'mobx-react';
import {
  Button,
  Icon,
  Container,
  Divider,
  Form,
  Grid,
  Header,
  Image,
  Segment,
  Message,
  List,
  TextArea
} from 'semantic-ui-react';
import RichTextEditor from 'semantic-ui-react-rte'
import styles from './styles.module.scss';


@inject('AnswerStore')
class AnswerInput extends React.Component {

  state = {
    value: RichTextEditor.createEmptyValue()
  };

  onChange = (value) => {
    this.setState({value});
    if (this.props.onChange) {
      // Send the changes up to the parent component as an HTML string.
      // This is here to demonstrate using `.toString()` but in a real app it
      // would be better to avoid generating a string on each change.
      this.props.onChange(
        value.toString('html')
      );
    }
  };

  handleAnswerInput = ev => {
    this.props.AnswerStore.setAnswer(ev.target.value)
  };

  handleCreateAnswer = (e) => {
    e.preventDefault();
    this.props.AnswerStore.createAnswer(uuid)
  };

  render () {
    const { isCreatingAnswer } = this.props.AnswerStore;
    return (
      <React.Fragment>
        <Grid.Row>
        <Grid.Column width={16}>
          <Container>
            <List>
              <List.Item><Image avatar src='https://react.semantic-ui.com/images/avatar/small/rachel.png' />
              <List.Content>
                <List.Header
                  as='a'
                  key={this.props.username}>{this.props.username}
                </List.Header>
                <List.Description>
                </List.Description>
              </List.Content>
              </List.Item>
              </List>
            <RichTextEditor
              value={this.state.value}
              onChange={this.onChange}
              className={styles.textEditor}
            />
            <List>
              <List.Item>
                <Button size='mini' color='yellow' onClick={this.handleCreateAnswer}>
                  Готово
                </Button>
              </List.Item>
            </List>
          </Container>
        </Grid.Column>
        </Grid.Row>
      </React.Fragment>
    )
  }
};
export default  AnswerInput;