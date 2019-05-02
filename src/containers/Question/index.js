import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import {Container, Header, Loader, Segment, Button, Icon, Grid, Image, Label, List, Message} from 'semantic-ui-react'
import styles from './styles.module.scss';

@inject('QuestionStore')
@observer
class Question extends Component {
    handleSlug = () => this.props.QuestionStore.setQuestionSlug(this.props.match.params.slug);

    componentWillMount() {
        this.handleSlug();
        this.props.QuestionStore.loadQuestionBySlug();
    }

    render () {
        const {question, questionSlug, inProgress} = this.props.QuestionStore;
        console.log(question);
        return (
            inProgress ? <Loader active size='large'>Завантаження</Loader>: <div>
                {/*<div>*/}
                {/*    {question.map(item => (*/}
                {/*            <Container key={item.title}>{item.title}</Container>*/}
                {/*        ))}*/}
                {/*</div>*/}
            </div>
        )

    }
}

export default Question;