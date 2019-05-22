import {observable, action, computed, toJS} from "mobx";
import QuestionService from '../services/QuestionService'
import CommonStore from './CommonStore'
import AnswerStore from './AnswerStore'
import { EditorState} from 'draft-js';


const questionService = new QuestionService();

class QuestionStore {
  @observable questions = [];
  @observable nextPageURL = '';
  @observable questionSlug = '';
  @observable questionUUID = '';
  @observable question = '';
  @observable status='P';
  @observable questionTitle = '';
  @observable questionContent = '';
  @observable isLoading = false;
  @observable inProgress = false;
  @observable isCreatingQuestion = false;
  @observable createQuestion = false;
  @observable values = {
    title: EditorState.createEmpty(),
    content: EditorState.createEmpty(),
  };

  @action setTitle(title) {
    this.values.title = title
  };

  @action setContent(content) {
    this.values.content = content
  }

  @action showModal = () => {
    this.createQuestion = !this.createQuestion
  };

  @action addQuestion = (question) => {
    this.questions.push(question);
  };

  @action setQuestionSlug = (slug) => {
    this.questionSlug = slug
  };

  @action setNextPageUrl = (url) => {
    this.nextPageURL = url
  };

  @action setQuestionUUID = (uuid) => {
    this.questionUUID = uuid
  };

  @action setQuestion = (question) => {
    this.question = question
  };

  @action setQuestionTitle = (title) => {
    this.questionTitle = title
  };

  @action setQuestionContent = (content) =>{
    this.questionContent = content
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
      .finally(action(() => {
        this.isLoading = false;
      }))

  }

  @action nextPage() {
    this.inProgress = true;
    this.questions.map(question => this.setNextPageUrl(question.next));
    return questionService.getQuestionsByURL(this.nextPageURL, {
        headers: {
        "Authorization": 'JWT ' + CommonStore.token
      }
    })
      .then(result => this.addQuestion(result))
      .catch(err => console.log(err))
      .finally(action(() => {
        this.inProgress = false;
      }))
  };

  @action loadQuestionBySlug() {
    this.inProgress = true;
    return questionService.getQuestionBySlug({
      headers: {
        "Authorization": 'JWT ' + CommonStore.token
      }
    }, this.questionSlug)
      .then(result => {
        this.setQuestion(result);
        this.setQuestionUUID(result.uuid);
      })
      .then(
        action(() => {
          AnswerStore.loadAnswersByUUID();
        }))
      .catch(err => console.log('Error: ', err))
      .finally(
        action(() => {
          this.inProgress = false;
        }))
  };

  @action postQuestion(title, content) {
    this.isCreatingQuestion = true;
    return questionService.postQuestion(
      {
        "Authorization": 'JWT ' + CommonStore.token
      }, {
        title: title,
        content: content,
        status: this.status
      }
    ).catch(err=> {
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers)
        }
      })
  }

}

const store = new QuestionStore();
export default store;