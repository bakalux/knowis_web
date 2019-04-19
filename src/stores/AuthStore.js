import {observable, action, computed} from "mobx";

class AuthStore {
    @observable usertoken = [];
    @observable navbar = null;

    @action getToken = (user) => {
        this.usertoken.push(user)
    };

    @action hideNavBar() {
        this.navbar = true;
    }

    @computed get userToken() {
        return this.usertoken[-1]
    };
}

const store = new AuthStore();
export default store;