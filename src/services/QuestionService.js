import axios from 'axios/index';

const API_URL = 'https://peaceful-ocean-66963.herokuapp.com';
// const API_URL = '127.0.0.1:8000';

export default class QuestionService {
  constructor() {

  };

  getQuestions = (token) => {
    const url = `${API_URL}/api/questions`;
    return axios.get(url, token).then(response => response.data);
  };

  getQuestionsByURL = (url, token) => {
    return axios.get(url, token).then(response => response.data);
};

  getQuestionBySlug = (token, slug) => {
    const url = `${API_URL}/api/questions/d/${slug}`;
    return axios.get(url, token).then(response => response.data);
  };
}