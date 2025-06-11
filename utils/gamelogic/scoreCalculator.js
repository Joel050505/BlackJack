// Calculate hand value with proper Ace handling
export const calculateHandValue = (cards) => {
  let value = 0;
  let aces = 0;

  cards.forEach((card) => {
    if (card.value === 1) {
      // Ace
      aces++;
      value += 11;
    } else if (card.value > 10) {
      // Face cards
      value += 10;
    } else {
      value += card.value;
    }
  });

  // Convert Aces from 11 to 1 if needed
  while (value > 21 && aces > 0) {
    value -= 10;
    aces--;
  }

  return value;
};

// Check for blackjack (21 with 2 cards)
export const isBlackjack = (cards, score) => {
  return cards.length === 2 && score === 21;
};

// Get visible dealer score (hide second card value until revealed)
export const getVisibleDealerScore = () => {
  if (!showDealerCard && dealerCards.length > 0) {
    // Only show first card value
    const firstCard = dealerCards[0];
    if (firstCard.value === 1) return 11; // Ace
    if (firstCard.value > 10) return 10; // Face card
    return firstCard.value;
  }
  return dealerScore;
};
