import axios from 'axios/index';



const API_URL = 'https://peaceful-ocean-66963.herokuapp.com'

export default class AuthService {
    constructor() {
    }

    postLogin = (creds) => {
        const url = `${API_URL}/auth/login/`;
        return axios.post(url, creds);
    }
}