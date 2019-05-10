import axios from 'axios/index';

const API_URL = 'https://peaceful-ocean-66963.herokuapp.com';


export default class AnswerService {
    constructor() {}

    getAnswers = (token, uuid) => {
        const url = `${API_URL}/api/answers/q/${uuid}`;
        return axios.get(url, token).then(response => response.data);
    };

    postAnswer = (token, data, uuid) => {
        const url = `${API_URL}/api/answers/u/${uuid}`;
        return axios.post(url, token, data);
    };

    deleteAnswer = (token, uuid) => {
        const url = `${API_URL}/api/answers/d/${uuid}`;
        return axios.delete(url, token)
            .catch(err => console.log(err));
    }
}