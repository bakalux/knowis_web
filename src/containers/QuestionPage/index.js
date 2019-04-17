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
    }

    componentDidMount() {
        questionService.getQuestions()
            .then(result => this.props.QuestionStore.addQuestion(result))
    }

    render() {
        const {QuestionStore} = this.props;

        return (
            <div>
                <div>
                {QuestionStore.questions.map(question => (
                    question.results.map(item => (
                        <Segment className={styles.box}  >
                            <Container text>
                                <Header as='h3' className={styles.headerTitle}>{item.title}</Header>
                                <p className={styles.content}>{item.content}</p>
                                <Button as='a' color='yellow' size='mini'>Перейти до питання</Button>
                            </Container>
                            <Divider className='header' horizontal>
                                <p>{item.get_tags.map(
                                    tag => (
                                        <a href={tag}>
                                            <Label as='a' color='blue'>
                                                {tag}
                                            </Label>
                                        </a>
                                    )
                                )}</p>
                            </Divider>
                        </Segment>
                    ))
                ))}
                </div>
                <div>
                    <Button>Hello</Button>
                </div>
            </div>
        );
    }
}
export default QuestionPage;