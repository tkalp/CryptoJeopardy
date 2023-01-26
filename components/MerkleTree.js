import styles from "./MerkleTree.module.scss";
import classNames from "classnames";
import { Tree } from "react-tree-graph";
import { useEffect } from "react";
import $ from "jquery";
export default function MerkleTree(props) {
  const { tree } = props;

  const findMyShit = () => {
    console.log("my shit is found");
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

  const merkleSkeleton = (tree) => {
    const treeObject = createMerkleDict(tree);
    let layers = Object.keys(treeObject);
    layers = layers.reverse();
    const divs = [];
    for (const layer of layers) {
      const layerElements = [];
      const nodes = treeObject[layer];
      for (const node of nodes) {
        layerElements.push(
          <div className={styles.node} id={node}>
            <p title={node}>{node}</p>
            <div className={styles.leftLine}></div>
            <div className={styles.rightLine}></div>
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
    }
    return divs;
  };

  useEffect(() => {
    const test = $("." + styles.layerContainer);
    console.log(test);
  }, []);

  return (
    <div className={styles.treeMainContainer}>
      <div>
        <button onClick={props.exitMerkleHandler}>Exit</button>
      </div>
      <div className={styles.treeTitleContainer}>
        <h1 className={styles.treeTitle}>Jeopardy Merkle Tree</h1>
      </div>
      {merkleSkeleton(tree)}
    </div>
  );
}
