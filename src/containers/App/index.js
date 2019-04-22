import React from 'react';
import {BrowserRouter, Route, Switch, Redirect, Link} from "react-router-dom";
import  LoginPage from "../LoginPage"
import QuestionPage from "../QuestionPage"
import {Provider} from 'mobx-react';
import AuthStore from '../../stores/AuthStore';
import QuestionStore from '../../stores/QuestionStore';
import NavBar from '../../components/common/nav'


const App = () => (
    <BrowserRouter>
    <Provider AuthStore={AuthStore}>
        <Provider QuestionStore={QuestionStore}>
            <Switch>
                <Route exact path='/(login)' component={LoginPage}/>
                {/*{ (AuthStore.navbar) ? null : <NavBar /> }*/}
                <Route path='/questions' component={QuestionPage}/>
            </Switch>
        </Provider>
    </Provider>
  </BrowserRouter>
);

export default App;