import { Link } from 'react-router-dom';
import React from 'react';
import {Grid} from "semantic-ui-react";
import {List} from "semantic-ui-react";
import {Image} from "semantic-ui-react";
import {Divider} from "semantic-ui-react";
import Editor from 'draft-js-plugins-editor';
import { EditorState, convertFromRaw } from 'draft-js'
import DeleteButton from './DeleteButton';

const Answer = props => {
  const answer = props.answer;
  const show = props.currentUser &&
    props.username  === answer.username;
  const answerContent = convertFromRaw(JSON.parse(answer.answer));
  const answerState = EditorState.createWithContent(answerContent);
  return (
    <Grid.Row key={answer.comment}>
      <Grid.Column>
        <List>
          <List.Item>
            <Image
              avatar
              src='https://react.semantic-ui.com/images/avatar/small/rachel.png'
            />
            <List.Content>
              <List.Header
                as='a'
                key={answer.username}>{answer.username}
              </List.Header>
              <List.Description key={answer.date}>
                {new Date(answer.date).toLocaleString('uk-UA')}
              </List.Description>
            </List.Content>
            <List.Content floated='right'>
              <DeleteButton
                show={show}
                uuid={answer.uuid}
                onDelete={props.onDelete}/>
            </List.Content>
          </List.Item>
          <Editor
            editorState={answerState}
            readOnly={true}
          />
        </List>
        <Divider fitted />
      </Grid.Column>
    </Grid.Row>
  );
};

export default Answer;