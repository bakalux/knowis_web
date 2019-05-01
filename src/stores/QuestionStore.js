import {observable, action, computed} from "mobx";
import QuestionService from '../services/QuestionService'
import CommonStore from './CommonStore'

const questionService = new QuestionService();

class QuestionStore {
    @observable questions = [];
    @observable nextPageURL = '';
    @observable questionSlug= '';
    @observable question;
    @observable isLoading = false;
    @observable inProgress = false;
    @observable questionRegistry = observable.map();

    @action addQuestion = (question) => {
        this.questions.push(question);
    };

    @action setQuestionSlug = (questionSlug) => {
        this.questionSlug = questionSlug
    };

    @computed get questionCount() {
        return this.questions.length;
    };

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

    @action loadQuestionBySlug() {
        this.inProgress = true;
        questionService.getQuestionBySlug({
            headers: {
                "Authorization": 'JWT ' + CommonStore.token
            }
        }, this.questionSlug)
            .then(result => this.question = result)
            .catch(err => console.log('Error: ', err))
            .finally(action(()=> { this.inProgress = false;}))
    }
}

const store = new QuestionStore();
export default store;