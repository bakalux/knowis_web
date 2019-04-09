import {observable, action, computed} from "mobx";

class AuthStore {
    @observable userinfo = [];
    @action addUser = (user) => {
        this.userinfo.push(user)
    };
    @computed get userToken() {
        return this.userinfo[-1]
    };
}

const store = new AuthStore();
export default store;