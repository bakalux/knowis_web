import React, { Component } from 'react';
import styles from './styles.module.scss';
import {inject, observer} from 'mobx-react';
import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react'
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
            username: username,
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
            <Segment>
                <Grid columns={2} relaxed='very' stackable>
                    <Grid.Column>
                        <Form onSubmit={e => this.handleSubmit(e)}>
                            <Form.Input
                                name='username' onChange={this.onChange} value={username}
                                icon='user' iconPosition='left' label='Username' placeholder='Username'
                            />
                            <Form.Input
                                name='password' onChange={this.onChange} value={password}
                                icon='lock' iconPosition='left' label='Password' type='password' placeholder='Password'
                            />
                            <Button content='Login' primary/>
                        </Form>
                    </Grid.Column>
                    <Grid.Column>
                        <Button type='submit' content='Sign up' icon='signup' size='big'/>
                    </Grid.Column>
                </Grid>
                <Divider vertical>Or</Divider>
            </Segment>
        )

    }


}


export default LoginPage;
