import styles from "./MerkleTreeInfo.module.scss";
import Image from "next/image";
export default function MerkleTreeInfo(props) {
  return (
    <div className={styles.mainContainer}>
      <div>
        <button
          onClick={props.exitMerkleInfoHandler}
          className={styles.backButton}
        >
          <Image src="/img/back-arrow.png" height={30} width={30} />
        </button>
      </div>
      <h1>About The Merkle Tree</h1>
      <ul>
        <li>
          Imagine a tree with lots of branches and leaves, but instead of
          leaves, it has hashes!
        </li>
        <li>
          Each leaf node represents a piece of data, like a transaction in a
          blockchain.
        </li>
        <li>
          In Crypto Jeopardy, these pieces of data are the lower-case versions
          of the clue and answer concantenated.
        </li>
        <li>You will always see 25 leafs nodes that represents this data.</li>
        <li>
          Upon answering a question, you will be presented with the Merkle Tree
          which will show how it is provided integrity.
        </li>
        <li>
          To verify the integrity of a piece of data, you start at the leaf node
          and follow the path all the way up to the "root" node.
        </li>
        <li>
          The root node's hash is like a fingerprint of the entire tree, so if
          anything changes in the tree, the root node's hash will change too.
          This is why it is always displayed.
        </li>
        <li>
          By comparing the root node hash to a previously agreed upon value, you
          can confirm that all the data in the tree is valid.
        </li>
        <li>
          And remember, the magic of Merkle tree is that you only need to check
          a small number of hashes to verify the integrity of the entire tree.
        </li>
        <li>
          Boxes that are highlighted in{" "}
          <span className={styles.highlightData}>green</span> represent that
          data you are trying to validate
        </li>
        <li>
          Boxes that are highlighted in{" "}
          <span className={styles.highlight}>orange</span> represent the proofs
          required alongside the data to verify the root
        </li>
        <li>
          The root is always highlighted in{" "}
          <span className={styles.root}>red</span>
        </li>
      </ul>
    </div>
  );
}
