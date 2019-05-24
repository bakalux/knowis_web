import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';


@inject('UserStore', 'ProfileStore')
@observer
class ProfilePage extends Component {

  componentWillMount() {
    const slug = this.props.match.params.slug;
    this.props.ProfileStore.getUser(slug)
  }


  render () {
    const { user } = this.props.ProfileStore;
    console.log(user);
    return 0
  }
}

export default ProfilePage;