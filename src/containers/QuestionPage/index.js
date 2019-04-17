import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import QuestionService from '../../services/QuestionService';
import {Container, Header, Segment, Button, Divider, Label} from 'semantic-ui-react'
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

    handleScroll = (e) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (bottom) {
            this.nextPage()
        }
    };

    render() {
        const {QuestionStore} = this.props;
        return (
            <div>
            <div>
                {QuestionStore.questions.map(question => (
                    question.results.map(item => (
                        <div className={styles.box} vertical>
                            <Container text>
                                <Segment>
                                <Header as='h3' className={styles.headerTitle}>{item.title}</Header>
                                <p className={styles.content}>{item.content}</p>
                                <Button as='a' color='yellow' size='mini'>Перейти до питання</Button>
                                <div className={styles.tags}>{item.get_tags.map(
                                    tag => (
                                        <a href={tag}>
                                            <Label as='a' color='brown' image>
                                                <img src='https://static.thenounproject.com/png/99472-200.png' />
                                                {tag}
                                            </Label>
                                            <span>&nbsp;</span>
                                        </a>
                                    )
                                )}</div>
                                </Segment>
                                </Container>
                        </div>
                    ))
                ))
                }
            </div>
                <div onScroll={this.handleScroll}></div>
            </div>
        );
    }
}
export default QuestionPage;