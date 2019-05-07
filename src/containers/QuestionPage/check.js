import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import {Link} from "react-router-dom";
import {Container, Header, Loader, Segment, Button, Icon, Grid, Image, Label, List, Message} from 'semantic-ui-react'
import styles from './styles.module.scss';


@inject('QuestionStore')
@observer
class QuestionPage extends Component {

  handleNextPage = e => this.props.QuestionStore.nextPage();

  componentDidMount() {
    this.props.QuestionStore.loadQuestions();
  };

  render() {
    const {questions, isLoading, inProgress} = this.props.QuestionStore;
    return (
      isLoading ? <Loader active size='large'>Завантаження</Loader>: <div>
        <div >
          {questions.map(question => (
            question.results.map(item => (
              <div className={styles.box} >
                <Container text loading key={item}>
                  <Segment attached>
                    <Grid celled='internally' columns='equal'>
                      <Grid.Row>
                        <Grid.Column width={5} key={item}>
                          <Image src={item.image}/>
                          <div className={styles.tags}>
                            {item.get_tags.map(
                              tag => (
                                <List key={tag}>
                                  <List.Item icon='github' content={tag}/>
                                </List>
                              )
                            )}
                          </div>
                        </Grid.Column>
                        <Grid.Column width={10}>
                          <List>
                            <List.Item>
                              <Image avatar
                                     src='https://react.semantic-ui.com/images/avatar/small/rachel.png' />
                              <List.Content>
                                <List.Header as='a'
                                             key={item.username}>{item.username}
                                </List.Header>
                                <List.Description key={item.create_date}>
                                  {item.create_date}
                                </List.Description>
                              </List.Content>
                            </List.Item>
                          </List>
                          {/*<a href='#'>*/}
                          {/*    <Header as='h3' className={styles.headerTitle}>{item.title}</Header>*/}
                          {/*</a>*/}
                          <p className={styles.content} key={item.content}>
                            {item.content}</p>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Segment>
                  <Segment attached>
                    <Grid>
                      <Grid.Row>
                        <Grid.Column width={8}>
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          <Button as='div' labelPosition='left' size='mini'>
                          <Label as='a' basic color='red'>
                            2048
                          </Label>
                          <Button icon size='mini' color='red'>
                            <Icon name='like' />
                          </Button>
                        </Button>&nbsp;&nbsp;&nbsp;&nbsp;
                          <Button as='div' labelPosition='left' size='mini' >
                            <Label as='a' basic color='blue' >
                              {item.get_num_comments}
                            </Label>
                            <Button icon size='mini' color='blue'>
                              <Icon name='comment' />
                            </Button>
                          </Button>&nbsp;&nbsp;&nbsp;&nbsp;
                        </Grid.Column>
                        <Grid.Column width={5}>
                          <p>
                          </p>
                        </Grid.Column>
                        <Grid.Column width={3}>
                          <Button size='mini' color='green' content='green'>Відповісти</Button>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Segment>
                </Container>
              </div>
            ))
          ))
          }
        </div>
        <Segment textAlign='center'>
          <Button loading={inProgress} color='olive' size='mini' onClick={this.handleNextPage}>Завантажити наступні питання...</Button>
        </Segment>
      </div>
    );
  }
}
export default QuestionPage;