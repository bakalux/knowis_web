import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Button, Container, Image, Icon, Dropdown } from 'semantic-ui-react'
import { inject, observer } from 'mobx-react';
import QuestionPage from "../QuestionPage";
import styles from './styles.module.scss';
import KnowisSearch from '../../components/ui/search'


const LoggedOutView = props => {
  if (!props.currentUser) {
    return (
        <Menu className={styles.navBar}
            fixed='top'
            size='small'>
            <Container >
              <Menu.Item header as='a'>
                <Image size='mini' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwpQWxE15D-8dwBtVXemg_UPsThPSV9voiM3jWXmtXUN0PjC2Vag' />
                KNOWIS
              </Menu.Item>
              <Menu.Menu position='right'>
                <Menu.Item>
                <KnowisSearch/>
                </Menu.Item>
                <Menu.Item>
                  <Button size='mini' color='yellow'>Увійти</Button>
                </Menu.Item>
              </Menu.Menu>
            </Container>
          </Menu>
    )
  }
  return null;
};

const LoggedInView = props => {
  if (props.currentUser) {
    return (
            <Menu className={styles.navBar}
            fixed='top'
            size='small'>
            <Container >
              <Menu.Item header as='a'>
                <Image size='mini' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwpQWxE15D-8dwBtVXemg_UPsThPSV9voiM3jWXmtXUN0PjC2Vag' />
                KNOWIS
              </Menu.Item>
              <Menu.Item as='a'>
                <Icon name='home'/>
                Головна
              </Menu.Item>
              <Menu.Item as='a'>
                <Icon name='write square'/>
                Відповісти
              </Menu.Item>
              <Menu.Menu position='right'>
                <Menu.Item>
                <KnowisSearch/>
              </Menu.Item>
                <Menu.Item>
                  <Dropdown trigger={<Image size='mini' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwpQWxE15D-8dwBtVXemg_UPsThPSV9voiM3jWXmtXUN0PjC2Vag' />}>
                    <Dropdown.Menu>
                      <Dropdown.Item icon='address card outline' text='Профіль'/>
                      <Dropdown.Divider />
                      <Dropdown.Item icon='fly' text='Вийти'/>
                    </Dropdown.Menu>
                  </Dropdown>
                </Menu.Item>
                <Menu.Item>
                <Button size='mini' color='yellow'>Запитати</Button>
                </Menu.Item>
              </Menu.Menu>
            </Container>
          </Menu>
        );
  }
  return null;
};


@inject('UserStore', 'CommonStore')
class Header extends Component {
  render() {
    return (
        <div>
          <LoggedInView currentuser={this.props.UserStore.currentUser}/>
          <LoggedOutView currentUser={this.props.UserStore.currentUser}/>
        </div>
        )
  }
}

export default Header;