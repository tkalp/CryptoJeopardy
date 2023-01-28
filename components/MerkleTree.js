import styles from "./MerkleTree.module.scss";
import { Tree } from "react-tree-graph";
import { useEffect } from "react";
import $ from "jquery";
const classNames = require("classnames");
import { useState } from "react";
import MerkleTreeInfo from "./MerkleTreeInfo";
export default function MerkleTree(props) {
  const [showMerkleInfo, setShowMerkleInfo] = useState(false);
  const { tree, visibleNodes } = props;

  const infoButtonHandler = () => {
    setShowMerkleInfo(true);
  };

  const exitMerkleInfoHandler = () => {
    setShowMerkleInfo(false);
  };

  const createMerkleDict = (tree) => {
    const layers = tree.getLayers();
    const layerCount = layers.length;
    // Go through each layer
    const merkleDict = {};
    for (let i = 1; i <= layerCount; i++) {
      let layer = layers[i - 1];
      let elementCount = layer.length;
      // Go through each node in the layer
      const hexNodes = [];
      for (let j = 0; j < elementCount; j++) {
        let node = layer[j];
        const hexValue = node.reduce((acc, value) => {
          return acc + value.toString(16).padStart(2, "0");
        }, "");
        hexNodes.push(hexValue);
      }
      merkleDict[`Layer_${i}`] = hexNodes;
    }
    return merkleDict;
  };

  /**
   * @name merkleSkeleton
   * @description Creates the Merkle Tree Diagram Skeleton based on the Merkle Tree that is
   *              fed in.
   * @param {} tree
   * @returns JSX
   *
   * @author Teddy Kalp
   */
  const merkleSkeleton = (tree) => {
    const treeObject = createMerkleDict(tree);
    let layers = Object.keys(treeObject);
    layers = layers.reverse();
    const divs = [];
    let i = 0;
    for (const layer of layers) {
      const layerElements = [];
      const nodes = treeObject[layer];
      for (const node of nodes) {
        layerElements.push(
          <div
            className={
              i == 0 ? classNames(styles.node, styles.root) : styles.node
            }
            id={node}
          >
            <p title={"0x" + node} className={i == 0 ? styles.show : ""}>
              0x{node}
            </p>
          </div>
        );
      }

      const layerElement = (
        <div className={styles.layerContainer}>
          <p className={styles.layerName}>{layer.replace("_", " ")}</p>
          <div className={styles.nodeContainer}>{layerElements}</div>
        </div>
      );

      divs.push(layerElement);
      i = i + 1;
    }
    return divs;
  };

  useEffect(() => {
    console.log(visibleNodes);
    for (let node of visibleNodes) {
      let nodeValue = node.Node;
      console.log("#" + nodeValue);
      $("#" + nodeValue)
        .find("p")
        .addClass(styles.show);

      if (!node.isData) {
        $("#" + nodeValue).addClass(styles.highlight);
      } else {
        $("#" + nodeValue).addClass(styles.highlightData);
      }
    }
  }, [visibleNodes]);

  return (
    <div className={styles.treeMainContainer}>
      <div className={styles.merkleNav}>
        <div>
          <button onClick={props.exitMerkleHandler}>Exit</button>
        </div>
        <div>
          <button onClick={infoButtonHandler}>Information</button>
        </div>
      </div>
      <div className={styles.treeTitleContainer}>
        <h1 className={styles.treeTitle}>Jeopardy Merkle Tree</h1>
      </div>
      {merkleSkeleton(tree)}
      {showMerkleInfo && (
        <MerkleTreeInfo exitMerkleInfoHandler={exitMerkleInfoHandler} />
      )}
    </div>
  );
}
