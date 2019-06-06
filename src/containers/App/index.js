import React from 'react';
import {Route, Switch, withRouter} from "react-router-dom";
import { inject, observer } from 'mobx-react';
import  LoginPage from "../LoginPage"
import  Question from "../Question"
import QuestionPage from "../QuestionPage"
import Header from "../Header"
import QuestionInput from "../QuestionInput"
import ProfilePage from "../ProfilePage"

@inject('CommonStore', 'AuthStore', 'UserStore', 'QuestionStore')
@withRouter
@observer
class App extends React.Component{

  componentWillMount() {
    if (!this.props.CommonStore.token) {
      this.props.CommonStore.setAppLoaded();
    }
  }

  componentDidMount() {
    if (this.props.CommonStore.token){
      this.props.UserStore.pullUser()
        .finally(() => this.props.CommonStore.setAppLoaded());
    }
  }

  render() {
    if (this.props.CommonStore.appLoaded) {
      return (
        <div>
          <QuestionInput/>
          <div>
            {(this.props.AuthStore.navBar) ? false : <Header/>}
            <Switch>
              <Route path='/login' component={LoginPage}/>
              <Route path='/profile/:slug' component={ProfilePage}/>
              <Route path='/:slug' component={Question}/>
              <Route path='/' component={QuestionPage}/>
            </Switch>
          </div>
        </div>
      );
    }
    return (
      <Header/>
    )
  }
}

export default App;
