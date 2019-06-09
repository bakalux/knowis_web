import React from 'react';
import { Button } from 'semantic-ui-react'


const EditButton = props => {
    // const handleClick = () => props.onDelete(props.uuid);
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
              content='Редагувати'
            />
        )
    }
    return null;
};

export default EditButton;