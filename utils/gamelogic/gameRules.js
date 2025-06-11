// Determine the winner and handle payouts
export function determineWinner(playerFinalScore, dealerFinalScore, endGame) {
  if (dealerFinalScore > 21) {
    endGame("dealerBust");
  } else if (playerFinalScore > dealerFinalScore) {
    endGame("playerWin");
  } else if (dealerFinalScore > playerFinalScore) {
    endGame("dealerWin");
  } else {
    endGame("tie");
  }
}
