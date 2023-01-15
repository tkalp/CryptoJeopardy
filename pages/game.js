import CategoryColumn from "@/components/CategoryColumn";
import styles from "@/styles/Game.module.scss";
import { useState } from "react";
import { getCategoriesAndQuestions } from "../lib/getJeopardyData";

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
  const [score, setScore] = useState(0);
  const { categories } = props;

  const updateScoreHandler = (addedScore) => {
    setScore(score + addedScore);
  };

  return (
    <>
      <main className={styles.main}>
        <div className={styles.columnsWrapper}>
          {categories.map((category) => {
            return (
              <CategoryColumn
                category={category.Name}
                id={category.ID}
                questions={category.Questions}
                updateScore={updateScoreHandler}
              />
            );
          })}
        </div>
        <div className={styles.scoreWrapper}>
          <h1>Score: {score}</h1>
        </div>
      </main>
    </>
  );
}
