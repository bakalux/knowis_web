import axios from 'axios/index';

const API_URL = 'https://peaceful-ocean-66963.herokuapp.com';



export default class QuestionService {
  constructor() {

  };

  getQuestions = (token) => {
    const url = `${API_URL}/api/questions`;
    return axios.get(url, token).then(response => response.data);
  };

  getQuestionByUUID = (token, uuid) => {
    const url = `${API_URL}/api/questions/d/${uuid}`;
    return axios.get(url, token).then(response => response.data);
  };
}