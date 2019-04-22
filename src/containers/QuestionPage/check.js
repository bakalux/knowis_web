import styles from "./styles.module.scss";
import {Button, Container, Header, Label, Segment} from "semantic-ui-react";
import React from "react";

render() {
        const {QuestionStore} = this.props;
        return (
            <div>
                {QuestionStore.questions.map(question => (
                    question.results.map(item => (
                        <div className={styles.box} vertical>
                            <Container text>
                                <Segment>
                                <Header as='h3' className={styles.headerTitle}>{item.title}</Header>
                                <p className={styles.content}>{item.content}</p>
                                <Button as='a' color='yellow' size='mini'>Перейти до питання</Button>
                                <div className={styles.tags}>{item.get_tags.map(
                                    tag => (
                                        <a href={tag}>
                                            <Label as='a' color='brown' image>

                                            </Label>

                                        </a>
                                    )
                                )}</div>
                                </Segment>
                                </Container>
                        </div>
                    ))
                ))
                }
                <Segment textAlign='center'>
                <Button color='olive' onClick={this.nextPage}>Завантажити наступні 10 питань...</Button>
                </Segment>
            </div>
        );
    }