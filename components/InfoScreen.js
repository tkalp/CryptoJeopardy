import styles from "./InfoScreen.module.scss";
import Image from "next/image";

export default function InfoScreen(props) {
  return (
    <div className={styles.informationContainer}>
      <div>
        <button
          className={styles.informationExitButton}
          onClick={props.exitInformationHandler}
        >
          <Image src="/img/back-arrow.png" height={30} width={30} />
        </button>
      </div>
      <div className={styles.informationHeader}>
        <h1>Welcome to Crypto Jeopardy!</h1>
        <h3>How to Play</h3>
      </div>
      <ol className={styles.informationRules}>
        <li>Get ready to test your knowledge and show off your smarts!</li>
        <li>
          Players will be presented with questions in the form of answers.
        </li>
        <li>Correct answers must be in the form of a question.</li>
        <li>
          Each clue is worth a certain amount of points, with values increasing
          based on complexity.
        </li>
        <li>
          Players can choose to play it safe and go for the lower dollar clues,
          or take a risk and go for the big points!
        </li>
        <li>
          Watch out for the Daily Doubles as those questions are worth twice the
          amount!
        </li>
        <li>
          Keep in mind that for wrong answers, there will be a deduction of the
          value chosen (including Daily Doubles).
        </li>
        <li>And most importantly, have fun!</li>
      </ol>
    </div>
  );
}
