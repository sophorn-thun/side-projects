// Function to get randomly selected item from array //
export function getRandomItem(array) {
  const i = Math.floor(Math.random() * array.length);
  return array[i];
}

// Function to shuffle the order of items in array //
export function shuffleArray(array) {
  return array.sort((a, b) => Math.random() - 0.5)
}

// Function to get multiple choices including correct answer
export function getMultipleChoice(n, correctAnswer, array) {
  const choicesSet = [correctAnswer];

  while (choicesSet.length < n) {
    let selectedChoice = getRandomItem(array);
    if (choicesSet.indexOf(selectedChoice) < 0) {
      choicesSet.push(selectedChoice);
    }
  }
  return shuffleArray(choicesSet)
}