const dataCategories = require("../data/categories.json");
const dataQuestions = require("../data/questions.json");

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
    if (categoryQuestions.length > 0) {
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
    } else {
      const categoryResult = {
        ID: category.ID,
        Name: category.Name,
        Questions: [],
      };
      result.push(categoryResult);
    }
  }

  return result;
}

function sampleArray(arr, numItems) {
  let usedIndexes = [];
  let filledSample = false;
  let returnedArray = [];
  let arrLength = arr.length;
  while (!filledSample) {
    let randIndex = Math.floor(Math.random() * arrLength);
    if (!usedIndexes.includes(randIndex)) {
      returnedArray.push(arr[randIndex]);
      usedIndexes.push(randIndex);
      if (returnedArray.length == numItems) {
        filledSample = true;
      }
    }
  }

  return returnedArray;
}

function sampleJeopardyQuestions(arr, numItems) {
  let usedValues = [];
  let returnedArray = [];
  let filledSample = false;
  let arrLength = arr.length;
  while (!filledSample) {
    let randIndex = Math.floor(Math.random() * arrLength);
    let entry = arr[randIndex];
    let questionValue = entry.Value;
    if (!usedValues.includes(questionValue)) {
      returnedArray.push(entry);
      usedValues.push(questionValue);
      if (returnedArray.length == numItems) {
        filledSample = true;
      }
    }
  }

  return returnedArray;
}

// const myArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// const sampleArr = sampleArray(myArr, 5);
// console.log(sampleArr);
//exports.getCategories = getCategories;
