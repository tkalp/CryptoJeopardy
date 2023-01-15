import styles from "./CategoryColumn.module.scss";
import $ from "jquery";
import Box from "./Box";

export default function CategoryColumn(props) {
  const { id, category, questions, updateScore } = props;
  return (
    <div className={styles.category}>
      <div className={styles.categoryTitleWrapper}>
        <h1>{category}</h1>
      </div>
      {questions.map((question, index) => {
        return (
          <Box
            value={question.Value}
            question={question.Question}
            answer={question.Answer}
            categoryId={id}
            questionId={index}
            updateScore={updateScore}
          />
        );
      })}
    </div>
  );
}
