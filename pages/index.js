import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import $ from "jquery";

export async function getServerSideProps(context) {
  // load questions on server
  const result = "please work";
  return {
    props: {
      data: result,
    },
  };
}

export default function Home(props) {
  const volumeOnPath = "/img/volume-up.png";
  const volumeOffPath = "/img/volume-off.png";
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [musicIcon, setMusicIcon] = useState(volumeOffPath);

  function playTheMusic() {
    //const audioElement = $("#theme-music-player");
    if (!musicPlaying) {
      $("#theme-music-player")[0].play();
      setMusicPlaying(true);
      setMusicIcon(volumeOnPath);
    } else {
      $("#theme-music-player")[0].pause();
      //audioElement[0].pause();
      setMusicPlaying(false);
      setMusicIcon(volumeOffPath);
    }
  }

  return (
    <>
      <Head>
        <title>Crypto Jeopardy</title>
        <meta
          name="description"
          content="Welcome to the next-generation jeopardy with cryptographic matriasl."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {/* <ReactAudioPlayer
          id="theme-music-player"
          src="audio/jeopardy-theme-song.mp3"
          loop={true}
        /> */}
        <audio controls src="/audio/jeopardy-theme-song.mp3">
          Your browser does not support the
          <code>audio</code> element.
        </audio>

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
          </div>
        </div>
      </main>
    </>
  );
}
