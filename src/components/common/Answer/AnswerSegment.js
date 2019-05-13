import AnswerList from './AnswerList'
import AnswerInput from './AnswerInput'
import React from 'react';

const AnswerSegment = props => {
  if (props.currentUser) {
    return (
      <React.Fragment>
      <AnswerList
        answers={props.answers}
        username={props.username}
        currentUser={props.currentUser}
        onDelete={props.onDelete}/>
      </React.Fragment>
    );
  } else {
    return (
      <p>Login</p>
    );
  }
};
export default AnswerSegment;
