import { Alert } from "react-native";

// Dealer plays according to rules (must hit on 16 or less, stand on 17 or more)
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
  setShowWinningModal, // Lägg till dessa två parametrar
  setShowLosingModal,
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
      setShowWinningModal, // Pass these two parameters
    });
  }, 1000);
};

// End game and handle payouts
export const endGame = ({
  result,
  currentBet,
  setGamePhase,
  setGameResult,
  addCoins,
  resetGame,
  setShowWinningModal, // Lägg till dessa två parametrar
  setShowLosingModal,
}) => {
  setGamePhase("finished");
  setGameResult(result);

  let payout = 0;

  switch (result) {
    case "playerBlackjack":
      payout = Math.floor(currentBet * 2.5); // Blackjack pays 2.5x (1.5x + original bet)
      setShowWinningModal(true); // Visa vinst-modal istället för Alert
      break;
    case "playerWin":
    case "dealerBust":
      payout = currentBet * 2; // Regular win pays 2x (1x + original bet)
      setShowWinningModal(true); // Visa vinst-modal istället för Alert
      break;
    case "tie":
      payout = currentBet; // Return original bet
      // Visa ingen modal vid oavgjort
      break;
    case "playerBust":
    case "dealerWin":
    case "dealerBlackjack":
      payout = 0; // Player loses bet (already subtracted)
      setShowLosingModal(true); // Visa förlust-modal istället för Alert
      break;
  }

  if (payout > 0) {
    addCoins(payout);
  }

  // Ta bort Alert-anropet
};
// export const endGame = ({
//   result,
//   currentBet,
//   setGamePhase,
//   setGameResult,
//   addCoins,
//   resetGame,
// }) => {
//   setGamePhase("finished");
//   setGameResult(result);

//   let payout = 0;
//   let message = "";

//   switch (result) {
//     case "playerBlackjack":
//       payout = Math.floor(currentBet * 2.5); // Blackjack pays 2.5x (1.5x + original bet)
//       message = `Blackjack! You won ${payout} coins!`;
//       break;
//     case "playerWin":
//     case "dealerBust":
//       payout = currentBet * 2; // Regular win pays 2x (1x + original bet)
//       message = `You won ${payout} coins!`;
//       break;
//     case "tie":
//       payout = currentBet; // Return original bet
//       message = `It's a tie! Your bet of ${currentBet} coins is returned.`;
//       break;
//     case "playerBust":
//     case "dealerWin":
//     case "dealerBlackjack":
//       payout = 0; // Player loses bet (already subtracted)
//       message = `You lost ${currentBet} coins.`;
//       break;
//   }

//   if (payout > 0) {
//     addCoins(payout);
//   }

//   Alert.alert("Game Over", message, [
//     {
//       text: "New Game",
//       onPress: () => {
//         resetGame();
//       },
//     },
//   ]);
// };

// Determine the winner and handle payouts
export const determineWinner = (
  playerFinalScore,
  dealerFinalScore,
  endGameParams
) => {
  const { setShowLosingModal, setShowWinningModal } = endGameParams;
  let result;

  if (dealerFinalScore > 21) {
    result = "dealerBust";
    setShowWinningModal(true);
  } else if (playerFinalScore > dealerFinalScore) {
    result = "playerWin";
    setShowWinningModal(true);
  } else if (dealerFinalScore > playerFinalScore) {
    result = "dealerWin";
    setShowLosingModal(true);
  } else {
    result = "tie";
  }

  endGame({
    result,
    ...endGameParams,
  });
};
