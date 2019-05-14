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
  };

  handlePostAnswer = (e) => {
    e.preventDefault();
    this.props.AnswerStore.createAnswer(this.props.uuid, this.state.value)
      .then(() => this.setState(
        { value: RichTextEditor.createEmptyValue()}))
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
              className={styles.editor}
            />
            <List>
              <List.Item>
                <Button size='mini' color='yellow' onClick={this.handlePostAnswer}
                >
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