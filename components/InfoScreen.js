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
          <Image src="/img/exit.png" height={30} width={30} />
        </button>
      </div>
      <div className={styles.informationHeader}>
        <h1>Welcome to Crypto Jeopardy!</h1>
        <h3>How to Play</h3>
      </div>
      <ol className={styles.informationRules}>
        <li>
          The game board is split into 25 questions across 5 randomly selected
          categories.
        </li>
        <li>
          Once a clue is a selected, the player will have 15 seconds to answer
          the question.
        </li>
        <li>Answers must end in a '?' to signify a question.</li>
        <li>
          If the player does not answer within the timeframe, the answer will be
          marked as incorrect.
        </li>
        <li>
          Correct Answers will add the clue's selected score to the user's
          score.
        </li>
        <li>Incorrect Answeres will deduct points from the player's score.</li>
        <li>
          Answers are validated using Merkle Trees so you must be precise!
        </li>
        <li>Watch out for Daily Doubles, they're worth double!</li>
        <li>Good Luck and Have Fun!</li>
      </ol>
    </div>
  );
}
