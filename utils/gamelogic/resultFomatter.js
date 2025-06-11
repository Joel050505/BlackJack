// Format game result display
export function formatGameResult(gameResult) {
  if (gameResult === "playerBlackjack") {
    return "Blackjack!";
  } else if (gameResult.includes("player") && gameResult.includes("Win")) {
    return "You Win!";
  } else if (gameResult.includes("dealer") && gameResult.includes("Win")) {
    return "Dealer Wins!";
  } else if (gameResult.includes("tie")) {
    return "Tie Game!";
  } else if (gameResult.includes("Bust")) {
    return "Bust!";
  } else {
    return "";
  }
}
