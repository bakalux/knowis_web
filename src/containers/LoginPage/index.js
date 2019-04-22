import React, { Component } from 'react';
import styles from './styles.module.scss';
import {inject, observer} from 'mobx-react';
import {Button, Icon, Container, Divider, Form, Grid, Header, Image, Segment, Message} from 'semantic-ui-react'


@inject('AuthStore')
@observer
class LoginPage extends Component {

    handleEmailChange = e => this.props.AuthStore.setEmail(e.target.value)
    handlePasswordChange = e => this.props.AuthStore.setPassword1(e.target.value)
    handleSubmitForm = (e) => {
        e.preventDefault();
        this.props.AuthStore.login()
    };

    componentWillUnmount() {
        this.props.AuthStore.reset();
    }

    render (){
        const {values, errors, inProgress} = this.props.AuthStore;
        return (
            <div className='login-form'>
                <Container>
                    <Message attached>
                    <Header as ='h2' color='orange' textAlign='center'>
                        <Image src='https://i1.wp.com/frenky.id/wp-content/uploads/2018/02/doge-icon.png?ssl=1'/>
                        Увійти до аккаунту
                    </Header>
                    </Message>
                    <Segment attached>
            <Grid columns = {2} textAlign='center' verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450}}>
                    <Form error={errors} onSubmit={this.handleSubmitForm}>
                        <Form.Input
                                name='username' onChange={this.handleEmailChange} value={values.email}
                                icon='user' iconPosition='left' label='E-mail' placeholder='E-mail' type='email'
                        />
                        <Form.Input
                                name='password' onChange={this.handlePasswordChange} value={values.password1}
                                icon='lock' iconPosition='left' label='Пароль' type='password' placeholder='Пароль'
                        />
                        <Message
                            error
                            header='Помилка'
                            content='Деталі для входу не вірні або аккаунт не зареєстровано'
                        />
                        <Button disabled={inProgress} content='Увійти' color='orange' fluid size='large'/>
                    </Form>
                </Grid.Column>
                <Grid.Column>
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
                </Grid.Column>
            </Grid>
                    <Divider vertical>Або</Divider>
                        </Segment>
                </Container>
            </div>
        )
    }


}


export default LoginPage;
