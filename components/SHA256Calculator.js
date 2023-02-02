import { useState } from "react";
import styles from "./SHA256Calculator.module.scss";
import { SHA256 } from "@/lib/hash";
import $ from "jquery";
import Image from "next/image";

export default function SHA256Calculator(props) {
  const [plaintext, setPlainText] = useState("");
  const [hashedValue, setHashedValue] = useState("");
  const [valueType, setValueType] = useState("text");

  const plaintextChangeHandler = (event) => {
    const enteredText = event.target.value;
    setPlainText(enteredText);
    hashGenerator(enteredText, valueType);
  };

  const hashGenerator = (input, valueType) => {
    if (valueType == "hex") {
      const hash = SHA256(input, true);
      setHashedValue(hash);
    } else {
      const hash = SHA256(input, false);
      setHashedValue(hash);
    }
  };

  const selectPickerChange = (event) => {
    const valueType = $(event.target).find("option:selected").val();
    setValueType(valueType);
    hashGenerator(plaintext, valueType);
  };

  return (
    <div className={styles.mainContainer}>
      <button onClick={props.exitScreenHandler} className={styles.exitButton}>
        <Image src="/img/back-arrow.png" height={30} width={30} />
      </button>
      <div className={styles.content}>
        <div className={styles.headerContainer}>
          <h1>SHA256 Calculator</h1>
        </div>
        <div className={styles.plainTextContainer}>
          <h1>Enter Input</h1>
          <div className={styles.selectContainer}>
            <label>Select Input Type</label>
            <select onChange={selectPickerChange} value={valueType}>
              <option value="text">Text</option>
              <option value="hex">Hex Value</option>
            </select>
          </div>
          <textarea onChange={plaintextChangeHandler} value={plaintext} />
        </div>
        <div className={styles.hashContainer}>
          <h1>SHA256 Output</h1>
          <textarea disabled value={hashedValue} />
        </div>

        <div className={styles.infoContainer}>
          <p>
            <b>Note:</b> In checking the hashes for the game, remember that they
            are in the form of SHA256(lowercase(clue + answer))
          </p>
          <p>
            <b>
              <u>Steps</u>
            </b>
          </p>
          <ul>
            <li>
              Find the hash you’re verifying by using the "text" selection in
              the input type
            </li>
            <li>Using the hex value, copy and change the input type to hex</li>
          </ul>
          <p>
            <b>
              <u>Example</u>
            </b>
          </p>
          <p>
            Question: "A string of bits that allows someone to encrypt or
            decrypt data"
          </p>
          <p>Answer: "What is a key?"</p>
          <ul>
            <li>
              The hash calculated in the game is SHA256(a string of bits that
              allows someone to encrypt or decrypt datawhat is a key?) =
              184b5...
            </li>
            <li>
              Switch the input type to hex and continuously hash the
              concatenation of the hash and the next proof to get to the root.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
