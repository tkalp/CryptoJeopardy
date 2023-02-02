import "@/styles/globals.css";
import GameProvider from "@/lib/game-context";
import styles from "../styles/fonts.css";

export default function App({ Component, pageProps }) {
  return (
    <GameProvider>
      <Component {...pageProps} />
    </GameProvider>
  );
}
