import { useState, useContext } from "react";
import styles from "./Clue.module.scss";
import $ from "jquery";
import { ACTION_TYPES, GameContext } from "@/lib/game-context";
import { sleep } from "@/lib/utils";
import { SHA256 } from "@/lib/hash";
import Timer from "./Timer";

const classNames = require("classnames");

export default function Clue(props) {
  const { dispatch, state } = useContext(GameContext);
  const { value, question, answer, categoryId, questionId, dailyDouble } =
    props;

  const componentId = categoryId + "" + questionId;
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [enteredAnswer, setEnteredAnswer] = useState("");

  function timerExpireHandler() {
    questionSubmitHandler();
  }

  async function changeToFullScreen(event) {
    if (!isFullScreen) {
      setIsFullScreen(true);
      let target = event.target;
      // dont work with the h1
      if ($(target).is("h1")) {
        target = $(event.target).closest(".main-value-box");
      }
      $(target).toggleClass(styles.fullScreen);

      //If this question is a Daily Double
      if (dailyDouble) {
        $(target).find("#value").addClass(styles.dailyDouble);
        $(target)
          .find("#value")
          .html("<span>Daily</span> <br/> <span>Double</span>");
        $("#daily-double-sound")[0].play();
      } else {
        $("#clue-select-sound")[0].play();
      }
      // 1. Pause for 1s
      await sleep(2000);
      // 2. Hide the dollar value
      $(target).find("#value").fadeOut();
      // 3. Show the question + input
      await sleep(600);
      $(target).find(".timer-container").fadeIn();
      const test = $(target).find(styles.clueContainer);

      $(target)
        .find("." + styles.clueContainer)
        .css("display", "flex")
        .hide()
        .fadeIn();
      $(target)
        .find("." + styles.formContainer)
        .css("display", "flex")
        .hide()
        .fadeIn();
      // $(`#box-question_${componentId}`).fadeIn();
      // $(`#answer-form_${componentId}`).fadeIn();

      //const timerBtn = $(target).find(".timer-start-button")[0];
      //$(timerBtn).click();
    }
  }

  function handleAnswerInputChange(event) {
    setEnteredAnswer(event.target.value);
  }

  async function questionSubmitHandler(event) {
    if (event != null) {
      event.preventDefault();
    }
    // This is the only thing with full screen
    const target = $("." + styles.fullScreen);
    // Stop the timer
    const stopButton = $(target).find(".timer-stop-button")[0];
    console.log(stopButton);
    $(stopButton).click();

    const answerInput = $(`#answer-form_${componentId}`).find("input")[0];
    // If we add in a function to check merkle tree, it should be here
    const { merkleTree } = state;
    const root = merkleTree.getRoot().toString("hex");
    const leaf = SHA256((question + enteredAnswer).toLowerCase());
    const proof = merkleTree.getProof(leaf);
    const correctAnswer = merkleTree.verify(proof, leaf, root);

    // const correctAnswer = enteredAnswer.toLowerCase() == answer.toLowerCase();
    if (correctAnswer) {
      $("#correct-answer-sound")[0].play();
      $(answerInput).addClass(styles.correctAnswer);
      $(answerInput).removeClass(styles.wrongAnswer);
    } else {
      $("#wrong-answer-sound")[0].play();
      $(answerInput).addClass(styles.wrongAnswer);
      $(answerInput).addClass(styles.correctAnswer);
    }

    await sleep(1500);
    // Calculate the score required to add or subtract
    const addedScore = dailyDouble ? value * 2 : value;

    //Update the Score
    dispatch({
      type: ACTION_TYPES.SET_SCORE,
      payload: {
        addedScore: correctAnswer ? addedScore : -1 * addedScore,
      },
    });

    //Subtract 1 from questions
    dispatch({
      type: ACTION_TYPES.SUBTRACT_QUESTION_COUNT,
    });

    // Hide the question, input, and timer

    $(`#box-question_${componentId}`).hide();
    $(`#answer-form_${componentId}`).hide();
    $(target).find(".timer-container").hide();

    // Then we revert the box to it's original settings
    $(target).toggleClass(styles.fullScreen);
  }

  return (
    <div
      onClick={changeToFullScreen}
      className={classNames("main-value-box", styles.valueBox)}
    >
      {/* {dailyDouble && <p>Daily Double</p>} */}
      <Timer secondsParam={15} timerExpireHandler={timerExpireHandler} />
      <div>
        <h1 id="value">{"$" + props.value}</h1>
      </div>
      <div className={styles.clueContainer}>
        <p className={styles.clue} id={`box-question_${componentId}`}>
          {question}
        </p>
      </div>
      <div className={styles.formContainer}>
        <form
          className={styles.answerForm}
          id={`answer-form_${componentId}`}
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
      </div>
    </div>
  );
}