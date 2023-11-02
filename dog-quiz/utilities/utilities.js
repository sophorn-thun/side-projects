// Function to get randomly selected item from array //
function getRandomItem(array) {
  const i = Math.floor(Math.random() * array.length);
  return array[i];
}

// Function to shuffle the order of items in array //
function shuffleArray(array) {
  return array.sort((a, b) => Math.random() - 0.5)
}

// Function to get multiple choices including correct answer
function getMultipleChoice(n, correctAnswer, array) {
  const choicesSet = [];
  choicesSet.push(correctAnswer);

  while (choicesSet.length < n) {
    let selectedChoice = getRandomItem(array);
    if (choicesSet.indexOf(selectedChoice) < 0) {
      choicesSet.push(selectedChoice);
    }
    return shuffleArray(choicesSet)
  }
}