import {getRandomCard} from "./getRandomCard";

// Player hits (takes another card)
export function handleHit(
  playerCards,
  setPlayerCards,
  setPlayerScore,
  calculateHandValue,
  setShowDealerCard,
  endGame,
  handleStand,
  gamePhase
) {
  if (gamePhase !== "playing") return;

  const newCard = getRandomCard();
  const newPlayerCards = [...playerCards, newCard];
  const newPlayerScore = calculateHandValue(newPlayerCards);

  setPlayerCards(newPlayerCards);
  setPlayerScore(newPlayerScore);

  // Check if player busts
  if (newPlayerScore > 21) {
    setShowDealerCard(true);
    endGame("playerBust");
  } else if (newPlayerScore === 21) {
    // Auto stand on 21
    handleStand();
  }
}

// Dealer plays according to rules (must hit on 16 or less, stand on 17 or more)
export const playDealer = async (
  dealerCards,
  dealerScore,
  setDealerCards,
  setDealerScore,
  getRandomCard,
  calculateHandValue,
  determineWinner,
  playerScore
) => {
  let currentDealerCards = [...dealerCards];
  let currentDealerScore = dealerScore;

  while (currentDealerScore < 17) {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Add delay for animation

    const newCard = getRandomCard();
    currentDealerCards = [...currentDealerCards, newCard];
    currentDealerScore = calculateHandValue(currentDealerCards);

    setDealerCards(currentDealerCards);
    setDealerScore(currentDealerScore);
  }

  // Determine winner
  setTimeout(() => {
    determineWinner(playerScore, currentDealerScore);
  }, 1000);
};
