import axios from 'axios/index';

const API_URL = 'https://peaceful-ocean-66963.herokuapp.com';



export default class QuestionService {
  constructor() {

  };

  getQuestions = (data) => {
    const url = `${API_URL}/api/questions`;
    return axios.get(url, data).then(response => response.data);
  };

  getQuestionsByURL = (url, data) => {
    return axios.get(url, data).then(response => response.data);
  };
}