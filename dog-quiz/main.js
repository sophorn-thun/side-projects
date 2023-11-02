import { getRandomItem, getMultipleChoice } from "./utilities/utilities";

function getBreedFromUrl(url) {
  const [, path] = url.split("/breeds/");
  const [breedID] = path.split('/');
  const [breed, subtype] = breedID.split("-");
  
  return [subtype, breed].join(' ');
}

// Fetch resource
async function fetchMessage(url) {
  const response = await fetch(url);
  const { message } = await response.json();

  return message;
}

// Function to add multiple choice button to the page 
function renderButtons(choicesArray, correctAnswer) {
  function buttonHandler(e) {
    if (e.target.value === correctAnswer) {
      e.target.classList.add("correct");
    } else {
      e.target.classList.add("incorrect")

      document.querySelector(`button[value="${correctAnswer}]`).classList.add("correct");
    }
  }
  const options = document.getElementById("options");
  choicesArray.map(choice => {
    let button = document.createElement("button");
    button.value = button.name = button.textContent = choice;
    button.addEventListener('click', buttonHandler);
    options.appendChild(button)
  })
}


