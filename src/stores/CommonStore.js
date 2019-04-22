import { observable, action, reaction } from 'mobx';


class CommonStore {
    @observable appName = 'knowis'
    @observable token = window.localStorage.getItem('jwt');
    @observable appLoaded = false;


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

    @action setAppLoaded() {
        this.appLoaded = true;
    }


}

const store = new CommonStore();
export default store;