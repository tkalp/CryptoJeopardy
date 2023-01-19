import styles from "./Timer.module.scss";
const classNames = require("classnames");
import { useState, useEffect } from "react";
import { useTimer } from "react-timer-hook";
import Image from "next/image";

export default function Timer(props) {
  const { secondsParam, timerExpireHandler } = props;
  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + secondsParam);

  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp,
    autoStart: false,
    onExpire: timerExpireHandler,
  });

  return (
    <div className={classNames(styles.timerContainer, "timer-container")}>
      <div className={styles.timerContent}>
        <Image src="/img/clock.png" width={50} height={50} />
        <p>{seconds}</p>
      </div>

      <button
        onClick={start}
        className={classNames("timer-start-button", styles.timerStartButton)}
      />
    </div>
  );

  {
    /* <p>react-timer-hook </set propertyName(value) {
        ;
      }>
      <p>Timer Demo</p>
      <div style={{ fontSize: "100px" }}>
        <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:
        <span>{seconds}</span>
      </div>
      <p>{isRunning ? "Running" : "Not running"}</p>
      <button onClick={start}>Start</button>
      <button onClick={pause}>Pause</button>
      <button onClick={resume}>Resume</button>
      <button
        onClick={() => {
          // Restarts to 5 minutes timer
          const time = new Date();
          time.setSeconds(time.getSeconds() + 300);
          restart(time);
        }}
      >
        Restart
      </button> */
  }
}
