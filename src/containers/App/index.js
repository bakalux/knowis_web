import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import  LoginPage from "../LoginPage"
import QuestionPage from "../QuestionPage"
import {Provider} from 'mobx-react';
import AuthStore from '../../stores/AuthStore';

const App = () => (
  <BrowserRouter>
      <Provider AuthStore={AuthStore}>
      <Switch>
          <Route path='/login' component={LoginPage} />
          <Redirect from='/' to='/login'/>
      </Switch>
      </Provider>
      <Switch>
          <Route path='/questions' component={QuestionPage} />
      </Switch>
  </BrowserRouter>
);

export default App;