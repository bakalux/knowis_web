import {observable, action, computed, reaction} from "mobx";
import CommonStore from './CommonStore'
import UserStore from './UserStore'
import AuthService from '../services/AuthService'

const authService = new AuthService();

class AuthStore {
  @observable inProgress = false;
  @observable errors = undefined;
  @observable regErrors = undefined;
  @observable navBar = false;
  @observable signUp = false;
  @observable values = {
    username: '',
    email: '',
    password1: '',
  };

  @observable regValues = {
    username: '',
    email: '',
    password1: '',
    password2: '',
    firstName: '',
    lastName: '',
  };

  @action setUsername(username) {
    this.values.username = username
  }

  @action setPassword1(password1) {
    this.values.password1 = password1
  }

  @action setEmail(email) {
    this.values.email = email
  }

  @action setRegUsername(username) {
    this.regValues.username = username
  }

  @action setRegEmail(email) {
    this.regValues.email = email
  }

  @action setRegPassword1(password1) {
    this.regValues.password1 = password1
  }

  @action setRegPassword2(password2) {
    this.regValues.password2 = password2
  }

  @action setRegFirstName(firstName) {
    this.regValues.firstName = firstName
  }

  @action setRegLastName(lastName) {
    this.regValues.lastName = lastName
  }

  @action showSignup(){
    this.signUp = !this.signUp
  }

  @action reset() {
    this.values.username = '';
    this.values.email = '';
    this.values.password1 = '';
    this.values.password2 = '';

    this.regValues.username = '';
    this.regValues.email = '';
    this.regValues.password1 = '';
    this.regValues.password2 = '';
  }

  @action login() {
    this.inProgress = true;
    this.errors = undefined;
    return authService.postLogin({
      email: this.values.email,
      password: this.values.password1
    })
      .then(result => CommonStore.setToken(result.data.token))
      .then(() => UserStore.pullUser())
      .catch(action((err) => {
        this.errors = err.response && err.response.body
          && err.response.body.errors;
        throw err;
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
      username: this.regValues.username,
      email: this.regValues.email,
      password1: this.regValues.password1,
      password2: this.regValues.password2,
      first_name: this.regValues.firstName,
      last_name: this.regValues.lastName,
    })
      .then(result => CommonStore.setToken(result.data.token))
      .catch(action((err) => {this.regErrors = err;
      console.log(err.response.data)}))
      .finally(action(() => {this.inProgress = false;}))

  }
}

const store = new AuthStore();
export default store;