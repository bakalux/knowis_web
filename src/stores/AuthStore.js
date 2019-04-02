import {observable, action} from "mobx";

class AuthStore {
    @observable userinfo = [];
    @action addUser = (user) => {
        this.userinfo.push(user)
    };
}

const store = new AuthStore();
export default store;