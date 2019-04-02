import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import App from './containers/App';
import AuthLayout from './containers/AuthLayout';
import LoginPage from './containers/LoginPage';
import {Provider} from 'mobx-react';
import QuestionStore from './stores/QuestionStore';
import AuthStore from './stores/AuthStore';

const StoreCheck = (
    <Provider QuestionStore={QuestionStore}>
        <App/>
    </Provider>
);

const Auth = (
    <Provider AuthStore={AuthStore}>
        <AuthLayout/>
    </Provider>
);

const Login = (
    <Provider AuthStore={AuthStore}>
        <LoginPage/>
    </Provider>
);
// ReactDOM.render(StoreCheck, document.getElementById('store-check'))
ReactDOM.render(Auth, document.getElementById('root'));
ReactDOM.render(Login, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
