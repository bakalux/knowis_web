import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Button, Form } from 'semantic-ui-react';
import axios from 'axios/index';
import AuthService from '../../services/AuthService';
import styles from './styles.module.scss';

const API_URL = 'https://peaceful-ocean-66963.herokuapp.com';

@inject('AuthStore')
@observer
class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  authReg() {
    const url = `${API_URL}/auth/registration/`;
    axios
      .post(url, {
        username: this.refs.username.value,
        email: this.refs.email.value,
        password1: this.refs.password1.value,
        password2: this.refs.password2.value
      })
      .then(result => {
        this.props.AuthStore.addUser(result.data);
      })
      .catch(error => {
        console.log(error.response);
      });
  }

  handleSubmit = e => {
    this.authReg();
    e.preventDefault();
  };

  render() {
    return (
      <Form onSubmit={e => this.handleSubmit(e)}>
        <Form.Field>
          <label>Username</label>
          <input placeholder="username" ref="username" />
        </Form.Field>
        <Form.Field>
          <label>Email</label>
          <input placeholder="Email" ref="email" />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input placeholder="Password" ref="password1" />
        </Form.Field>
        <Form.Field>
          <label>Retype Password</label>
          <input placeholder="Retype Password" ref="password2" />
        </Form.Field>
        <Button type="submit">Submit</Button>
      </Form>
    );
  }
}

export default LoginPage;
