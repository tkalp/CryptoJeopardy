const dataCategories = require("../data/categories.json");
const dataQuestions = require("../data/questions.json");
const { MerkleTree } = require("merkletreejs");

export function getCategoriesAndQuestions() {
  // We will need to replace this with random categories
  const categories = dataCategories.Categories;
  const sampleCategories = sampleArray(categories, 5);
  // Grabs all the questions
  const allQuestions = dataQuestions.Questions;
  const result = [];
  for (const category of sampleCategories) {
    // These are all the category questions
    const categoryQuestions = allQuestions.filter(
      (question) => question.CategoryID == category.ID
    );
    const sampleQuestions = sampleJeopardyQuestions(categoryQuestions, 5);
    const sortedQuestions = sampleQuestions.sort((q1, q2) => {
      return q1.Value - q2.Value;
    });

    const categoryResult = {
      ID: category.ID,
      Name: category.Name,
      Questions: sortedQuestions,
    };
    result.push(categoryResult);
  }

  return result;
}

function sampleArray(arr, numItems) {
  if (arr.length == 0) {
    console.error("There are no elements in the array");
    return;
  }

  let filledSample = false;
  let usedIndexes = [];
  let sampleArray = [];

  if (arr.length < numItems) {
    numItems = arrLength;
  }

  while (!filledSample) {
    let randomIndex = Math.floor(Math.random() * arr.length);
    if (!usedIndexes.includes(randomIndex)) {
      sampleArray.push(arr[randomIndex]);
      usedIndexes.push(randomIndex);
      if (sampleArray.length == numItems) {
        filledSample = true;
      }
    }
  }

  return sampleArray;
}

function sampleJeopardyQuestions(arr, numItems) {
  if (arr.length == 0) {
    return []; // return an empty arry
  } else if (arr.length == 1) {
    return arr;
  }

  let usedValues = [];
  let sampleArray = [];
  let filledSample = false;

  if (arr.length < numItems) {
    numItems = arr.length;
  }

  while (!filledSample) {
    let randIndex = Math.floor(Math.random() * arr.length);
    let entry = arr[randIndex];
    let questionValue = entry.Value;
    if (!usedValues.includes(questionValue)) {
      sampleArray.push(entry);
      usedValues.push(questionValue);
      if (sampleArray.length == numItems) {
        filledSample = true;
      }
    }
  }

  return sampleArray;
}

// const data = getCategoriesAndQuestions();
// let merkleTreeData = [];
// for (const entry of data) {
//   const questions = entry.Questions;
//   if (questions != null) {
//     for (const question of questions) {
//       const combined = question.Question + question.Answer;
//       merkleTreeData.push(combined);
//     }
//   }
// }

// const leaves = merkleTreeData.map((entry) => SHA256(entry.toLowerCase()));
// const tree = new MerkleTree(leaves, SHA256);
// console.log(tree.toString());

// const leaf = SHA256(merkleTreeData[0].toLowerCase());

// const proof = tree.getProof(leaf);
// console.log(proof);
