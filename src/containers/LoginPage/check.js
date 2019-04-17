import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

render (){
        const {username, password} = this;
        return (
            <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450}}>
                    <Header as ='h2' color='orange' textAlign='center'>
                        <Image src=''>

                        </Image>
                    </Header>
                    <Form onSubmit={e => this.handleSubmit(e)}>
                        <Segment stacked>
                        <Form.Input
                                name='username' onChange={this.onChange} value={username}
                                icon='user' iconPosition='left' label='Username' placeholder='Username'
                        />
                        <Form.Input
                                name='password' onChange={this.onChange} value={password}
                                icon='lock' iconPosition='left' label='Password' type='password' placeholder='Password'
                        />
                        <Button content='Login' color='orange' fluid size='large'/>
                        </Segment>
                    </Form>>
                </Grid.Column>
            </Grid>

        )
    }