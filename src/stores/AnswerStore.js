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
  @observable isCreatingAnswer = false;


  @action pushAnswer = (answer) => {
    this.answers.push(answer)
  };

  @action setAnswer = (answer) => {
    this.answer = answer
  };

  @action setAnswerUUID = (uuid) => {
    this.answerUUID = uuid
  };

  @action loadAnswersByUUID() {
    this.inProgressAnswer = true;
    return answerService.getAnswers({
      headers: {
        "Authorization": 'JWT ' + CommonStore.token
      }
    }, QuestionStore.questionUUID)
      .then(result=> this.pushAnswer(result))
      .catch(action((err) => console.log('Error: ', err)))
      .finally(action(()=> {this.inProgressAnswer = false;}))
  }

  @action createAnswer() {
    this.isCreatingAnswer = true;
    return answerService.postAnswer({
      question: QuestionStore.question.id,
      comment: this.answer,
    })
      .then(() => this.loadAnswersByUUID())
      .catch(err=> console.log(err))
      .finally(action(() => {this.isCreatingAnswer = false;}))
  }

  @action deleteAnswer(uuid) {
    const idx = this.answers.map(item =>
      item.results.findIndex(c => c.uuid === uuid))
    if (idx > -1) this.answers.splice(idx, 1);
    return answerService.deleteAnswer({
      headers: {
        "Authorization": 'JWT ' + CommonStore.token
      }
    }, uuid)
  };
}
const store = new AnswerStore();
export default store;