import { getMultipleChoice } from "./utilities/utilities.js";

const BREEDS = ["affenpinscher", "african", "airedale", "akita", "appenzeller", "shepherd australian", "basenji", "beagle", "bluetick", "borzoi", "bouvier", "boxer", "brabancon", "briard", "norwegian buhund", "boston bulldog", "english bulldog", "french bulldog", "staffordshire bullterrier", "australian cattledog", "chihuahua", "chow", "clumber", "cockapoo", "border collie", "coonhound", "cardigan corgi", "cotondetulear", "dachshund", "dalmatian", "great dane", "scottish deerhound", "dhole", "dingo", "doberman", "norwegian elkhound", "entlebucher", "eskimo", "lapphund finnish", "bichon frise", "germanshepherd", "italian greyhound", "groenendael", "havanese", "afghan hound", "basset hound", "blood hound", "english hound", "ibizan hound", "plott hound", "walker hound", "husky", "keeshond", "kelpie", "komondor", "kuvasz", "labradoodle", "labrador", "leonberg", "lhasa", "malamute", "malinois", "maltese", "bull mastiff", "english mastiff", "tibetan mastiff", "mexicanhairless", "mix", "bernese mountain", "swiss mountain", "newfoundland", "otterhound", "caucasian ovcharka", "papillon", "pekinese", "pembroke", "miniature pinscher", "pitbull", "german pointer", "germanlonghair pointer", "pomeranian", "medium poodle", "miniature poodle", "standard poodle", "toy poodle", "pug", "puggle", "pyrenees", "redbone", "chesapeake retriever", "curly retriever", "flatcoated retriever", "golden retriever", "rhodesian ridgeback", "rottweiler", "saluki", "samoyed", "schipperke", "giant schnauzer", "miniature schnauzer", "english setter", "gordon setter", "irish setter", "sharpei", "english sheepdog", "shetland sheepdog", "shiba", "shihtzu", "blenheim spaniel", "brittany spaniel", "cocker spaniel", "irish spaniel", "japanese spaniel", "sussex spaniel", "welsh spaniel", "english springer", "stbernard", "american terrier", "australian terrier", "bedlington terrier", "border terrier", "cairn terrier", "dandie terrier", "fox terrier", "irish terrier", "kerryblue terrier", "lakeland terrier", "norfolk terrier", "norwich terrier", "patterdale terrier", "russell terrier", "scottish terrier", "sealyham terrier", "silky terrier", "tibetan terrier", "toy terrier", "welsh terrier", "westhighland terrier", "wheaten terrier", "yorkshire terrier", "tervuren", "vizsla", "spanish waterdog", "weimaraner", "whippet", "irish wolfhound"];
const url_endpoint = "https://dog.ceo/api/breeds/image/random";

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

      document.querySelector(`button[value="${correctAnswer}"]`).classList.add("correct");
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

// Function to add quiz to the page
function renderQuiz(imgUrl, correctAnswer, choicesSet) {
  const image = document.createElement("img");
  image.setAttribute("src", imgUrl);

  const container = document.getElementById('image-container');

  image.addEventListener("load", () => {
    container.replaceChildren(image);
    renderButtons(choicesSet, correctAnswer)
  })
}

// Function to load data
async function loadQuiz() {
  document.getElementById('image-container').textContent = 'Fetching dog...';

  const dogImageUrl = await fetchMessage(url_endpoint);
  const correctBreed = getBreedFromUrl(dogImageUrl);
  const breedChoices = getMultipleChoice(3, correctBreed, BREEDS);
  
  return [dogImageUrl, correctBreed, breedChoices];
}

// Render image and choices

const [imageUrl, correctAnswer, choicesSet] = await loadQuiz();
renderQuiz(imageUrl, correctAnswer, choicesSet)

// Fetch one more random image
document.getElementById('next').addEventListener('click', function() {
  location.reload();
});
