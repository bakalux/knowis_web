import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Button, Form, Message, Grid } from 'semantic-ui-react';
import styles from './styles.module.scss';
import PropTypes from 'prop-types';

@inject('AuthStore')
@observer
class AuthLayout extends Component {
  handleEmailChange = e => this.props.AuthStore.setRegEmail(e.target.value);

  handleUsernameChange = e =>
    this.props.AuthStore.setRegUsername(e.target.value);

  handlePassword1Change = e =>
    this.props.AuthStore.setRegPassword1(e.target.value);

  handlePassword2Change = e =>
    this.props.AuthStore.setRegPassword2(e.target.value);

  handleFirstNameChange = e =>
    this.props.AuthStore.setRegFirstName(e.target.value);

  handleLastNameChange = e =>
    this.props.AuthStore.setRegLastName(e.target.value);

  handleSubmitSignUp = async (e) => {
    e.preventDefault();
    await this.props.AuthStore.signup()
  };

  handleSignUp = () => this.props.AuthStore.showSignup();

  render() {
    const {regValues, regErrors, inProgress} = this.props.AuthStore;
    return (
      <Grid.Column textAlign='center'>
        <Form error={regErrors} onSubmit={this.handleSubmitSignUp}>
          <Form.Group>
          <Form.Input width={8}
            name='firstName'
            onChange={this.handleFirstNameChange}
            value={regValues.firstName}
            icon='id card outline'
            iconPosition='left' label="Ім'я"
            placeholder="Ім'я" type='text'
          />
          <Form.Input width={8}
            name='LastName'
            onChange={this.handleLastNameChange}
            value={regValues.lastName}
            icon='id card outline'
            iconPosition='left' label="Прізвище"
            placeholder='Прізвище' type='text'
          />
          </Form.Group>
          <Form.Input
            name='username'
            onChange={this.handleUsernameChange}
            value={regValues.username}
            icon='user'
            iconPosition='left' label='Логін'
            placeholder='Логін' type='text'
          />
          <Form.Input
            name='email'
            onChange={this.handleEmailChange}
            value={regValues.email}
            icon='mail'
            iconPosition='left'
            label='E-mail'
            placeholder='E-mail'
            type='email'
          />
          <Form.Input
            name='password1'
            onChange={this.handlePassword1Change}
            value={regValues.password1}
            icon='lock'
            iconPosition='left'
            label='Пароль'
            type='password'
            placeholder='Пароль'
          />
          <Form.Input
            name='password2'
            onChange={this.handlePassword2Change}
            value={regValues.password2}
            icon='lock'
            iconPosition='left'
            label='Повторіть пароль'
            type='password'
            placeholder='Повторіть пароль'
          />
          <Message
            error
            header='Помилка'
            content='Аккаунт з таким email вже зареєстровано.'
          />
          <Button
            disabled={!regValues.email || inProgress}
            color='yellow'
            fluid size='large'>
            Зареєструватися
          </Button>
          <a href='#'>
            <p
              onClick={this.handleSignUp}
              className={styles.info}>
              Відмінити
            </p>
          </a>
        </Form>
      </Grid.Column>
    );
  }
}

export default AuthLayout;
