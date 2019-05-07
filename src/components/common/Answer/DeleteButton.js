import React from 'react';
import {Icon, List} from 'semantic-ui-react'


const DeleteButton = props => {
    const handleClick = () => props.onDelete(props.uuid);
    if (props.show) {
        return (
            <Icon name='delete' link color='grey' onClick={handleClick}/>
        )
    }
    return null;
};

export default DeleteButton;