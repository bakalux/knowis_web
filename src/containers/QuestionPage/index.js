import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import QuestionService from '../../services/AuthService';

const questionService = new QuestionService();

class QuestionPage extends Component {
    constructor(props){
        super(props);
    };

    componentDidMount() {

    }

    // componentDidMount() {
    //     questionService.getQuestions().then(result => console.log(result.data))
    // }
    render(){
        return 1
    }
}

export default QuestionPage;