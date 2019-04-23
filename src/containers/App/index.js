import React from 'react';
import {Route, Switch} from "react-router-dom";
import { inject, observer } from 'mobx-react';
import  LoginPage from "../LoginPage"
import QuestionPage from "../QuestionPage"
import Header from "../Header"


@inject('CommonStore')
@inject('AuthStore')
@inject('UserStore')
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
                    <Header/>
                    <Switch>
                        <Route path='/login' component={LoginPage}/>
                        <Route path='/questions' component={QuestionPage}/>
                    </Switch>
                </div>
            )
        }
        return (
            <Header/>
        );
    }
}

export default App;
