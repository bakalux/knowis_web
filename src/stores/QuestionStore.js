import {observable, action, computed, toJS} from "mobx";
import QuestionService from '../services/QuestionService'
import CommonStore from './CommonStore'
import AnswerStore from './AnswerStore'
import { EditorState} from 'draft-js';


const questionService = new QuestionService();

class QuestionStore {
  @observable questions = [];
  @observable tags = [];
  @observable errors = undefined;
  @observable nextPageURL;
  @observable questionUUID = '';
  @observable question = '';
  @observable status='P';
  @observable questionTitle = '';
  @observable questionContent = '';
  @observable isLoading = false;
  @observable inProgress = false;
  @observable isCreatingQuestion = false;
  @observable createQuestion = false;
  @observable headerActiveItem;
  @observable values = {
    titleInput: EditorState.createEmpty(),
    contentInput: EditorState.createEmpty(),
  };

  @action addTags(tags) {
    this.tags = tags
  }

  @action emptyOnCreate() {
    this.values.contentInput = EditorState.createEmpty()
  };

  @action setHeaderActiveItem(item) {
    this.headerActiveItem = item
  };

  @action setTitle(title) {
    this.values.titleInput = title
  };

  @action setContent(content) {
    this.values.contentInput = content
  }

  @action showModal = () => {
    this.createQuestion = !this.createQuestion;
    this.emptyOnCreate();
  };

  @action addQuestion = (question) => {
    this.questions.push(question);
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

  @action clearQuestion = () => {
    this.questions = []
  };

  @action clearEditor = () => {
    this.values.titleInput = EditorState.createEmpty();
    this.values.contentInput = EditorState.createEmpty();
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

  @action loadQuestionBySlug(slug) {
    this.inProgress = true;
    return questionService.getQuestionBySlug({
      headers: {
        "Authorization": 'JWT ' + CommonStore.token
      }
    }, slug)
      .then(result => {
        this.setQuestion(result);
        this.setQuestionUUID(result.uuid);
      })
      .then(
        action(() => {
          AnswerStore.loadAnswersByUUID();
        }))
      .catch(err => {
        this.errors = err.response && err.response.body
          && err.response.body.errors;
        throw err;
      })
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
    )
      .then(() => {
        this.clearQuestion();
        this.loadQuestions();
        this.clearEditor();
      })
      .catch(err=> {
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