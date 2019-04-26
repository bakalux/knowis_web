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
    handleSubmitSignUp = async (e) => {
        e.preventDefault();
        await this.props.AuthStore.signup()
    };

    render() {
        const {values, errors, inProgress} = this.props.AuthStore;
    return (
        <Grid.Column columns={2} textAlign='center'>
                                    <Form error={errors} onSubmit={this.handleSubmitForm}>
                                        <Form.Input
                                            name='username' onChange={this.handleUsernameChange} value={values.email}
                                            icon='user' iconPosition='left' label='Логін' placeholder='Логін' type='text'
                                        />
                                        <Form.Input
                                            name='password' onChange={this.handlePasswordChange} value={values.password1}
                                            icon='lock' iconPosition='left' label='Пароль' type='password' placeholder='Пароль'
                                        />
                                        <Form.Input
                                            name='email' onChange={this.handleEmailChange} value={values.email}
                                            icon='mail' iconPosition='left' label='E-mail' placeholder='E-mail' type='email'
                                        />
                                        <Form.Input
                                            name='password2' onChange={this.handlePasswordChange} value={values.password2}
                                            icon='lock' iconPosition='left' label='Повторіть пароль' type='password' placeholder='Повторіть пароль'
                                        />
                                        <Message
                                            error
                                            header='Помилка'
                                            content='Деталі для входу не вірні або аккаунт не зареєстровано'
                                        />
                                        <Button disabled={(!values.email && !values.username) || inProgress}  color='orange' fluid size='large' >
                                            Зареєструватися
                                        </Button>
                                    </Form>
                                </Grid.Column>
    );
  }
}

export default LoginPage;
