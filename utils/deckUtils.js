import {cards} from "../data/cards";

// Funktion för att hämta ett slumpmässigt kort
export const getRandomCard = () => {
  const randomIndex = Math.floor(Math.random() * cards.length);
  return cards[randomIndex];
};
