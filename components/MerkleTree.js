function lookAtTree(treeStructure, keyNumber, result) {
  const keys = Object.keys(treeStructure);
  console.log(keys);
  if (result == null) {
    result = {};
  }
  result[keyNumber] = keys;
  console.log(result);
  let index = 1;
  for (const key of keys) {
    const valStructure = treeStructure[key];
    if (valStructure != null) {
      result = lookAtTree(valStructure, keyNumber + index.toString(), result);
      index++;
    } else {
      return result;
    }
  }
}

export default function MerkleTree(props) {
  const { tree } = props;
  //

  const goDownNode = (nodeTree, node, layer) => {
    console.log("We are in the node function");
    console.log("Layer " + layer);
    console.log({ node });
    console.log({ nodeTree });
    const nodeBranches = nodeTree[node];
    if (nodeBranches != null) {
      const nodes = Object.keys(nodeBranches);
      goDownNode(nodeBranches, nodes[0], layer + 1);
      goDownNode(nodeBranches, nodes[1], layer + 1);
    }
  };
  // Keep working on this, it is possible, I will do it.
  const createMerkleTreeHTML = (tree) => {
    const treeStructure = tree.getLayersAsObject();
    let layer = 1;
    const root = Object.keys(treeStructure)[0];
    console.log("Layer " + layer);
    const nodeBranches = treeStructure[root];
    const nodes = Object.keys(nodeBranches);
    goDownNode(nodeBranches, nodes[0], layer + 1);
    goDownNode(nodeBranches, nodes[1], layer + 1);

    return <div>{root}</div>;
  };
  console.log(tree.toString());
  //
  //console.log(tree.toString());
  //console.log({ treeStructure });
  //console.log(tree.print());
  //lookAtTree(treeStructure, "1");
  return <div>{createMerkleTreeHTML(tree)}</div>;
}
