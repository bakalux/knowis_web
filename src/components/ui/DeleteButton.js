import React from 'react';
import { Button } from 'semantic-ui-react'


const DeleteButton = props => {
    const handleClick = () => props.onDelete(props.uuid);
    if (props.show) {
        return (
            <Button
              disabled={props.showWindow &&
              props.selected === props.uuid}
              basic
              circular
              icon='edit'
              size='mini'
              color='blue'
              content='Видалити'
            />
        )
    }
    return null;
};

export default DeleteButton;