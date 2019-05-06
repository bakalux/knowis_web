import {observable, action} from "mobx";
import AnswerService from '../services/AnswerService'
import CommonStore from "./CommonStore";
import QuestionStore from "./QuestionStore";

const answerService = new AnswerService();


class AnswerStore {
    @observable isCreatingAnswer = false;
    @observable answers=[];
    @observable answer = '';
    @observable commentErrors = undefined;
    @observable inProgressAnswer = false;


    @action addAnswer = (answer) => {
        this.answers.push(answer)
    };

    @action setAnswer = (answer) => {
        this.answer = answer
    };

    @action loadAnswersByUUID() {
        this.inProgressAnswer = true;
        answerService.getAnswers({
            headers: {
                "Authorization": 'JWT ' + CommonStore.token
            }
        }, QuestionStore.questionUUID)
            .then(result=> this.addAnswer(result))
            .catch(action((err) => console.log('Error: ', err)))
            .finally(action(()=> {this.inProgressAnswer = false;}))
    }

    @action createAnswer() {
        this.isCreatingAnswer = true;
        //TODO CREATE ANSWER SERVICE + ACTION
    }
}
const store = new AnswerStore();
export default store;