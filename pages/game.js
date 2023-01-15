import CategoryColumn from "@/components/CategoryColumn";
import styles from "@/styles/Game.module.scss";
import { useContext, useState, useEffect } from "react";
import { getCategoriesAndQuestions } from "../lib/getJeopardyData";
import { ACTION_TYPES, GameContext } from "@/lib/game-context";

async function sleep(ms) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getServerSideProps(context) {
  // load questions on server
  const result = getCategoriesAndQuestions();
  return {
    props: {
      categories: result,
    }, // will be passed to the page component as props
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
    <>
      {state.totalQuestions > 0 && (
        <main className={styles.main}>
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
            <h1>Questions Left: {state.totalQuestions}</h1>
          </div>
        </main>
      )}
      {state.totalQuestions == 0 && <div>No Questions Left</div>}
    </>
  );
}
