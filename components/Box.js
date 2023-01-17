import { useState, useContext } from "react";
import styles from "./Box.module.scss";
import $ from "jquery";
import { ACTION_TYPES, GameContext } from "@/lib/game-context";
import { sleep } from "@/lib/utils";
import ReactAudioPlayer from "react-audio-player";

const classNames = require("classnames");

export default function Box(props) {
  const { dispatch, state } = useContext(GameContext);
  const { value, question, answer, categoryId, questionId } = props;
  const identifier = categoryId + "" + questionId;
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [enteredAnswer, setEnteredAnswer] = useState("");
  //const [answerStatus, setAnswerStatus] = useState("");

  async function changeToFullScreen(event) {
    if (!isFullScreen) {
      setIsFullScreen(true);
      let target = event.target;
      // dont work with the h1
      if ($(target).is("h1")) {
        target = $(event.target).closest("div");
      }
      $(target).toggleClass(styles.fullScreen);
      // 1. Pause for 1s
      await sleep(1000);
      // 2. Hide the dollar value
      $(target).find("#value").fadeOut();
      // 3. Show the question + input
      await sleep(600);
      $(`#box-question_${identifier}`).fadeIn();
      $(`#answer-form_${identifier}`).fadeIn();
    }
  }

  function handleAnswerInputChange(event) {
    setEnteredAnswer(event.target.value);
  }

  async function questionSubmitHandler(event) {
    event.preventDefault();
    const correctAnswer = enteredAnswer.toLowerCase() == answer.toLowerCase();

    await sleep(1000);
    // Update the Score
    dispatch({
      type: ACTION_TYPES.SET_SCORE,
      payload: {
        addedScore: correctAnswer ? value : -1 * value,
      },
    });

    // Subtract 1 from questions
    dispatch({
      type: ACTION_TYPES.SUBTRACT_QUESTION_COUNT,
    });

    // Hide the question and input
    $(`#box-question_${identifier}`).hide();
    $(`#answer-form_${identifier}`).hide();

    // Then we revert the box to it's original settings
    const target = $(event.target).closest(".main-value-box");
    $(target).toggleClass(styles.fullScreen);
  }

  return (
    <div
      onClick={changeToFullScreen}
      className={classNames("main-value-box", styles.valueBox)}
    >
      <h1 id="value">{"$" + props.value}</h1>
      <p className={styles.boxQuestion} id={`box-question_${identifier}`}>
        {question}
      </p>
      <form
        className={styles.answerForm}
        id={`answer-form_${identifier}`}
        onSubmit={questionSubmitHandler}
      >
        <div className={styles.answerInputWrapper}>
          <input
            name="answer"
            className={styles.answerInput}
            value={enteredAnswer}
            onChange={handleAnswerInputChange}
          ></input>
        </div>
        <div className={styles.submitWrapper}>
          <button>Submit</button>
        </div>
      </form>
      <div
        className={styles.answerStatusWrapper}
        id={`answer-status-wrapper_${identifier}`}
      >
        <p>{}</p>
      </div>
    </div>
  );
}
