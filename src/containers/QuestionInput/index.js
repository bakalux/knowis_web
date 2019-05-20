import React from 'react';
import { inject } from 'mobx-react';

import Editor  from 'draft-js-plugins-editor';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import {Menu, Header, Segment, Button, List, Image, Modal} from 'semantic-ui-react';
import styles from './styles.module.scss';


@inject('QuestionStore')
class QuestionInput extends React.Component {

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
    this.props.QuestionStore.postQuestion()
  };

  render () {
    const { createQuestion } = this.props.QuestionStore.createQuestion;
    return (
      <Modal size='tiny' open={createQuestion}>
        <Modal.Header>
          Запитати
        </Modal.Header>
        <Modal.Content>
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
          <Button size='mini' color='yellow'>
            Готово
          </Button>
        </Modal.Content>

      </Modal>
    )
  }
};
export default  QuestionInput;