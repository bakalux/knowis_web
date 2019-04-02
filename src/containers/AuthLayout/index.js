import React, { Component } from 'react';
import styles from './styles.module.scss';
import {Button, Form} from "semantic-ui-react";
import {inject, observer} from 'mobx-react'
import AuthService from '../../services/AuthService';

const authService = new AuthService();
@inject('AuthStore')
@observer
class AuthLayout extends Component {

    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            user : [],
        }
    }

    componentDidMount() {
        const self = this;
        authService.postReg().then(result => {
            console.log(result)
            self.setState({user: result.data})
        })
    }

    handleSubmit(){
        authService.postReg({
            username: this.refs.username.value,
            email: this.refs.email.value,
            password1: this.refs.password1.value,
            password2: this.refs.password2.value
            });
    }

    render (){
        const {AuthStore} = this.props;
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Field>
                <label>Username</label>
                <input placeholder='username' ref='username'/>
                </Form.Field>
                <Form.Field>
                <label>Email</label>
                <input placeholder='Email' ref='email'/>
                </Form.Field>
                <Form.Field>
                <label>Password</label>
                <input placeholder='Password' ref='password1'/>
                </Form.Field>
                <Form.Field>
                <label>Retype Password</label>
                <input placeholder='Retype Password' ref='password2'/>
                </Form.Field>
                <Button type='submit'>Submit</Button>
            </Form>
        )

    }


}


export default AuthLayout;
