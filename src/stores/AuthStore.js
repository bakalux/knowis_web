import {observable, action, computed} from "mobx";

class AuthStore {
    @observable usertoken = [];

    @action getToken = (user) => {
        this.usertoken.push(user)
    };

    @computed get userToken() {
        return this.usertoken[-1]
    };
}

const store = new AuthStore();
export default store;