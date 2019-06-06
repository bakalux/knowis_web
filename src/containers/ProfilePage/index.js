import React, { PureComponent, Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { Container, Header, Loader, Segment,
  Button, Icon, Grid, Image, Divider, Label, List, Message } from 'semantic-ui-react'
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
      <div style={{ marginTop: '5em'}}>
        <Grid>
          <Grid.Row>
            <Grid.Column>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

export default ProfilePage;