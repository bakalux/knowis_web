import {observable, action} from "mobx";
import AnswerService from '../services/AnswerService'
import QuestionStore from './QuestionStore'
import CommonStore from "./CommonStore";

const answerService = new AnswerService();


class AnswerStore {
    @observable isLoading = false;
    @observable answers=[];
    @observable inProgress = false;


    @action addAnswer = (answer) => {
        this.answers.push(answer)
    };

    @action loadAnswersByUUID() {
        this.inProgress = true;
        answerService.getAnswers({
            headers: {
                "Authorization": 'JWT ' + CommonStore.token
            }
        }, QuestionStore.questionUUID)
            .then(result=> console.log(result))
            .catch(err => console.log('Error: ', err))
            .finally(action(()=> {this.inProgress = false;}))

    }

}
const store = new AnswerStore();
export default store;