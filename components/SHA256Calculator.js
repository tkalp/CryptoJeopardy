import { useState } from "react";
import styles from "./SHA256Calculator.module.scss";
import { SHA256 } from "@/lib/hash";

export default function SHA256Calculator(props) {
  const [plaintext, setPlainText] = useState("");
  const [hashedValue, setHashedValue] = useState("");

  const plaintextChangeHandler = (event) => {
    const enteredText = event.target.value;
    setPlainText(enteredText);
    const hash = SHA256(enteredText);
    setHashedValue(hash);
  };

  return (
    <div className={styles.mainContainer}>
      <button onClick={props.exitScreenHandler}>Exit</button>
      <div className={styles.content}>
        <div className={styles.headerContainer}>
          <h1>SHA256 Calculator</h1>
        </div>
        <div className={styles.plainTextContainer}>
          <h1>Enter Plaintext</h1>
          <textarea onChange={plaintextChangeHandler} value={plaintext} />
        </div>
        <div className={styles.hashContainer}>
          <h1>SHA256 Output</h1>
          <textarea disabled value={hashedValue} />
        </div>
        <div className={styles.infoContainer}>
          <p>
            <b>Note:</b> If you are checking the hashes for the game, remember
            that it is in the form of SHA256(lower_case(clue + answer))
          </p>
          <p>
            Example, let the clue be "A string of bits that allows someone to
            encrypt or decrypt data"
          </p>
          <p>Let the answer be "What is a key?"</p>
          <p>
            The hash calculated in the game is SHA256(a string of bits that
            allows someone to encrypt or decrypt datawhat is a key?)
          </p>
        </div>
      </div>
    </div>
  );
}
