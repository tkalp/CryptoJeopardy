const dataCategories = require("../data/categories.json");
const dataQuestions = require("../data/questions.json");

export function getCategories() {
  // We will need to replace this with random categories
  const categories = dataCategories.Categories;
  // Grabs all the questions
  const allQuestions = dataQuestions.Questions;
  const result = [];
  for (const category of categories) {
    const categoryQuestions = allQuestions.filter(
      (question) => question.CategoryID == category.ID
    );
    const categoryResult = {
      ID: category.ID,
      Name: category.Name,
      Questions: categoryQuestions,
    };
    result.push(categoryResult);
  }

  return result;
}

//exports.getCategories = getCategories;
