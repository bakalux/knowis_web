import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import QuestionService from '../../services/QuestionService';
import {Container, Header, Segment, Button, Icon, Grid, Image, Label} from 'semantic-ui-react'
import styles from './styles.module.scss';


const questionService = new QuestionService();

@inject('QuestionStore')
@observer
class QuestionPage extends Component {
    constructor(props) {
        super(props);
        this.nextPage = this.nextPage.bind(this);
    }

    componentDidMount() {
        questionService.getQuestions()
            .then(result => this.props.QuestionStore.addQuestion(result))
            .catch(err => console.log(err));
    };

    nextPage() {
        this.props.QuestionStore.questions.map(question => (
            this.props.QuestionStore.addNextPageURL(question.next)));
        questionService.getQuestionsByURL(this.props.QuestionStore.pageUrl)
            .then(result => this.props.QuestionStore.addQuestion(result))
            .catch(err => console.log(err));
    };

    render() {
        const {QuestionStore} = this.props;
        return (
            <div>
            <div>
                {QuestionStore.questions.map(question => (
                    question.results.map(item => (
                        <div className={styles.box} >
                            <Container text>
                                <Segment>
                                    <Grid celled='internally' columns='equal'>
                                        <Grid.Row>
                                            <Grid.Column width={4}>
                                                <Image src={item.image}/>
                                                <div className={styles.tags}>
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
                                                <p className={styles.content}>{item.content}</p>
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column width={10}>
                                                <div className={styles.button}>
                                                <Button as='div' labelPosition='left' size='mini'>
                                                        <Label as='a' basic color='red'>
                                                            2048
                                                        </Label>
                                                    <Button icon size='mini' color='red'>
                                                        <Icon name='like' />
                                                    </Button>
                                                </Button>
                                                <Button as='div' labelPosition='left' size='mini'>
                                                    <Label as='a' basic color='blue' >
                                                        2048
                                                    </Label>
                                                    <Button icon size='mini' color='blue'>
                                                        <Icon name='comment' />
                                                    </Button>
                                                </Button>
                                                </div>
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
                <Button color='olive' onClick={this.nextPage}>Завантажити наступні 10 питань...</Button>
                </Segment>
            </div>
        );
    }
}
export default QuestionPage;