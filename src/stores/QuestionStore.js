import {observable, action, computed} from "mobx";
import QuestionService from '../services/QuestionService'
import CommonStore from './CommonStore'

const questionService = new QuestionService();

class QuestionStore {
    @observable questions = [];
    @observable nextPageURL = [];
    @observable isLoading = false;
    @observable inProgress = false;

    @action addQuestion = (question) => {
        this.questions.push(question);
    };

    @action addNextPageURL = (url) => {
        this.nextPageURL.push(url);
    };

    @computed get pageUrl() {
        return this.nextPageURL.slice(-1).pop();
    }

    @computed get questionCount() {
        return this.questions.length;
    }

    @action loadQuestions() {
        this.isLoading = true;
        return questionService.getQuestions({
            headers: {
                "Authorization": CommonStore.token
            }
        })
            .then(result => this.addQuestion(result))
            .catch(err => console.log(err))
            .finally(action(() => {this.isLoading = false;}))

    }

    @action nextPage() {
        this.inProgress = true;
        this.questions.map(question => (
            this.addNextPageURL(question.next)
        ));
        questionService.getQuestionsByURL(this.pageUrl, {
            headers: {
                "Authorization": CommonStore.token
            }
        })
            .then(result => this.addQuestion(result))
            .catch(err => console.log(err))
            .finally(action(() => {this.inProgress = false;}))
    };
}

const store = new QuestionStore();
export default store;