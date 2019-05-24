import axios from 'axios/index';



const API_URL = 'https://peaceful-ocean-66963.herokuapp.com';


export default class UserAccountService {
    constructor() {
    }

    current = (token) => {
        const url = `${API_URL}/api/profile/`;
        return axios.get(url, token).then(response => response.data);
    };

    getUserProfile = (token, slug) => {
        const url = `${API_URL}/api/profile/${slug}`
        return axios.get(url, token).then(response => response.data);
    }
}