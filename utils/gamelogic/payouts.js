// End game and handle payouts
export function endGame(
  result,
  setGamePhase,
  setGameResult,
  currentBet,
  addCoins,
  resetGame,
  Alert
) {
  setGamePhase("finished");
  setGameResult(result);

  let payout = 0;
  let message = "";

  switch (result) {
    case "playerBlackjack":
      payout = Math.floor(currentBet * 2.5); // Blackjack pays 2.5x (1.5x + original bet)
      message = `Blackjack! You won ${payout} coins!`;
      break;
    case "playerWin":
    case "dealerBust":
      payout = currentBet * 2; // Regular win pays 2x (1x + original bet)
      message = `You won ${payout} coins!`;
      break;
    case "tie":
      payout = currentBet; // Return original bet
      message = `It's a tie! Your bet of ${currentBet} coins is returned.`;
      break;
    case "playerBust":
    case "dealerWin":
    case "dealerBlackjack":
      payout = 0; // Player loses bet (already subtracted)
      message = `You lost ${currentBet} coins.`;
      break;
  }

  if (payout > 0) {
    addCoins(payout);
  }

  Alert.alert("Game Over", message, [
    {
      text: "New Game",
      onPress: () => {
        resetGame();
      },
    },
  ]);
}

// Reset game for new round
export function resetGame(
  setPlayerCards,
  setDealerCards,
  setPlayerScore,
  setDealerScore,
  setIsPlaying,
  setGamePhase,
  setShowDealerCard,
  setGameResult,
  setCurrentBet
) {
  setPlayerCards([]);
  setDealerCards([]);
  setPlayerScore(0);
  setDealerScore(0);
  setIsPlaying(false);
  setGamePhase("betting");
  setShowDealerCard(false);
  setGameResult("");
  setCurrentBet(0);
}
