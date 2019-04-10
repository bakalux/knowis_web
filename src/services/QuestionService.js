import axios from 'axios';

const API_URL = 'https://peaceful-ocean-66963.herokuapp.com';



export default class QuestionService {
  constructor() {

  }


  getQuestions = () => {
    const url = `${API_URL}/api/questions`
    return axios.get(url).then(response => response.data)
  }
}