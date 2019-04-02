import React, { Component } from 'react';
import {inject, observer} from 'mobx-react'
import styles from './styles.module.scss';

@inject('QuestionStore')
@observer
class App extends Component {

  handleSubmit = (e) =>{
    e.preventDefault();
    const question = this.question.value;
    this.props.QuestionStore.addQuestion(question);
    this.question.value = '';
  };

  render() {
    const {QuestionStore} = this.props;

    return (
        <div className='App'>

          <form onSubmit={e => this.handleSubmit(e)}>
            <input type="text" placeholder="Enter Question" ref={input => this.question = input}/>
            <button>Add question</button>
          </form>
          <ul>
            {QuestionStore.questions.map(question => (
                <li>
                  {question}
                </li>
            ))}
          </ul>
        </div>
    );
  }
}

export default App;