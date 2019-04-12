import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import QuestionService from '../../services/QuestionService';
import {Container, Header} from 'semantic-ui-react'

const questionService = new QuestionService();

@inject('QuestionStore')
@observer
class QuestionPage extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        questionService.getQuestions()
            .then(result => this.props.QuestionStore.addQuestion(result))
    }

    render() {
        const {QuestionStore} = this.props;

        return (
                QuestionStore.questions.map(question => (
                    question.results.map(item => (
                        <Container fluid>
                            <Header as='h2'>{item.title}</Header>
                            <p>{item.content}</p>
                        </Container>
                    ))
                ))
        );
    }
}
export default QuestionPage;