import CategoryColumn from "@/components/CategoryColumn";
import styles from "@/styles/Game.module.scss";
import { useContext, useState, useEffect } from "react";
import { getCategoriesAndQuestions } from "../lib/getJeopardyData";
import { ACTION_TYPES, GameContext } from "@/lib/game-context";
import ReactAudioPlayer from "react-audio-player";

export async function getServerSideProps(context) {
  // load questions on server
  const result = getCategoriesAndQuestions();
  return {
    props: {
      categories: result,
    },
  };
}

export default function Game(props) {
  const { dispatch, state } = useContext(GameContext);
  const score = state.score;
  const { categories } = props;

  const totalQuestions = categories.reduce((acc, category) => {
    return acc + category.Questions.length;
  }, 0);

  useEffect(() => {
    dispatch({
      type: ACTION_TYPES.SET_QUESTION_COUNT,
      payload: {
        totalQuestions,
      },
    });
  }, [totalQuestions]);

  return (
    <div className={styles.fullWrapper}>
      {state.totalQuestions > 0 && (
        <main className={styles.main}>
          <ReactAudioPlayer
            id="correct-answer-sound"
            src="audio/jeopardy-correct-answer.mp3"
          />
          <ReactAudioPlayer
            id="wrong-answer-sound"
            src="audio/jeopardy-wrong-answer.mp3"
          />
          <ReactAudioPlayer
            id="daily-double-sound"
            src="audio/jeopardy-daily-double.mp3"
          />
          <div className={styles.columnsWrapper}>
            {categories.map((category, index) => {
              return (
                <CategoryColumn
                  category={category.Name}
                  id={category.ID}
                  questions={category.Questions}
                  key={index}
                />
              );
            })}
          </div>
          <div className={styles.scoreWrapper}>
            <h1>Score: {score}</h1>
            <br />
            <h1 className={styles.questionCounter}>
              Questions Left: {state.totalQuestions}
            </h1>
          </div>
        </main>
      )}
      {/* We need to develop an end game screen or continue to next round */}
      {state.totalQuestions == 0 && <div>No Questions Left</div>}
    </div>
  );
}
