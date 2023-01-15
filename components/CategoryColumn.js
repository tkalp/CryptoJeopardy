import styles from "./CategoryColumn.module.scss";
import $ from "jquery";
import Box from "./Box";

export default function CategoryColumn(props) {
  const { id, category } = props;
  return (
    <div className={styles.category}>
      <div className={styles.categoryTitleWrapper}>
        <h1>{category}</h1>
      </div>
      <Box
        value="200"
        question="The practice of cracking crypto algorithms"
        answer="What is Crypto"
        categoryId={id}
        questionId={1}
      />
      <Box value="400" />
      <Box value="600" />
      <Box value="800" />
      <Box value="1000" />
    </div>
  );
}
