import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'mobx-react';
import { BrowserRouter } from 'react-router-dom';
import promiseFinally from 'promise.prototype.finally'
import AuthStore from './stores/AuthStore'
import QuestionStore from './stores/QuestionStore';
import CommonStore from './stores/CommonStore';
import UserStore from './stores/UserStore';

import * as serviceWorker from './serviceWorker';

import App from './containers/App';

// ReactDOM.render(StoreCheck, document.getElementById('store-check'))
// ReactDOM.render(Auth, document.getElementById('root'));
const stores = {
    AuthStore,
    QuestionStore,
    CommonStore,
    UserStore
};
promiseFinally.shim();

ReactDOM.render((
    <Provider {...stores}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
    ), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
