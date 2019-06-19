import axios from 'axios/index';



const API_URL = 'http://167.71.32.162/back';




export default class AuthService {
    constructor() {}

    postLogin = (creds) => {
        const url = `${API_URL}/auth/login/`;
        return axios.post(url, creds);
    };

    postSignup = (creds) => {
        const url = `${API_URL}/auth/registration/`;
        return axios.post(url, creds);
    }

}
