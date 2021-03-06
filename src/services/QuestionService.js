import axios from 'axios/index';

const API_URL = 'http://167.71.32.162/back';


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

  postQuestion = (token, data) => {
    const url = `${API_URL}/api/question/`;
    return axios({
      method: 'post',
      url: url,
      headers: token,
      params: data,
    })
  };
}
