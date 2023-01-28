import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import $ from "jquery";

// import { Inter } from "@next/font/google";
// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const volumeOnPath = "/img/volume-up.png";
  const volumeOffPath = "/img/volume-off.png";
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [musicIcon, setMusicIcon] = useState(volumeOffPath);

  function playTheMusic() {
    const audioElement = $("#theme-music-player");
    if (!musicPlaying) {
      audioElement[0].play();
      setMusicPlaying(true);
      setMusicIcon(volumeOnPath);
    } else {
      console.log(audioElement);
      audioElement[0].pause();
      setMusicPlaying(false);
      setMusicIcon(volumeOffPath);
    }
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {/* <ReactAudioPlayer
          id="theme-music-player"
          src="audio/jeopardy-theme-song.mp3"
        /> */}
        <ReactAudioPlayer
          id="theme-music-player"
          src="audio/jeopardy-select-clue.mp3"
        />
        <div className={styles.contentWrapper}>
          <button onClick={playTheMusic} className={styles.themeSongButton}>
            <Image src={musicIcon} width={35} height={35} />
          </button>
          <h1 className={styles.smallerTitle}>Crypto</h1>
          <h1 className={styles.title}>Jeopardy!</h1>
          <div className={styles.buttonsWrapper}>
            <Link href="/game">
              <button className={styles.button}>Start Game</button>
            </Link>
            {/* <button className={styles.button}>High Scores</button> */}
          </div>
        </div>
      </main>
    </>
  );
}
