import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import QuestionService from '../../services/QuestionService';
import {Container, Header, Segment, Button, Icon, Grid, Image, Label} from 'semantic-ui-react'
import styles from './styles.module.scss';


const questionService = new QuestionService();


@inject('QuestionStore')
@observer
class QuestionPage extends Component {

    handleNextPage = e => this.props.QuestionStore.nextPage();

    componentDidMount() {
        this.props.QuestionStore.loadQuestions();
    };

    render() {
        const {questions} = this.props.QuestionStore;
        return (
            <div>
            <div className={styles.getHigher}>
                {questions.map(question => (
                    question.results.map(item => (
                        <div className={styles.box} >
                            <Container text>
                                <Segment>
                                    <Grid celled='internally' columns='equal'>
                                        <Grid.Row>
                                            <Grid.Column width={5} >
                                                <Image src={item.image}/>
                                                <div className={styles.tags}>
                                                    Теги:
                                                    {item.get_tags.map(
                                                        tag => (
                                                            <div className={styles.innerTags}>
                                                            <a href={tag}>
                                                                <Label as='a' color='brown' image>
                                                                    <img src='https://static.thenounproject.com/png/99472-200.png' />
                                                                    {tag}
                                                                </Label>
                                                            </a>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </Grid.Column>
                                            <Grid.Column width={10}>
                                                <Header as='h3' className={styles.headerTitle}>{item.title}</Header>
                                                <p className={styles.content}>{item.content}</p>
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row >
                                            <Grid.Column width={5}>
                                                <div className={styles.innerButton}>
                                                <Button as='div' labelPosition='left' size='mini'>
                                                        <Label as='a' basic color='red'>
                                                            2048
                                                        </Label>
                                                    <Button icon size='mini' color='red'>
                                                        <Icon name='like' />
                                                    </Button>
                                                </Button>
                                                </div>
                                                <div className={styles.innerButton}>
                                                <Button as='div' labelPosition='left' size='mini'>
                                                    <Label as='a' basic color='blue' >
                                                        2048
                                                    </Label>
                                                    <Button icon size='mini' color='blue'>
                                                        <Icon name='comment' />
                                                    </Button>
                                                </Button>
                                                </div>
                                                <div className={styles.innerButton}>
                                                    <Button size='mini' color='green' content='green'>Перейти до питання</Button>
                                                </div>
                                            </Grid.Column>
                                            <Grid.Column width={10}>
                                                Автор: {item.username}
                                                Дата: {item.create_date}
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
                <Button color='olive' onClick={this.handleNextPage}>Завантажити наступні питання...</Button>
                </Segment>
            </div>
        );
    }
}
export default QuestionPage;