import React, { Component } from 'react';
import {toJS} from "mobx";
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import {Container, Header, Loader, Segment, Button, Icon, Grid, Image, Divider, Label, List, Message} from 'semantic-ui-react'
import styles from './styles.module.scss';
import Editor from 'draft-js-plugins-editor';
import {convertFromRaw, EditorState} from 'draft-js';
import AnswerSegment from '../../components/common/Answer/AnswerSegment';
import AnswerInput from '../../components/common/Answer/AnswerInput'

@inject('QuestionStore', 'AnswerStore', 'UserStore')
@withRouter
@observer
class Question extends Component {
  handlePostAnswer = () => this.props.AnswerStore.createAnswer();
  handleDeleteAnswer = (uuid) => this.props.AnswerStore.deleteAnswer(uuid);
  handleShowWindow = (key) => this.props.AnswerStore.showInputWindow(key);


  componentWillMount() {
    const slug = this.props.match.params.slug;
    this.props.QuestionStore.setQuestionSlug(slug);
    this.props.QuestionStore.loadQuestionBySlug();
  }

  render () {
    const {question, inProgress} = this.props.QuestionStore;
    const {currentUser, username} = this.props.UserStore;
    const {answers, inProgressAnswer, isCreatingAnswer,
      answer, showWindow, selected} = this.props.AnswerStore;
    const jsQuestion = toJS(question);
    return (
      inProgress ? <Loader active size='large'>Завантаження</Loader>: <div>
        <div>
          {<Container text style={{ marginTop: '5em'}}>
            <div>
              <Grid relaxed>
                <Grid.Row key={jsQuestion.get_tags} floated = 'left'>
                  <Grid.Column width={16}>
                    <List horizontal>
                      {jsQuestion && jsQuestion.get_tags.map(tag => (
                        <List.Item key={tag}>
                          <Label>
                            {tag}
                          </Label>
                        </List.Item>
                      ))}
                    </List>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column>
                    <List>
                      <List.Item><Image avatar src='https://react.semantic-ui.com/images/avatar/small/rachel.png' />
                        <List.Content>
                          <List.Header
                            as='a'
                            key={jsQuestion.username}>{jsQuestion.username}
                          </List.Header>
                          <List.Description key={jsQuestion.create_date}>
                            {new Date(jsQuestion.create_date)
                              .toLocaleString('uk-UA')}
                          </List.Description>
                        </List.Content>
                      </List.Item>
                    </List>
                    <Header as='h1'>
                      <Editor
                        editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(jsQuestion.title)))}
                        readOnly={true}
                      />
                    </Header>
                    <Editor
                      editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(jsQuestion.content)))}
                      readOnly={true}
                    />
                    <List horizontal>
                      <List.Item>
                        <Button disabled={showWindow && selected === jsQuestion.uuid}
                                basic circular icon='write'
                                size='mini'
                                content='Відповісти'
                                onClick={() => this.handleShowWindow(jsQuestion.uuid)}
                        />
                      </List.Item>
                    </List>
                  </Grid.Column>
                </Grid.Row>
                {showWindow && selected === jsQuestion.uuid  &&
                <AnswerInput
                  username={username}
                  create_date={jsQuestion.create_date}
                  uuid={jsQuestion.uuid}
                  />}
                <Grid.Row>
                  <Grid.Column width={16}>
                    <p className={styles.content}>Відповіді</p>
                    <Divider fitted/>
                  </Grid.Column>
                </Grid.Row>
                {inProgressAnswer ?
                  <Grid.Row>
                    <Loader active inline='centered'/>
                  </Grid.Row> : null}
                <AnswerSegment
                  answers={answers}
                  username={username}
                  currentUser={currentUser}
                  onDelete={this.handleDeleteAnswer}/>
              </Grid>
            </div>
          </Container>}
        </div>
        <div className={styles.segment}></div>
      </div>
    );
  }
}

export default Question;