import {losingSound, winningSound} from "../PlaySound";

export const playDealer = async ({
  dealerCards,
  dealerScore,
  playerScore,
  setDealerCards,
  setDealerScore,
  getRandomCard,
  calculateHandValue,
  currentBet,
  setGamePhase,
  setGameResult,
  addCoins,
  resetGame,
  setShowWinningModal,
  setShowLosingModal,
  setShowTieModal,
}) => {
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
    determineWinner(playerScore, currentDealerScore, {
      currentBet,
      setGamePhase,
      setGameResult,
      addCoins,
      resetGame,
      setShowLosingModal,
      setShowWinningModal,
      setShowTieModal,
    });
  }, 1000);
};

// End game and handle payouts
export function endGame({
  result,
  currentBet,
  setGamePhase,
  setGameResult,
  addCoins,
  resetGame,
  setShowWinningModal,
  setShowLosingModal,
  setShowTieModal,
}) {
  setGamePhase("finished");
  setGameResult(result);

  let payout = 0;

  switch (result) {
    case "playerBlackjack":
      payout = Math.floor(currentBet * 2.5); // Blackjack pays 2.5x (1.5x + original bet)
      setShowWinningModal(true); // Visa vinst-modal istället för Alert
      winningSound();
      break;

    case "playerWin":
    case "dealerBust":
      payout = currentBet * 2; // Regular win pays 2x (1x + original bet)
      winningSound();
      setTimeout(() => {
        setShowWinningModal(true); // Visa vinst-modal istället för Alert
      }, 200); // Fördröjning för att matcha animationen

      break;
    case "tie":
      payout = currentBet; // Return original bet
      losingSound();
      setTimeout(() => {
        setShowTieModal(true); // Visa oavgjort-modal istället för Alert
      }, 200); // Fördröjning för att matcha animationen

      break;
    case "playerBust":
    case "dealerWin":
    case "dealerBlackjack":
      payout = 0; // Player loses bet (already subtracted)
      losingSound();
      setTimeout(() => {
        setShowLosingModal(true);
      }, 200);
      break;
  }

  if (payout > 0) {
    addCoins(payout);
  }
}

// Determine the winner and handle payouts
export const determineWinner = (
  playerFinalScore,
  dealerFinalScore,
  endGameParams
) => {
  // const {setShowLosingModal, setShowWinningModal} = endGameParams;
  let result;

  if (dealerFinalScore > 21) {
    result = "dealerBust";
    // setShowWinningModal(true);
  } else if (playerFinalScore > dealerFinalScore) {
    result = "playerWin";
    // setShowWinningModal(true);
  } else if (dealerFinalScore > playerFinalScore) {
    result = "dealerWin";
    // setShowLosingModal(true);
  } else {
    result = "tie";
  }

  // Logga resultatet
  console.log("Game result determined:", result);

  endGame({
    result,
    ...endGameParams,
  });
};
