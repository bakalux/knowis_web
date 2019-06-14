import React, { Component } from 'react';
import styles from './styles.module.scss';
import {inject, observer} from 'mobx-react';
import {Button, Icon, Container, Divider, Form, Grid, Header, Image, Segment, Message} from 'semantic-ui-react'
import AuthLayout from '../AuthLayout'
import logo from '../../components/ui/img/logo_notxt.png'


@inject('AuthStore')
@observer
class LoginPage extends Component {

  handleEmailChange = (e) => this.props.AuthStore.setEmail(e.target.value);
  handlePasswordChange = (e) => this.props.AuthStore.setPassword1(e.target.value);
  handleSubmitLogin = (e) => {
    e.preventDefault();
    this.props.AuthStore.login()
      .then(() => this.props.history.replace('/'))
      .then(() => window.location.reload());
  };

  handleSignUp = () => this.props.AuthStore.showSignup();

  componentWillUnmount() {
    this.props.AuthStore.reset();
  }

  componentDidMount() {
    this.props.AuthStore.navBar = true;
  }

  render (){
    const {values, errors, inProgress, signUp} = this.props.AuthStore;
    console.log(errors)
    return (
      <div className='login-form'>
        <Container text style={{ marginTop: '4em'}}>
          <Segment>
            <Grid relaxed>
              <Grid.Row>
                <Grid.Column width={4}></Grid.Column>
                <Grid.Column textAlign='center' width={8}>
                  <Header as='h2' color='yellow'>
                    <Image
                      src={logo}/>
                      KNOWIS
                  </Header>
                  <p className={styles.description}>
                    Місце де знаходять відповіді
                  </p>
                </Grid.Column>
                <Grid.Column width={4}></Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2} divided>
                <Grid.Column textAlign='center'>
                  <Form error={errors} onSubmit={this.handleSubmitLogin}>
                    <Form.Input
                      name='username'
                      onChange={this.handleEmailChange}
                      value={values.email}
                      icon='user'
                      iconPosition='left'
                      label='E-mail'
                      placeholder='E-mail'
                      type='email'
                    />
                    <Form.Input
                      name='password'
                      onChange={this.handlePasswordChange}
                      value={values.password1}
                      icon='lock'
                      iconPosition='left'
                      label='Пароль'
                      type='password'
                      placeholder='Пароль'
                    />
                    <Message
                      error
                      header='Помилка'
                      content='Деталі для входу не вірні або аккаунт не зареєстровано'
                    />
                    <Button
                      disabled={!values.email || inProgress}
                      color='blue'
                      fluid size='large' >
                      Увійти
                    </Button>
                  </Form>
                </Grid.Column>
                <Grid.Column columns={2} textAlign='left'>
                  {signUp ? <AuthLayout/> :
                    <div>
                      <div className={styles.googleButton}>
                        <Button color='google plus'>
                          <Icon name='google plus' /> Увійти за допомогою Google &nbsp; &nbsp; &nbsp;
                        </Button>
                      </div>
                      <div className={styles.facebookButton}>
                        <Button color='facebook'>
                          <Icon name='facebook' /> Увійти за допомогою Facebook
                        </Button>
                      </div>
                      <div>
                        <a href='#'>
                          <p onClick={this.handleSignUp}
                             className={styles.info}
                          >Або Зареєструватися
                          </p>
                        </a>
                      </div>
                    </div>}
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </Container>
      </div>
    )
  }
}


export default LoginPage;
