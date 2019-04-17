import React, { Component } from 'react';
import styles from './styles.module.scss';
import {inject, observer} from 'mobx-react';
import {Button, Icon, Container, Divider, Form, Grid, Header, Image, Segment, Message} from 'semantic-ui-react'
import AuthService from '../../services/AuthService';

const authService = new AuthService();

@inject('AuthStore')
@observer
class LoginPage extends Component {

    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (e) => {
        const {username, password} = this;
        authService.postLogin({
            email: username,
            password: password
        }).then(result => this.props.AuthStore.getToken(result.data.token))
            .catch(error=> console.log(error));
        e.preventDefault();
    };

    onChange = (e) =>{
        const {name, value} = e.target;
        this[name] = value;
    };

    render (){
        const {username, password} = this;
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
                    <Form onSubmit={e => this.handleSubmit(e)}>
                        <Form.Input
                                name='username' onChange={this.onChange} value={username}
                                icon='user' iconPosition='left' label='E-mail' placeholder='E-mail'
                        />
                        <Form.Input
                                name='password' onChange={this.onChange} value={password}
                                icon='lock' iconPosition='left' label='Пароль' type='password' placeholder='Пароль'
                        />
                        <Button content='Увійти' color='orange' fluid size='large'/>
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
