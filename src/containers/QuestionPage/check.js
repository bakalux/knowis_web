import styles from "./styles.module.scss";
import {Button, Container, Header, Label, Segment} from "semantic-ui-react";
import React from "react";

<div>
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
                                                <img src='https://static.thenounproject.com/png/99472-200.png' />
                                                {tag}
                                            </Label>
                                            <span>&nbsp;</span>
                                        </a>
                                    )
                                )}</div>
                                </Segment>
                                </Container>
                        </div>
                    ))
                ))
                }
            </div>
                <Button onClick={this.nextPage}>Ще</Button>
            </div>