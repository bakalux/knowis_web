import { observable, action } from 'mobx';
import UserAccountService from '../services/UserAccountService'
import CommonStore from "./CommonStore";

const userAccountService = new UserAccountService();

class UserStore {
  @observable currentUser;
  @observable loadingUser = false;
  @observable updatingUser;
  @observable updatingUserErrors;
  @observable username;
  @observable slug;

  @action pullUser() {
    this.loadingUser = true;
    return userAccountService.current({
      headers: {
        "Authorization": 'JWT ' + CommonStore.token
      }
    })
      .then(result => {
        this.currentUser = result;
          this.setUserName(this.currentUser.username);
          this.setUserSlug(this.currentUser.slug);
        })
      .finally(action(() => {this.loadingUser = false;}))
  };

  @action forgetUser() {
    this.currentUser = undefined;
  };

  @action setUserName = (username) => {
    this.username = username
  };

  @action setUserSlug = (slug) => {
    this.slug = slug
  };
}

const store = new UserStore();
export default store;
