import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import QuestionService from '../../services/QuestionService';
import {Container, Header, Loader, Segment, Button, Icon, Grid, Image, Label, List} from 'semantic-ui-react'
import styles from './styles.module.scss';


@inject('QuestionStore')
@observer
class QuestionPage extends Component {

    handleNextPage = e => this.props.QuestionStore.nextPage();

    componentDidMount() {
        this.props.QuestionStore.loadQuestions();
    };

    render() {
        const {questions, isLoading, inProgress} = this.props.QuestionStore;
        return (
            isLoading ? <Loader active size='large'>Завантаження</Loader>: <div>
            <div >
                {questions.map(question => (
                    question.results.map(item => (
                        <div className={styles.box} >
                            <Container text loading key={item}>
                                <Segment >
                                    <Grid celled='internally' columns='equal'>
                                        <Grid.Row>
                                            <Grid.Column width={5} >
                                                <Image src={item.image}/>
                                                <div className={styles.tags}>
                                                    Теги:
                                                    {item.get_tags.map(
                                                        tag => (
                                                            <div className={styles.innerTags}>
                                                            <a href={tag} key={tag}>
                                                                <Label as='a' color='brown' image key={tag}>
                                                                    <img src='https://static.thenounproject.com/png/99472-200.png' />
                                                                    {tag}
                                                                </Label>
                                                            </a>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </Grid.Column>
                                            <Grid.Column width={10}>
                                                <List>
                                                    <List.Item>
                                                         <Image avatar src='https://react.semantic-ui.com/images/avatar/small/rachel.png' />
                                                         <List.Content>
                                                             <List.Header as='a' key={item.create_user}>{item.create_user}</List.Header>
                                                             <List.Description key={item.create_date}>
                                                                 {item.create_date}
                                                             </List.Description>
                                                         </List.Content>
                                                    </List.Item>
                                                </List>
                                                <Header as='h3' className={styles.headerTitle}>{item.title}</Header>
                                                <p className={styles.content} key={item.content}>{item.content}</p>
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row >
                                            <Grid.Column width={5}>
                                                <div className={styles.innerButton}>
                                                <Button as='div' labelPosition='left' size='mini'>
                                                        <Label as='a' basic color='red'>
                                                            2048
                                                        </Label>
                                                    <Button icon size='mini' color='red'>
                                                        <Icon name='like' />
                                                    </Button>
                                                </Button>
                                                </div>
                                                <div className={styles.innerButton}>
                                                <Button as='div' labelPosition='left' size='mini'>
                                                    <Label as='a' basic color='blue' >
                                                        2048
                                                    </Label>
                                                    <Button icon size='mini' color='blue'>
                                                        <Icon name='comment' />
                                                    </Button>
                                                </Button>
                                                </div>
                                                <div className={styles.innerButton}>
                                                    <Button size='mini' color='green' content='green'>Перейти до питання</Button>
                                                </div>
                                            </Grid.Column>
                                            <Grid.Column width={10}>
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                </Segment>
                                </Container>
                        </div>
                    ))
                ))
                }
            </div>
                <Segment textAlign='center'>
                <Button loading={inProgress} color='olive' onClick={this.handleNextPage}>Завантажити наступні питання...</Button>
                </Segment>
            </div>
        );
    }
}
export default QuestionPage;