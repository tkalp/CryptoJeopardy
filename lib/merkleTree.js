// Import Libraries
const { MerkleTree } = require("merkletreejs");
const { SHA256 } = require("./hash");

export function createMerkleTreeFromJeopardyQuestions(data) {
  let merkleTreeData = [];
  for (const entry of data) {
    const questions = entry.Questions;
    if (questions != null) {
      for (const question of questions) {
        const combined = question.Question + question.Answer;
        merkleTreeData.push(combined);
      }
    }
  }

  const leaves = merkleTreeData.map((entry) => SHA256(entry.toLowerCase()));
  const tree = new MerkleTree(leaves, SHA256);
  return tree;
}

// Generate the data for the merkle root
// const data = [
//   "one of the least insecure hashing algorithms:What is md5",
//   "the study of breaking ciphers:What is cryptoanalysis",
//   "a secret used by a cipher to encrypt/decrypt a message: What is key",
// ];
// const data = getCategoriesAndQuestions();
// console.log(data);
// const leaves = data.map((entry) => SHA256(entry.toLowerCase()));
// const tree = new MerkleTree(leaves, SHA256);

// console.log(tree.toString());

// const root = tree.getRoot().toString("hex");
// console.log(root);

// const leaf = hash(
//   "one of the least insecure hashing algorithms:What is md5".toLowerCase()
// );
// const proof = tree.getProof(leaf);
// console.log(proof);
