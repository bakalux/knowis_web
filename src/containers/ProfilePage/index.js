import React, { PureComponent, Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter, Link } from 'react-router-dom';
import { Container, Header, Loader, Segment,
  Button, Icon, Grid, Image, Divider, Label, List, Message, } from 'semantic-ui-react'
import {toJS} from "mobx";
import logo from '../../components/ui/img/logo_notxt.png';
import styles from '../ProfilePage/styles.module.scss';


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
          <Grid.Column width={6}>
            <Image src='https://media.alienwarearena.com/media/photo.jpg.png' />
            <Button
              basic
              circular
              icon='edit'
              size='mini'
              content='Редагувати профіль'/>
          </Grid.Column>
          <Grid.Column width={10}>
            <List relaxed>
              <List.Item>
                <List.Content>
                  <List.Header>Maksym Proskurin</List.Header>
                  Студент 4 курсу
                </List.Content>
              </List.Item>
            </List>
          </Grid.Column>
          </Grid.Row>
          <Grid.Row>
                <Grid.Column width={6}>
                  <p className={styles.description}>
                    Питання що відстежуються
                  </p>
                </Grid.Column>
                <Grid.Column width={2}>
                </Grid.Column>
                <Grid.Column width={6}>
                  <p className={styles.description}>
                    Відповіді до питань
                  </p>
                </Grid.Column>
              </Grid.Row>
          <Grid.Row columns={2} divided>
            <Grid.Column>
              <List relaxed>
              <List.Item>
                <List.Content>
                  <List.Header
                  as={Link}
                  className={styles.headerTitle}
                  to='/'
                  >
                    TestQuestion
                  </List.Header>
                  <List.Description>
                    TestContent
                  </List.Description>
                </List.Content>
              </List.Item>
            </List>
            </Grid.Column>
            <Grid.Column>
              <List relaxed>
              <List.Item>
                <List.Content>
                  <List.Header
                  as={Link}
                  className={styles.headerTitle}
                  to='/'
                  >
                    TestQuestion
                  </List.Header>
                  <List.Description>
                    TestAnswer
                  </List.Description>
                </List.Content>
              </List.Item>
            </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        </Container>
      </div>
    )
  }
}

export default ProfilePage;