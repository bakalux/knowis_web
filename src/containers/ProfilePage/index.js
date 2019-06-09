import React, { PureComponent, Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { Container, Header, Loader, Segment,
  Button, Icon, Grid, Image, Divider, Label, List, Message, } from 'semantic-ui-react'
import {toJS} from "mobx";


@inject('UserStore', 'ProfileStore')
@withRouter
@observer
class ProfilePage extends PureComponent {

  componentWillMount() {
    const slug = this.props.match.params.slug;
    this.props.ProfileStore.getUser(slug);
  }

  render () {
    const { user } = this.props.ProfileStore;
    return (
      <div style={{ marginTop: '10em'}}>
        <Container>
        <Grid>
          <Grid.Row>
          <Grid.Column width={4}>
            <Image src='https://upload.wikimedia.org/wikipedia/commons/0/05/Favicon_250x250.png' />
          </Grid.Column>
          <Grid.Column width={9}>
            <List relaxed>
              <List.Item>
                <List.Content>
                  <List.Header>Maksym Proskurin</List.Header>
                  Hello worldHello worldHello worldHello worldHello worldHello world
                  Hello worldHello worldHello worldHello worldHello worldHello world
                  Hello worldHello worldHello worldHello worldHello worldHello world
                  Hello worldHello worldHello worldHello worldHello worldHello world
                </List.Content>
              </List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={3}>
            <Button
              content='edit'
            />
          </Grid.Column>
          </Grid.Row>
        </Grid>
        </Container>
      </div>
    )
  }
}

export default ProfilePage;