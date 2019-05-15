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
import Editor  from 'draft-js-plugins-editor';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import styles from './styles.module.scss';


@inject('AnswerStore')
class AnswerInput extends React.Component {

  state = {
    editorState: EditorState.createEmpty(),
  };

  onChange = (editorState) => {
    this.setState({editorState});
  };

  handlePostAnswer = (e) => {
    const editorState = this.state.editorState;
    const content = JSON.stringify(convertToRaw(
      editorState.getCurrentContent()));
    e.preventDefault();
    this.props.AnswerStore.createAnswer(this.props.uuid, content)
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
            <div className={styles.editor}>
              <Editor
                editorState={this.state.editorState}
                onChange={this.onChange}
              />
            </div>
            <List>
              <List.Item>
                <Button size='mini' color='yellow'
                        onClick={this.handlePostAnswer}
                        content='Готово'
                />
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