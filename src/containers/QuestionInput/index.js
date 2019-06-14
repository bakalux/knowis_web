import React from 'react';
import { inject, observer } from 'mobx-react';
import Editor  from 'draft-js-plugins-editor';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import {Menu, Header, Segment, Button, List, Image, Modal, Divider} from 'semantic-ui-react';
import styles from './styles.module.scss';
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'
import '!style-loader!css-loader!draft-js-static-toolbar-plugin/lib/plugin.css';
import 'draft-js/dist/Draft.css';


@inject('QuestionStore', 'UserStore')
@observer
class QuestionInput extends React.Component {


  handleContentChange = (editorState) => this.props.QuestionStore.setContent(editorState);
  handleTitleChange = (editorState) => this.props.QuestionStore.setTitle(editorState);


  handlePostQuestion = (e) => {
    const { values, status } = this.props.QuestionStore;
    const content = JSON.stringify(convertToRaw(
      values.contentInput.getCurrentContent()));
    const title = JSON.stringify(convertToRaw(
      values.titleInput.getCurrentContent()));
    e.preventDefault();
    this.props.QuestionStore.postQuestion(title, content);
    this.handleCreateQuestion();
  };

  handleCreateQuestion = () => {
    this.props.QuestionStore.showModal();
  };

  handleAddTags = (tags) => {
    this.props.QuestionStore.addTags(tags)
    console.log(this.props.QuestionStore.tags)
  };

  render () {
    const { createQuestion, values, tags } = this.props.QuestionStore;
    const { username } = this.props.UserStore;
    return (
      <Modal size='tiny' open={createQuestion}
             onClose={this.handleCreateQuestion}
      >
          <Menu secondary pointing>
            <Menu.Item active={true} color='yellow'>
              <Header size='tiny'
                      content='Запитати'
                      color='grey'
              />
            </Menu.Item>
          </Menu>
        <Modal.Content>
          <List>
              <List.Item><Image avatar src='https://react.semantic-ui.com/images/avatar/small/rachel.png' />
              <List.Content>
                <List.Header
                  as='a'
                  key={username}>{username}
                </List.Header>
                <List.Description>
                </List.Description>
              </List.Content>
              </List.Item>
              </List>
            <div className={styles.editor}>
              <Editor
                editorState={values.titleInput}
                onChange={this.handleTitleChange}
                placeholder='Почніть своє питання з "Як?", "Де?", "Коли?", тощо...'
              />
              <Divider></Divider>
              <Editor
                editorState={values.contentInput}
                onChange={this.handleContentChange}
                placeholder={'Можливо ви хочете щось додати'}
              />
              <TagsInput
                className={styles.taginput}
                value={tags}
                onChange={this.handleAddTags}
                inputProps={{placeholder: 'Теги'}}/>
            </div>
          <Button
            size='mini'
            color='yellow'
            onClick={this.handlePostQuestion}
            content='Готово'
          />
        </Modal.Content>
      </Modal>
    )
  }
};
export default  QuestionInput;