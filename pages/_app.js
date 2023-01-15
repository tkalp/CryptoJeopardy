import "@/styles/globals.css";
import GameProvider from "@/lib/game-context";
export default function App({ Component, pageProps }) {
  return (
    <GameProvider>
      <Component {...pageProps} />;
    </GameProvider>
  );
}
