import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import {Link} from "react-router-dom";
import Editor from 'draft-js-plugins-editor';
import { EditorState, convertFromRaw } from 'draft-js'
import {Container, Header, Loader, Segment, Button, Icon, Grid, Image, Label, List, Message} from 'semantic-ui-react'
import styles from './styles.module.scss';
import AnswerInput from '../../components/common/Answer/AnswerInput'


@inject('QuestionStore', 'UserStore', 'AnswerStore')
@observer
class QuestionPage extends Component {

  handleNextPage = () => this.props.QuestionStore.nextPage();
  handleShowWindow = () => this.props.AnswerStore.showInputWindow();


  componentDidMount() {
    this.props.QuestionStore.loadQuestions();
  };

  render() {
    const {questions, isLoading, inProgress, nextPageURL} = this.props.QuestionStore;
    const { username } = this.props.UserStore;
    const { showWindow } = this.props.AnswerStore;
    return (
      isLoading ? <Loader active size='large'>Завантаження</Loader>: <div>
        <div>
          <div className={styles.skip}></div>
          {questions.map(question => (
            question.results.map(item => (
              <div className={styles.box} >
                <Container text loading key={item}>
                    <Segment >
                      <Grid  columns='equal'>
                        <Grid.Row >
                          <Grid.Column width={16}>
                            <List horizontal >
                              {item.get_tags.map(tag => (
                                <List.Item key={tag}>
                                  <Link to='#' className={styles.info}>
                                    <p>
                                      {tag}
                                    </p>
                                  </Link>

                                </List.Item>
                              ))}
                            </List>
                            <List>
                              <List.Item>
                                <Image
                                  avatar src='https://react.semantic-ui.com/images/avatar/small/rachel.png'
                                />
                                <List.Content>
                                  <List.Header
                                    key={item.username}
                                    as='a'>{item.username}
                                  </List.Header>
                                  <List.Description key={item.create_date}>
                                    {new Date(item.create_date).toLocaleString(
                                      'uk-UA')
                                    }
                                  </List.Description>
                                </List.Content>
                              </List.Item>
                            </List>
                            <Link
                              to={`/${item.slug}`}>
                              <Header as='h3' className={styles.headerTitle}>
                                <Editor
                              editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(item.title)))}
                              readOnly={true}
                                />
                              </Header>
                            </Link>
                            <Editor
                              editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(item.content)))}
                              readOnly={true}
                            />
                            <List horizontal>
                              <List.Item>
                                <Button disabled={showWindow}
                                        basic circular icon='write'
                                        size='mini'
                                        content='Відповісти'
                                        onClick={this.handleShowWindow}
                                />
                              </List.Item>
                            </List>
                          </Grid.Column>
                        </Grid.Row>
                        {showWindow ? <AnswerInput
                          username={username}
                          create_date={item.create_date}
                          uuid={item.uuid}
                        /> : null}
                      </Grid>
                    </Segment>
                </Container>
              </div>
            ))
          ))
          }
        </div>
        <Container textAlign='center' className={styles.loadButton}>
          {<Button
            loading={inProgress}
            color='blue'
            size='mini'
            content='Завантажити наступні питання...'
            onClick={this.handleNextPage}/>}
        </Container>
      </div>
    );
  }
}
export default QuestionPage;