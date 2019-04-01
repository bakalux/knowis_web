import React, { Component } from 'react';
import styles from './styles.module.scss';
import {Button, Form} from "semantic-ui-react";
import AuthService from './AuthService';

const authService = new AuthService();

class AuthLayout extends Component {

    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        };

    handleCreate(){
        authService.postReg(
            {
                'username': this.refs.username.value,
                'email': this.refs.email.value,
                'password1': this.refs.password1.value,
                'password2': this.refs.password2.value
            }
        ).then(function (response){
            console.log(response);
        }).catch(function (error){
            console.log(error);
        });
    }
    render (){
        return (
            <Form.input label='username' type='password' ref='username'/>
        )
    }


}


export default AuthLayout;
