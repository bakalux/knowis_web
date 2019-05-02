import axios from 'axios/index';



const API_URL = 'https://peaceful-ocean-66963.herokuapp.com';
// const API_URL = '127.0.0.1:8000';


export default class UserAccountService {
    constructor() {
    }

    current = (token) => {
        const url = `${API_URL}/api/profile/`;
        return axios.get(url, token).then(response => response.data);
    }
}