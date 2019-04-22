import React from 'react';
import {Route, Switch} from "react-router-dom";
import { inject, observer } from 'mobx-react';
import  LoginPage from "../LoginPage"
import QuestionPage from "../QuestionPage"
import Header from "../Header"


@inject('CommonStore')
@inject('AuthStore')
@observer
class App extends React.Component{

    componentWillMount() {
        if (!this.props.CommonStore.token) {
            this.props.CommonStore.setAppLoaded();
        }
    }

    render() {
        return (
            <div>
                <Switch>
                    <Route path='/login' component={LoginPage}/>
                    <Route path='/questions' component={QuestionPage}/>
                </Switch>
            </div>
        )
    }


}

export default App;
