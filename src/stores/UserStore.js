import { observable, action } from 'mobx';
import UserAccountService from '../services/UserAccountService'

const userAccountService = new UserAccountService();

class UserStore {
    @observable currentUser;
    @observable loadingUser;
    @observable updatingUser;
    @observable updatingUserErrors;

    @action pullUser(){
        this.loadingUser = true;
        return userAccountService.current()
            .then(result => {
                this.currentUser = result.data;
            })
            .finally(action(() => {this.loadingUser = false;}))
    }

    @action forgetuser() {
        this.currentUser = undefined;
    }
}

const store = new UserStore();
export default store;