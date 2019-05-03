import React, { Component } from 'react';
import {toJS} from "mobx";
import { inject, observer } from 'mobx-react';
import {Container, Header, Loader, Segment, Button, Icon, Grid, Image, Divider, Label, List, Message} from 'semantic-ui-react'
import styles from './styles.module.scss';

@inject('QuestionStore', 'AnswerStore')
@observer
class Question extends Component {
    handleSlug = () => this.props.QuestionStore.setQuestionSlug(this.props.match.params.slug);

    componentWillMount() {
        this.handleSlug();
        this.props.QuestionStore.loadQuestionBySlug();
    }

    render () {
        const {question, questionSlug, inProgress} = this.props.QuestionStore;
        const {answers, questionUUID} = this.props.AnswerStore;
        const myQuestion = toJS(question);

        return (
            inProgress ? <Loader active size='large'>Завантаження</Loader>: <div>
                <div>
                    {<Container text>
                        <Segment>
                            <Grid relaxed>
                                <Grid.Row key={myQuestion.get_tags} floated = 'left'>
                                    <Grid.Column width={16}>
                                        <List horizontal >
                                            {myQuestion.get_tags.map(tag => (
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
                                                <List.Header as='a' key={myQuestion.username}>{myQuestion.username}</List.Header>
                                                <List.Description key={myQuestion.create_date}>
                                                    {new Date(myQuestion.create_date).toLocaleString('uk-UA')}
                                                </List.Description>
                                            </List.Content>
                                            </List.Item>
                                        </List>
                                        <Header as='h1'><p className={styles.questionTitle} key={myQuestion.title}>
                                            {myQuestion.title}
                                        </p></Header>
                                        <p className={styles.content} key={myQuestion.content}>
                                            {myQuestion.content}
                                        </p>
                                        <List horizontal>
                                                <List.Item>
                                                    <Label circular inverted color='teal' as='a' onClick={()=> console.log(1)}>
                                                        <Icon name='write'/>Відповісти
                                                    </Label>
                                                </List.Item>
                                            </List>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column width={16}>
                                        <p className={styles.content}>Відповіді</p>
                                        <Divider fitted/>
                                    </Grid.Column>
                                </Grid.Row>
                                {answers.map(answer => (
                                    answer.results.map(item=>
                                    <Grid.Row key={item.comment}>
                                        <Grid.Column>
                                            <List>
                                                <List.Item><Image avatar src='https://react.semantic-ui.com/images/avatar/small/rachel.png' />
                                                <List.Content>
                                                    <List.Header as='a' key={myQuestion.username}>{myQuestion.username}</List.Header>
                                                    <List.Description key={myQuestion.create_date}>
                                                        {new Date(myQuestion.create_date).toLocaleString('uk-UA')}
                                                    </List.Description>
                                                </List.Content>
                                                </List.Item>
                                                <p>
                                                    {item.comment}
                                                </p>
                                            </List>
                                            <Divider fitted/>
                                        </Grid.Column>
                                    </Grid.Row>

                                    )
                                ))}
                            </Grid>
                        </Segment>
                    </Container>}
                </div>
                <div className={styles.segment}></div>
            </div>
        )

    }
}

export default Question;