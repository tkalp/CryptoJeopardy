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
  const [showAnswer, setShowAnswer] = useState(false);

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

      const startButton = $(target).find(".timer-start-button");
      $(startButton).click();
      // Show the Clue Container
      $(target)
        .find("." + styles.clueContainer)
        .css("display", "flex")
        .hide()
        .fadeIn();

      // Show the form container for the clue answer
      $(target)
        .find("." + styles.formContainer)
        .css("display", "flex")
        .hide()
        .fadeIn();
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

    // Show the answe with its hash
    setShowAnswer(true);
    await sleep(5000);
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

    // Clue Container
    $(target)
      .find("." + styles.clueContainer)
      .hide();

    // Form Container
    $(target)
      .find("." + styles.formContainer)
      .hide();
    $(target).find(".timer-container").hide();

    // Then we revert the box to it's original settings
    setShowAnswer(false);
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
          {!showAnswer && (
            <div className={styles.submitWrapper}>
              <button>Submit</button>
            </div>
          )}
        </form>
      </div>
      {showAnswer && (
        <div className={styles.answerContainer}>
          <p>Answer is "{answer}"</p>
          <p>SHA256(Clue + Answer) = {SHA256(question + answer)}</p>
        </div>
      )}
    </div>
  );
}
