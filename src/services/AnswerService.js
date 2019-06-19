import axios from 'axios/index';
import CommonStore from "../stores/CommonStore";

const API_URL = 'http://167.71.32.162/back';


export default class AnswerService {
    constructor() {}

    getAnswers = (token, uuid) => {
        const url = `${API_URL}/api/answers/q/${uuid}`;
        return axios.get(url, token).then(response => response.data);
    };

    postAnswer = (token, data, uuid) => {
        const url = `${API_URL}/api/answers/c/${uuid}/`;
        return axios({
            method: 'post',
            url: url,
            headers: token,
            params: data
        })
    };

    deleteAnswer = (token, uuid) => {
        const url = `${API_URL}/api/answers/d/${uuid}`;
        return axios.delete(url, token)
            .catch(err => console.log(err));
    }
}
