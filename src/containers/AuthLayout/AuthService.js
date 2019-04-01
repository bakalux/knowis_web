import axios from 'axios/index';

const API_URL = 'https://peaceful-ocean-66963.herokuapp.com';

export default class AuthService {

    constructor (){}

    postReg() {
        const url = `${API_URL}/auth/login`
        axios.post(url, {
            username: null,
            email: null,
            password1: null,
            password2: null
        })
    };
}