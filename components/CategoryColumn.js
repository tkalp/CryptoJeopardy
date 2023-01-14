import styles from "./CategoryColumn.module.css";
import $ from "jquery";

export default function CategoryColumn() {
  function changeToFullScreen(event) {
    const target = event.target;
    //const { top, left } = target.getBoundingClientRect();
    console.log($(target).css("position"));
    $(target).css({
      position: "fixed",
      top: `0px`,
      left: `0px`,
      width: "100%",
      height: "100%",
      background: "#050a8f",
      "z-index": "9999",
    });
  }
  return (
    <div className={styles.category}>
      <div className={styles.categoryTitleWrapper}>
        <h1>Public Key Crypto</h1>
      </div>
      <div onClick={changeToFullScreen} className={styles.valueBox}>
        <h1>$200</h1>
      </div>
      <div onClick={changeToFullScreen} className={styles.valueBox}>
        <h1>$400</h1>
      </div>
      <div onClick={changeToFullScreen} className={styles.valueBox}>
        <h1>$600</h1>
      </div>
      <div onClick={changeToFullScreen} className={styles.valueBox}>
        <h1>$800</h1>
      </div>
      <div onClick={changeToFullScreen} className={styles.valueBox}>
        <h1>$1000</h1>
      </div>
    </div>
  );
}
