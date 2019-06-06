import Answer from './Answer';
import React from 'react'
import {observer} from 'mobx-react'
import {toJS} from 'mobx'


const AnswerList = observer(props => {
  return(
    <React.Fragment>
      {
        props.answers.map(
          result => result.results.map(
            answer => {
              return (
                <Answer
                  answer={answer}
                  username={props.username}
                  currentUser={props.currentUser}
                  uuid={props.uuid}
                  key={answer.uuid}
                  onDelete={props.onDelete}
                />
              )
            }
          )
        )
      }
    </React.Fragment>
  );
});

export default AnswerList;