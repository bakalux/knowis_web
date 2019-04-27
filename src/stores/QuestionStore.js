import {observable, action, computed} from "mobx";
import QuestionService from '../services/QuestionService'
import CommonStore from './CommonStore'

const questionService = new QuestionService();

class QuestionStore {
    @observable questions = [];
    @observable nextPageURL = '';
    @observable isLoading = false;
    @observable inProgress = false;

    @action addQuestion = (question) => {
        this.questions.push(question);
    };

    @computed get questionCount() {
        return this.questions.length;
    }

    @action loadQuestions() {
        this.isLoading = true;
        return questionService.getQuestions({
            headers: {
                "Authorization": 'JWT ' + CommonStore.token
            }
        })
            .then(result => this.addQuestion(result))
            .catch(err => console.log(err))
            .finally(action(() => {this.isLoading = false;}))

    }

    @action nextPage() {
        this.inProgress = true;
        this.questions.map(question => (
            this.nextPageURL = question.next
        ));
        questionService.getQuestionsByURL(this.nextPageURL, {
            headers: {
                "Authorization": 'JWT ' + CommonStore.token
            }
        })
            .then(result => this.addQuestion(result))
            .catch(err => console.log(err))
            .finally(action(() => {this.inProgress = false;}))
    };
}

const store = new QuestionStore();
export default store;