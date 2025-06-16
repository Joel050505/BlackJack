import { Alert } from "react-native";

export function handleNewGame({
  gamePhase,
  currentBet,
  resetGame,
  setModalVisible,
}) {
  // Stänger modalen
  setModalVisible(false);

  // Om vi är i betting-fasen (inga kort har delats ut), starta nytt spel direkt
  if (gamePhase === "betting" && currentBet === 0) {
    resetGame();
    return;
  }

  // Annars visa en varning
  Alert.alert(
    "New Game?",
    "Are you sure you want to start a new game? Your current hand and bet will be lost.",
    [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "New Game",
        onPress: () => resetGame(),
      },
    ]
  );
}
