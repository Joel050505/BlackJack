import {cards} from "../../data/cards";

// Function to get a random card from the cards array
export const getRandomCard = () => {
  const randomIndex = Math.floor(Math.random() * cards.length);
  return cards[randomIndex];
};
