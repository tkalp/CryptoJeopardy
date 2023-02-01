import styles from "./CategoryColumn.module.scss";
import $ from "jquery";
import Clue from "./Clue";

/**
 * @description Renders the columns for the jeopardy game
 * @param {JSON} props
 */
export default function CategoryColumn(props) {
  const { id, category, questions, setShownMerkleNodes, setShowTreeHandler } =
    props;
  return (
    <div className={styles.category}>
      <div className={styles.categoryTitleWrapper}>
        <h1>{category}</h1>
      </div>
      {questions.map((question, index) => {
        let value = Math.random();

        return (
          <Clue
            value={question.Value}
            question={question.Question}
            source={question.Source}
            answer={question.Answer}
            categoryId={id}
            questionId={index}
            dailyDouble={value > 0.9}
            key={index}
            setShownMerkleNodes={setShownMerkleNodes}
            setShowTreeHandler={setShowTreeHandler}
          />
        );
      })}
    </div>
  );
}
