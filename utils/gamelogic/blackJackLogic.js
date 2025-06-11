// utils/gamelogic/blackjackLogic.js

export const calculateHandValue = (cards) => {
  let value = 0;
  let aces = 0;

  cards.forEach((card) => {
    if (card.value === 1) {
      aces++;
      value += 11;
    } else if (card.value > 10) {
      value += 10;
    } else {
      value += card.value;
    }
  });

  while (value > 21 && aces > 0) {
    value -= 10;
    aces--;
  }

  return value;
};

export const isBlackjack = (cards, score) => {
  return cards.length === 2 && score === 21;
};

// export const shouldDealerHit = (score) => score < 17;
