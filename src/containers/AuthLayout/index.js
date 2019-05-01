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
    handleSignUp = e => this.props.AuthStore.signUp = !this.props.AuthStore.signUp;


    render() {
        const {values, errors, inProgress} = this.props.AuthStore;
    return (
        <Grid.Column textAlign='center'>
                                    <Form error={errors} onSubmit={this.handleSubmitSignUp}>
                                        <Form.Input
                                            name='username' onChange={this.handleUsernameChange} value={values.username}
                                            icon='user' iconPosition='left' label='Логін' placeholder='Логін' type='text'
                                        />
                                        <Form.Input
                                            name='email' onChange={this.handleEmailChange} value={values.email}
                                            icon='mail' iconPosition='left' label='E-mail' placeholder='E-mail' type='email'
                                        />
                                        <Form.Input
                                            name='password1' onChange={this.handlePassword1Change} value={values.password1}
                                            icon='lock' iconPosition='left' label='Пароль' type='password' placeholder='Пароль'
                                        />
                                        <Form.Input
                                            name='password2' onChange={this.handlePassword2Change} value={values.password2}
                                            icon='lock' iconPosition='left' label='Повторіть пароль' type='password' placeholder='Повторіть пароль'
                                        />
                                        <Message
                                            error
                                            header='Помилка'
                                            content='Аккаунт з таким email вже зареєстровано.'
                                        />
                                        <Button disabled={!values.email || inProgress}  color='orange' fluid size='large' >
                                            Зареєструватися
                                        </Button>
                                        <a href='#'><p onClick={this.handleSignUp} className={styles.info}>Відмінити</p></a>
                                    </Form>
                                </Grid.Column>
    );
  }
}

export default LoginPage;
