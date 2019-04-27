import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import {Container, Header, Loader, Segment, Button, Icon, Grid, Image, Label, List, Message} from 'semantic-ui-react'
import styles from './styles.module.scss';

@inject('QuestionStore')
@observer
class Question extends Component {
    handleUUID = e => this.props.QuestionStore.setQuestionUUID(e.questionUUID)
}