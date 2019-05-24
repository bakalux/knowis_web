import {observable, action} from "mobx";
import AnswerService from '../services/AnswerService'
import CommonStore from "./CommonStore";
import QuestionStore from "./QuestionStore";

const answerService = new AnswerService();


class AnswerStore {
  @observable isCreatingAnswer = false;
  @observable answers=[];
  @observable answer = '';
  @observable answerUUID = '';
  @observable answerErrors = undefined;
  @observable inProgressAnswer = false;
  @observable showWindow = false;
  @observable selected;

  @action showInputWindow(key) {
    this.showWindow = !this.showWindow;
    this.selected = key
  }

  @action pushAnswer = (answer) => {
    this.answers.push(answer)
  };

  @action setAnswerText = (answer) => {
    this.answerText = answer
  };

  @action setAnswerUUID = (uuid) => {
    this.answerUUID = uuid
  };

  @action clearAnswers = () => {
    this.answers = [];
  };

  @action loadAnswersByUUID() {
    this.inProgressAnswer = true;
    return answerService.getAnswers({
      headers: {
        "Authorization": 'JWT ' + CommonStore.token,
      }
    }, QuestionStore.questionUUID)
      .then(result=> this.pushAnswer(result))
      .catch(action((err) => console.log('Error: ', err)))
      .finally(action(()=> {this.inProgressAnswer = false;}))
  }

  @action createAnswer(uuid, answer) {
    this.isCreatingAnswer = true;
    return answerService.postAnswer({
        "Authorization": 'JWT ' + CommonStore.token,
    }, {
      answer: answer
    }, uuid)
      .catch(err=> {
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers)
        }
      })
      .finally(action(() => {this.isCreatingAnswer = false;}))
  }

  @action deleteAnswer(uuid) {
    const idx = this.answers.map(item =>
      item.results.findIndex(a => a.uuid === uuid));
    if (idx > -1) this.answers.splice(idx, 1);
    return answerService.deleteAnswer({
      headers: {
        "Authorization": 'JWT ' + CommonStore.token
      }
    }, uuid)
      .catch(action(err => { this.loadAnswersByUUID();
      throw err}))
  };
}
const store = new AnswerStore();
export default store;