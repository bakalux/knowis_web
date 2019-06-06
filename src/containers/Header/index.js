import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Menu, Button, Container,
  Image, Dropdown, Responsive, Visibility, Sidebar, Segment, Icon } from 'semantic-ui-react'
import { inject} from 'mobx-react';
import styles from './styles.module.scss';
import KnowisSearch from '../../components/common/search'

const getWidth = () => {
  const isSSR = typeof window === 'undefined';

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
};

const LoggedOutView = props => {
  if (!props.currentUser) {
    return (
        <Menu borderless className={styles.navBar}
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
              <Menu.Item header as={Link} to='/'>
                <Image avatar src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwpQWxE15D-8dwBtVXemg_UPsThPSV9voiM3jWXmtXUN0PjC2Vag' />
                KNOWIS
              </Menu.Item>
              <Menu.Menu position='right'>
                <Menu.Item>
                <KnowisSearch/>
                </Menu.Item>
                <Menu.Item>
                  <Dropdown trigger={<Image size='mini' src={props.currentUser.map(item => (item.avatar))}/>}>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        icon='address card outline'
                        text='Профіль'
                        as={Link}
                        to={`/profile/${props.slug}`}
                      />
                      <Dropdown.Item
                        icon='sign-out'
                        text='Вийти'
                        onClick={() => props.AuthStore.logout()
                          .then(props.history.replace('/login'))}/>
                    </Dropdown.Menu>
                  </Dropdown>
                </Menu.Item>
                <Menu.Item>
                <Button size='mini' color='yellow'
                        onClick={() => props.QuestionStore.showModal()}
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

const LoggedInViewMobile = props => {
  if (props.currentUser) {
    return (
      <div>
        <Sidebar
          as={Menu}
          animation='push'
          vertical
          onHide={props.handleSidebarHide}
          visible={props.sidebarOpened}
          width='thin'
        >
          <Menu.Item header as={Link} to='/'>
            <Image
              avatar
              src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwpQWxE15D-8dwBtVXemg_UPsThPSV9voiM3jWXmtXUN0PjC2Vag' />
            KNOWIS
          </Menu.Item>
          <Menu.Item
            as={Link}
            to={`/profile/${props.slug}`}
          >
            <Icon name='address card outline'/>
            Профіль
          </Menu.Item>
          <Menu.Item
            as={Link}
            onClick={() => props.AuthStore.logout()
                          .then(props.history.replace('/login'))}
          >
            <Icon name='sign-out'/>
            Вийти
          </Menu.Item>
        </Sidebar>
        <Menu borderless
            fixed='top'
            size='small'>
              <Menu.Item>
                <Icon
                  link
                  name='sidebar'
                  onClick={props.handleToggle}/>
              </Menu.Item>
              <Menu.Menu position='right'>
                <Menu.Item>
                <Button size='mini' color='yellow'
                        onClick={() => props.QuestionStore.showModal()}
                        content='Запитати'
                />
                </Menu.Item>
              </Menu.Menu>
          </Menu>
        <Sidebar.Pusher dimmed={props.sidebarOpened}
                        onClick={props.handleSidebarHide}>
        </Sidebar.Pusher>
      </div>
        )
  }
  return null;
};

const LoggedOutViewMobile = props => {
  if (!props.currentUser) {
    return (
      <div>
        <Menu borderless
            fixed='top'
            size='small'>
              <Link to='/'>
              <Menu.Item header as='a'>
                <Image size='mini' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwpQWxE15D-8dwBtVXemg_UPsThPSV9voiM3jWXmtXUN0PjC2Vag' />
                KNOWIS
              </Menu.Item>
              </Link>
              <Menu.Menu position='right'>
                <Menu.Item>
                </Menu.Item>
                <Menu.Item>
                   <Link to='/login' className={styles.navLink}>
                  <Button size='mini' color='yellow'>
                    Увійти</Button></Link>
                </Menu.Item>
              </Menu.Menu>
          </Menu>
      </div>
        )
  }
  return null;
};


@inject('UserStore', 'AuthStore', 'QuestionStore', 'CommonStore')
@withRouter
class Header extends Component {
  state = {};
  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });
  handleSidebarHide = () => this.setState({ sidebarOpened: false });
  handleToggle = () => this.setState({ sidebarOpened: !this.state.sidebarOpened });

  render() {
    return (
        <nav>
          <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
        <div className="container">
          <LoggedInView
            currentUser={this.props.UserStore.currentUser}
            activeItem={this.props.QuestionStore.headerActiveItem}
            AuthStore={this.props.AuthStore}
            QuestionStore={this.props.QuestionStore}
            history={this.props.history}
            slug={this.props.UserStore.slug}
          />
          <LoggedOutView currentUser={this.props.UserStore.currentUser}/>
        </div>
          </Visibility>
      </Responsive>
          <Responsive
            getWidth={getWidth}
            maxWidth={Responsive.onlyMobile.maxWidth}
          >
          <LoggedInViewMobile
          currentUser={this.props.UserStore.currentUser}
          activeItem={this.props.QuestionStore.headerActiveItem}
          AuthStore={this.props.AuthStore}
          QuestionStore={this.props.QuestionStore}
          history={this.props.history}
          slug={this.props.UserStore.slug}
          handleSideBarHide={this.handleSidebarHide}
          handleToggle={this.handleToggle}
          sidebarOpened={this.state.sidebarOpened}
          />
          <LoggedOutViewMobile
            currentUser={this.props.UserStore.currentUser}
          />
          </Responsive>
      </nav>

        )
  }
}

export default Header;
