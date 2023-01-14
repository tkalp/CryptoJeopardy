import CategoryColumn from "@/components/CategoryColumn";
import styles from "@/styles/Game.module.css";
import $ from "jquery";

async function sleep(ms) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

export default function Game() {
  return (
    <>
      <main className={styles.main}>
        <CategoryColumn />
      </main>
    </>
  );
}
