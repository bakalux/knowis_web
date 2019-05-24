import { observable, action } from 'mobx';
import UserAccountService from '../services/UserAccountService'
import CommonStore from "./CommonStore";

const userAccountService = new UserAccountService();


class ProfileStore {
  @observable user;
  @observable isLoading = false;

  @action setUser = (user) => {
    this.user = user
  };

  @action getUser(slug){
    this.isLoading = true;
    return userAccountService.getUserProfile({
      headers: {
        "Authorization": 'JWT ' + CommonStore.token
      }
    }, slug)
      .then(result => this.setUser(result))
      .catch(err => console.log(err))
      .finally(action (() => {
        this.isLoading = false;
      }))
  }
}

const store = new ProfileStore();
export default store;