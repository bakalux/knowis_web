import {observable, action, computed} from "mobx";

class QuestionStore {
    @observable questions = [];
    @action addQuestion = (question) => {
        this.questions.push(question);
    };

    @computed get questionCount() {
        return this.questions.length;
    }
}

const store = new QuestionStore();
export default store;