import React from 'react';
import {Route, Switch, withRouter} from "react-router-dom";
import { inject, observer } from 'mobx-react';
import  LoginPage from "../LoginPage"
import QuestionPage from "../QuestionPage"
import AuthLayout from "../AuthLayout"
import Header from "../Header"

@inject('CommonStore', 'AuthStore', 'UserStore')
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
                    <Header/>
                    {/*{(this.props.AuthStore.navbar) ? null : <Header/>}*/}
                    <Switch>
                        <Route path='/login' component={LoginPage}/>
                        <Route path='/signup' component={AuthLayout}/>
                        <Route path='/' component={QuestionPage}/>
                    </Switch>
                </div>
            );
        }
        return (
            <Header/>
        );
    }
}

export default App;
