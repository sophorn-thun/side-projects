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

