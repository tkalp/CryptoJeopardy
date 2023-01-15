import CategoryColumn from "@/components/CategoryColumn";
import styles from "@/styles/Game.module.css";

async function sleep(ms) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

export default function Game() {
  return (
    <>
      <main className={styles.main}>
        <CategoryColumn category="Symmetric Key Encryption" id={1} />
        <CategoryColumn category="Blockchain" id={2} />
        <CategoryColumn category="Transport Layer Security" id={3} />
        <CategoryColumn category="Discrete Logarithms" id={4} />
        <CategoryColumn category="Diffie-Hellman" id={5} />
      </main>
    </>
  );
}
