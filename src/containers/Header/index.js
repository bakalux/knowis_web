import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Segment } from 'semantic-ui-react'
import { inject, observer } from 'mobx-react';
import QuestionPage from "../QuestionPage";



@inject('UserStore', 'CommonStore')
class Header extends Component {
    render() {
        return (
            <Menu pointing secondary>
                <Menu.Item name='home'/>
            </Menu>
        )
    }
}

export default Header;