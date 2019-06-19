import axios from 'axios/index';



const API_URL = 'http://167.71.32.162/back';


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
