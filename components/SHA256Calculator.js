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
          <ul>
            <li>
              <b>Note:</b> If you are checking the hashes for the game, remember
              that it is in the form of SHA256(lower_case(clue + answer))
            </li>
            <li>
              First find the hash of the data you are checking by using the
              "text" selection in the input type
            </li>
            <li>
              Once you have the hex value, copy it and change the input type to
              hex
            </li>
            <li>Do not include the `0x` when you are computing these hashes</li>
            <li>
              Example, let the clue be "A string of bits that allows someone to
              encrypt or decrypt data"
            </li>
            <li>Let the answer be "What is a key?"</li>
            <li>
              The hash calculated in the game is SHA256(a string of bits that
              allows someone to encrypt or decrypt datawhat is a key?) =
              184b5...
            </li>
            <li>
              Then switch the input type to hex and continously hash the
              concatenattion of the hash and the next proof to get to the root.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
