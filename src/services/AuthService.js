import axios from 'axios/index';



const API_URL = 'https://peaceful-ocean-66963.herokuapp.com';
// const API_URL = '127.0.0.1:8000';



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