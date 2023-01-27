// Import Libraries
const { MerkleTree } = require("merkletreejs");
const { SHA256 } = require("./hash");

/**
 * @name generateJeopardyMerkleTree
 * @description Transforms selected jeopardy questions to a merkle tree using SHA256 hashing
 * @param {any} data -> Array of Objects in the form {ID, Name, Question: [ARRY_OF_QUESTIONS]}
 * @returns MerkleTree Object
 */
export function generateJeopardyMerkleTree(data) {
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
