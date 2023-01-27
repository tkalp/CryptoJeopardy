import CategoryColumn from "@/components/CategoryColumn";
import styles from "@/styles/Game.module.scss";
import { useContext, useState, useEffect } from "react";
import { getCategoriesAndQuestions } from "../lib/getJeopardyData";
import { generateJeopardyMerkleTree } from "@/lib/merkleTree";
import { ACTION_TYPES, GameContext } from "@/lib/game-context";
import ReactAudioPlayer from "react-audio-player";
import Image from "next/image";
import MerkleTree from "@/components/MerkleTree";
import InfoScreen from "@/components/InfoScreen";
import $ from "jquery";
export async function getServerSideProps(context) {
  // load questions on server
  const result = getCategoriesAndQuestions();
  return {
    props: {
      data: result,
    },
  };
}

export default function Game(props) {
  const { dispatch, state } = useContext(GameContext);
  const { merkleTree } = state;
  // Keep track of score
  const score = state.score;
  const clues = props.data; // data is questions and categories
  const [showInfoScreen, setShowInfoScreen] = useState(false);
  const [showMerkleTree, setShowMerkleTree] = useState(false);
  const [visibleNodes, setVisibleNodes] = useState([]);

  const totalQuestions = clues.reduce((acc, category) => {
    return acc + category.Questions.length;
  }, 0);

  useEffect(() => {
    const merkleTree = generateJeopardyMerkleTree(clues);
    dispatch({
      type: ACTION_TYPES.SET_MERKLE_TREE,
      payload: {
        merkleTree,
      },
    });
    dispatch({
      type: ACTION_TYPES.SET_QUESTION_COUNT,
      payload: {
        totalQuestions,
      },
    });
  }, [totalQuestions]);

  const infoButtonHandler = () => {
    setShowInfoScreen(true);
  };

  const exitInformationHandler = () => {
    setShowInfoScreen(false);
  };

  const treeButtonHandler = () => {
    setShowMerkleTree(true);
  };

  const exitMerkleHandler = () => {
    setShowMerkleTree(false);
    setVisibleNodes([]);
  };

  const setShown = (leaf, hexProofs) => {
    // Set the visible node of the answer
    hexProofs.push(leaf);
    // Set the proof nodes to visible
    setVisibleNodes([...visibleNodes, ...hexProofs]);

    console.log(visibleNodes);
  };

  // Put in a small header here where we have like 'restart', 'info', 'exit'
  return (
    <div className={styles.fullWrapper}>
      {state.totalQuestions > 0 && (
        <main className={styles.main}>
          <ReactAudioPlayer
            id="correct-answer-sound"
            src="audio/jeopardy-correct-answer.mp3"
          />
          <ReactAudioPlayer
            id="wrong-answer-sound"
            src="audio/jeopardy-wrong-answer.mp3"
          />
          <ReactAudioPlayer
            id="daily-double-sound"
            src="audio/jeopardy-daily-double.mp3"
          />
          <ReactAudioPlayer
            id="clue-select-sound"
            src="audio/jeopardy-select-clue.mp3"
          />
          <div className={styles.gameNavigation}>
            <div className={styles.navItemsContainer}>
              <button
                className={styles.navItemContainer}
                onClick={infoButtonHandler}
              >
                <Image src="/img/information.png" width={35} height={35} />
              </button>
              <button
                className={styles.navItemContainer}
                onClick={infoButtonHandler}
              >
                <Image src="/img/volume-off-white.png" width={35} height={35} />
              </button>
              <button
                className={styles.navItemContainer}
                onClick={treeButtonHandler}
              >
                <Image src="/img/tree.png" width={35} height={35} />
              </button>
            </div>

            <div className={styles.navHeader}>
              <p>Crypto Jeopardy</p>
            </div>
          </div>
          <div className={styles.columnsWrapper}>
            {clues.map((category, index) => {
              return (
                <CategoryColumn
                  category={category.Name}
                  id={category.ID}
                  questions={category.Questions}
                  key={index}
                  setShown={setShown}
                  setShowTreeHandler={treeButtonHandler}
                />
              );
            })}
          </div>
          <div className={styles.scoreWrapper}>
            <h1>Score: {score}</h1>
            <br />
            <h1 className={styles.questionCounter}>
              Questions Left: {state.totalQuestions}
            </h1>
          </div>
          {showMerkleTree && (
            <MerkleTree
              tree={merkleTree}
              exitMerkleHandler={exitMerkleHandler}
              visibleNodes={visibleNodes}
            />
          )}
          {showInfoScreen && (
            <InfoScreen exitInformationHandler={exitInformationHandler} />
          )}
        </main>
      )}
      {/* We need to develop an end game screen or continue to next round */}
      {state.totalQuestions == 0 && <div>No Questions Left</div>}
    </div>
  );
}
