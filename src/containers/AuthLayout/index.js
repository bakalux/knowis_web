import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import {Button, Form, Message, Grid, Segment, Container} from 'semantic-ui-react';
import styles from './styles.module.scss';

@inject('AuthStore')
@observer
class LoginPage extends Component {

    handleEmailChange = e => this.props.AuthStore.setEmail(e.target.value);
    handleUsernameChange = e => this.props.AuthStore.setUsername(e.target.value);
    handlePassword1Change = e => this.props.AuthStore.setPassword1(e.target.value);
    handlePassword2Change = e => this.props.AuthStore.setPassword2(e.target.value);
    handleSubmitForm = (e) => {
        e.preventDefault();
        this.props.AuthStore.signup()
    };

    render() {
        const {values, errors, inProgress} = this.props.AuthStore;
    return (
        1
    );
  }
}

export default LoginPage;
