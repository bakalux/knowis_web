import {observable, action, computed, reaction} from "mobx";
import CommonStore from './CommonStore'
import UserStore from './UserStore'
import AuthService from '../services/AuthService'

const authService = new AuthService();

class AuthStore {
  @observable inProgress = false;
  @observable errors = undefined;
  @observable navBar = false;
  @observable signUp = false;


  @observable values = {
    username: '',
    email: '',
    password1: '',
    password2: '',
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
    UserStore.forgetUser();
    return Promise.resolve();
  }

  @action signup() {
    this.inProgress = true;
    this.errors = undefined;
    return authService.postSignup({
      username: this.values.username,
      email: this.values.email,
      password1: this.values.password1,
      password2: this.values.password2
    })
      .then(result => CommonStore.setToken(result.data.token))
      .catch(action((err) => {this.errors = err}))
      .finally(action(() => {this.inProgress = false;}))

  }



}

const store = new AuthStore();
export default store;