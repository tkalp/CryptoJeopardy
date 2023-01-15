import { useState } from "react";
import styles from "./Box.module.scss";
import $ from "jquery";
const classNames = require("classnames");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default function Box(props) {
  const { value, question, answer, categoryId, questionId, updateScore } =
    props;
  const identifier = categoryId + "" + questionId;
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [enteredAnswer, setEnteredAnswer] = useState("");

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

  function handleInputChange(event) {
    setEnteredAnswer(event.target.value);
  }

  function buttonHandler(event) {
    event.preventDefault();
    if (enteredAnswer.toLowerCase() == answer.toLowerCase()) {
      console.log("Correct");
      updateScore(value);
    } else {
      console.log("incorrect");
      updateScore(-1 * value);
    }

    $(`#box-question_${identifier}`).hide();
    $(`#answer-form_${identifier}`).hide();
    const target = $(event.target).closest(".main-value-box");
    // revert the box
    $(target).toggleClass(styles.fullScreen);
    /// We then have to revert, calculate the points, etc...
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
      <form className={styles.answerForm} id={`answer-form_${identifier}`}>
        <div className={styles.answerInputWrapper}>
          <input
            name="answer"
            className={styles.answerInput}
            value={enteredAnswer}
            onChange={handleInputChange}
          ></input>
        </div>
        <div className={styles.submitWrapper} onClick={buttonHandler}>
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
}
