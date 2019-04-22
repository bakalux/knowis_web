import React from 'react'
import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Segment,
} from 'semantic-ui-react'

const NavBar = () => (
  <div>
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item header>
          <Image size='mini' src='https://www.shareicon.net/data/128x128/2015/09/14/101012_doge_512x512.png' style={{ marginRight: '1.5em' }} />
          knowis
        </Menu.Item>
        <Menu.Item as='a'>Home</Menu.Item>
      </Container>
    </Menu>
  </div>
)

export default NavBar;