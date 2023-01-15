import CategoryColumn from "@/components/CategoryColumn";
import styles from "@/styles/Game.module.css";
import { getCategories } from "../lib/getCategories";

async function sleep(ms) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getServerSideProps(context) {
  // load questions on server
  const result = getCategories();
  return {
    props: {
      categories: result,
    }, // will be passed to the page component as props
  };
}

export default function Game(props) {
  const { categories } = props;
  console.log(categories);
  return (
    <>
      <main className={styles.main}>
        {categories.map((category) => {
          return (
            <CategoryColumn
              category={category.Name}
              id={category.ID}
              questions={category.Questions}
            />
          );
        })}
      </main>
    </>
  );
}
