import Answer from './Answer';
import React from 'react'
import {observer} from 'mobx-react'

const AnswerList = (props => {
    return(
        <div>
            {
                props.answers.map(
                    result => result.results.map(
                        answer => {
                            return (
                                <Answer
                                answer={answer}
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
        </div>
    )
});

export default AnswerList;