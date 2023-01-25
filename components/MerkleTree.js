import { useEffect } from "react";
import $ from "jquery";

export default function MerkleTree(props) {
  const { tree } = props;
  //

  useEffect(() => {
    const layerCount = 1;
    const layers = $(".layer-container");
    const layersObject = tree.getLayersAsObject();
    //console.log(layersObject);
    const root = Object.keys(layersObject)[0];
    console.log(root);
    const test = $(`#layer-${layerCount}`);
    console.log(test);
    $(test).css("color", "green");
    $(test);
  }, [tree]);

  const goDownNode = (nodeTree, node, layer) => {
    console.log("Layer " + layer);

    const nodeBranches = nodeTree[node];
    if (nodeBranches != null) {
      const nodes = Object.keys(nodeBranches);
      const leftNode = nodes[0];
      const rightNode = nodes[1];

      goDownNode(nodeBranches, leftNode, layer + 1);
      goDownNode(nodeBranches, nodes[1], layer + 1);
    }
  };
  // Keep working on this, it is possible, I will do it.
  const merkleSkeleton = (tree) => {
    const layerCount = tree.getLayerCount();
    const html = [];
    console.log(layerCount);
    for (let i = 1; i <= layerCount; i++) {
      html.push(
        <div id={`layer-${i}`} className="layer-container">
          Layer {i}
        </div>
      );
    }
    console.log(html);
    return html;
  };
  // console.log(tree.toString());
  //
  //console.log(tree.toString());
  //console.log({ treeStructure });
  //console.log(tree.print());
  //lookAtTree(treeStructure, "1");
  return <div>{merkleSkeleton(tree)}</div>;
}
