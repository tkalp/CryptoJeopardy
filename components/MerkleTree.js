import styles from "./MerkleTree.module.scss";
import { Tree } from "react-tree-graph";
import { useEffect } from "react";
import $ from "jquery";
const classNames = require("classnames");
import { useState } from "react";
import MerkleTreeInfo from "./MerkleTreeInfo";
import Image from "next/image";

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
            <p
              title={i == 0 ? "0x" + node + " (root)" : "0x" + node}
              className={i == 0 ? styles.show : ""}
            >
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

  /**
   * @description The following occurs when the Merkle Tree is Loaded
   * 1. For each visible node we want to show, add the `show` class
   * 2. Label each visible with either a `proof` or `data` tag
   * 3. Color the border based on `proof` or `background`
   */
  useEffect(() => {
    for (let node of visibleNodes) {
      const nodeValue = node.Node;
      const nodeElement = $("#" + nodeValue).find("p");
      $(nodeElement).addClass(styles.show);
      const title = $(nodeElement).attr("title");

      if (!node.isData) {
        $("#" + nodeValue).addClass(styles.highlight);
        if (!title.includes("(proof)")) {
          $(nodeElement).attr("title", title + " (proof)");
        }
      } else {
        $("#" + nodeValue).addClass(styles.highlightData);
        if (!title.includes("(data)")) {
          $(nodeElement).attr("title", title + " (data)");
        }
      }
    }
  }, [visibleNodes]);

  return (
    <div className={styles.treeMainContainer}>
      <div className={styles.merkleNav}>
        <div>
          <button
            onClick={props.exitMerkleHandler}
            className={styles.merkleNavButton}
          >
            <Image src="/img/back-arrow.png" height={30} width={30} />
          </button>
        </div>
        <div>
          <button
            onClick={infoButtonHandler}
            className={styles.merkleNavButton}
          >
            <Image src="/img/information.png" height={30} width={30} />
          </button>
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
