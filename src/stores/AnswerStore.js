import {observable, action} from "mobx";
import AnswerService from '../services/AnswerService'
import CommonStore from "./CommonStore";

const answerService = new AnswerService();


class AnswerStore {
    @observable isCreatingAnswer = false;
    @observable answers=[];
    @observable questionUUID = '';
    @observable commentErrors = undefined;
    @observable inProgressAnswer = false;


    @action addAnswer = (answer) => {
        this.answers.push(answer)
    };

    @action loadAnswersByUUID(uuid) {
        this.inProgress = true;
        answerService.getAnswers({
            headers: {
                "Authorization": 'JWT ' + CommonStore.token
            }
        }, uuid)
            .then(result=> this.addAnswer(result))
            .catch(action((err) => console.log('Error: ', err)))
            .finally(action(()=> {this.inProgress = false;}))


    }

    @action createAnswer(answer) {
        this.isCreatingAnswer = true;
        //TODO CREATE ANSWER SERVICE + ACTION
    }
}
const store = new AnswerStore();
export default store;