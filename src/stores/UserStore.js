import { observable, action } from 'mobx';
import UserAccountService from '../services/UserAccountService'
import CommonStore from "./CommonStore";

const userAccountService = new UserAccountService();

class UserStore {
  @observable currentUser;
  @observable loadingUser;
  @observable updatingUser;
  @observable updatingUserErrors;
  @observable username;

  @action pullUser(){
    this.loadingUser = true;
    return userAccountService.current({
      headers: {
        "Authorization": 'JWT ' + CommonStore.token
      }
    })
      .then(result => {
        this.currentUser = result;
        this.currentUser.map(user=>this.setUserName(user.username))
      })
      .finally(action(() => {this.loadingUser = false;}))
  }

  @action forgetUser() {
    this.currentUser = undefined;
  }

  @action setUserName = (username) => {
    this.username = username
}
}

const store = new UserStore();
export default store;