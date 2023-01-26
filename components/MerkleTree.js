import styles from "./MerkleTree.module.scss";

export default function MerkleTree(props) {
  const { tree } = props;

  const createMerkleDict = (tree) => {
    const layers = tree.getLayers();
    const layerCount = layers.length;
    // Go through each layer
    const merkleDict = {};
    for (let i = 1; i <= layerCount; i++) {
      console.log(`Layer ${i}:`);
      let layer = layers[i - 1];
      let elementCount = layer.length;
      console.log(elementCount);
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
  // Keep working on this...it is possible...I will do it.
  // Visualization of the merkle tree
  const merkleSkeleton = (tree) => {
    const treeObject = createMerkleDict(tree);
    const layers = Object.keys(treeObject);
    const divs = [];
    for (const layer of layers) {
      const layerElements = [];
      const nodes = treeObject[layer];
      for (const node of nodes) {
        layerElements.push(<p id={node}>{node}</p>);
      }
      const layerElement = (
        <div className={styles.layerContainer}>
          <p className={styles.layerName}>{layer}</p>
          <div className={styles.nodeContainer}>{layerElements}</div>
        </div>
      );
      divs.push(layerElement);
    }
    return divs;
  };

  //return <div>{merkleSkeleton(tree)}</div>;
  // todo, recreate this tree, layers have to be inside layers, its fuckeed
  return (
    <div class={styles.tree}>
      <ul>
        <li>
          <a href="#">1</a>
          <ul>
            <li>
              <a href="#">2</a>
              <ul>
                <li>
                  <a href="#">2.1</a>
                </li>
                <li>
                  <a href="#">2.2</a>
                </li>
                <li>
                  <a href="#">2.3</a>
                </li>
                <li>
                  <a href="#">2.3</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#">2</a>
              <ul>
                <li>
                  <a href="#">2.1</a>
                </li>
                <li>
                  <a href="#">2.2</a>
                </li>
                <li>
                  <a href="#">2.3</a>
                </li>
                <li>
                  <a href="#">2.3</a>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
