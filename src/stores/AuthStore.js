import {observable, action, computed, reaction} from "mobx";
import CommonStore from './CommonStore'
import AuthService from '../services/AuthService'

const authService = new AuthService();

class AuthStore {
    @observable inProgress = false;
    @observable errors = undefined;
    @observable navbar = null;

    @observable values = {
        username: '',
        email: '',
        password1: '',
        password2: '',
    };

    @action hideNavBar() {
        this.navbar = true;
    };

    @action setUsername(username) {
        this.values.username = username
    }

    @action setEmail(email) {
        this.values.email = email
    }

    @action setPassword1(password1) {
        this.values.password1 = password1
    }

    @action setPassword2(password2) {
        this.values.password1 = password2
    }

    @action reset() {
        this.values.username = '';
        this.values.email = '';
        this.values.password1 = '';
        this.values.password2 = '';
    }

    @action login() {
        this.inProgress = true;
        this.errors = undefined;
        return authService.postLogin({
            email: this.values.email,
            password: this.values.password1
        })
            .then(result => CommonStore.setToken(result.data.token))
            .catch(action((err) => {
                this.errors = err
            }))
            .finally(action(() => {this.inProgress = false;}))
    }

    @action logout() {
        CommonStore.setToken(undefined);
        return Promise.resolve();
    }



}

const store = new AuthStore();
export default store;