import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import QuestionService from '../../services/QuestionService';

const questionService = new QuestionService();

@inject('QuestionStore')
@observer
class QuestionPage extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {
        questionService.getQuestions()
            .then(result => this.props.QuestionStore.addQuestion(result))
    }
    render(){
        return 1
    }
}

export default QuestionPage;