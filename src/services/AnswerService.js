import axios from 'axios/index';

const API_URL = 'https://peaceful-ocean-66963.herokuapp.com';


export default class AnswerService {
    constructor() {}

    getAnswers = (token, uuid) => {
        const url = `${API_URL}/api/comments/q/${uuid}`;
        return axios.get(url, token).then(response => response.data)
    }

    postAnswer = (creds) => {
        const url = `${API_URL}/api/comments`;
        return axios.post(url, creds)
    }
}