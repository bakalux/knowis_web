import {observable, action, computed} from "mobx";

class QuestionStore {
    @observable questions = [];
    @observable nextPageURL = [];
    @observable isLoading;

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
}

const store = new QuestionStore();
export default store;