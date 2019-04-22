import {observable, action, computed, reaction} from "mobx";

class AuthStore {
    @observable inProgress = false;
    @observable errors = undefined;
    @observable token = window.localStorage.getItem('jwt');
    @observable navbar = null;
    @observable isLogged = false;

    constructor() {
        reaction(
            () => this.token,
            token=> {
                if (token) {
                    window.localStorage.setItem('jwt', token);
                } else {
                    window.localStorage.removeItem('jwt');
                }
            }
        );
    }

    @action setToken(token) {
    this.token = token;
    }

    @computed get userToken() {
        return this.token
    }

    @action hideNavBar() {
        this.navbar = true;
    }

    @action logout () {
        this.token = undefined
    }

}

const store = new AuthStore();
export default store;