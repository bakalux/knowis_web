import AnswerList from './AnswerList'
import React from 'react'

const AnswerSegment = props => {
  if (props.currentUser) {
    return (
      <AnswerList
        answers={props.answers}
        currentUser={props.currentUser}
        onDelete={props.onDelete}/>
    );
  } else {
    return (
      <p>Login</p>
    )
  }
};
export default AnswerSegment;
