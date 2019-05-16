import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Menu, Button, Container, Image, Icon, Dropdown } from 'semantic-ui-react'
import { inject} from 'mobx-react';
import styles from './styles.module.scss';
import KnowisSearch from '../../components/common/search'



const LoggedOutView = props => {
  if (!props.currentUser) {
    return (
        <Menu className={styles.navBar}
            fixed='top'
            size='small'>
            <Container >
              <Link to='/'>
              <Menu.Item header as='a'>
                <Image size='mini' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwpQWxE15D-8dwBtVXemg_UPsThPSV9voiM3jWXmtXUN0PjC2Vag' />
                KNOWIS
              </Menu.Item>
              </Link>
              <Menu.Menu position='right'>
                <Menu.Item>
                <KnowisSearch/>
                </Menu.Item>
                <Menu.Item>
                   <Link to='/login' className={styles.navLink}>
                  <Button size='mini' color='yellow'>
                    Увійти</Button></Link>
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
      <div>
            <Menu borderless className={styles.navBar}
            fixed='top'
            size='small'>
            <Container >
              <Menu.Item header as='a'>
                <Image avatar src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwpQWxE15D-8dwBtVXemg_UPsThPSV9voiM3jWXmtXUN0PjC2Vag' />
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
                  <Dropdown trigger={<Image size='mini' src={props.currentUser.map(item => (item.avatar))}/>}>
                    <Dropdown.Menu>
                      <Dropdown.Item icon='address card outline' text='Профіль'/>
                      <Dropdown.Divider />
                      <Dropdown.Item
                        icon='address card outline'
                        text='Вийти'
                        onClick={() => props.AuthStore.logout()
                          .then(props.history.replace('/login'))}/>
                    </Dropdown.Menu>
                  </Dropdown>
                </Menu.Item>
                <Menu.Item>
                <Button size='mini' color='yellow'
                        onClick={() => props.QuestionStore.showDimmer()}
                        content='Запитати'
                />
                </Menu.Item>
              </Menu.Menu>
            </Container>
          </Menu>
      </div>
        )
  }
  return null;
};


@inject('UserStore', 'AuthStore', 'QuestionStore')
@withRouter
class Header extends Component {
  render() {
    return (
      <nav>
        <div className="container">
          <LoggedInView
            currentUser={this.props.UserStore.currentUser}
            AuthStore={this.props.AuthStore}
            QuestionStore={this.props.QuestionStore}
            history={this.props.history}/>
          <LoggedOutView currentUser={this.props.UserStore.currentUser}/>
        </div>
      </nav>)
  }
}

export default Header;
