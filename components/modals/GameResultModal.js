import {View, Text, Modal, TouchableOpacity} from "react-native";
import {useEffect} from "react";

export default function GameResultModal({
  visible,
  onClose,
  gameResult,
  currentBet,
  resetGame,
  playerScore,
  dealerScore,
}) {
  // useEffect(() => {
  //   if (visible) {
  //     console.log("Modal opened with gameResult:", gameResult);
  //   }
  // }, [visible]);

  let payout = 0;
  let title = ""; // Title for the modal
  let message = ""; // Message to display in the modal
  let isWin = false; // Flag to determine if the player won

  if (gameResult === "playerBlackjack") {
    payout = Math.floor(currentBet * 2.5);
    title = "BLACKJACK!";
    // message = `You won ${payout} coins!`;
    message = (
      <Text>
        You won <Text className="font-bold">{payout}</Text> coins!
      </Text>
    );
    isWin = true;
  } else if (gameResult === "playerWin" || gameResult === "dealerBust") {
    payout = currentBet * 2;
    title = "YOU WIN! ";
    // message = `You won ${payout} coins!\n\n Dealer score: ${dealerScore} \n Player score: ${playerScore}`;
    message = (
      <Text>
        You won <Text className="font-bold">{payout}</Text> coins!
        {"\n\n"}Dealer score: {dealerScore} {"\n"}Player score: {playerScore}
      </Text>
    );
    isWin = true;
  } else if (gameResult === "tie") {
    payout = currentBet;
    title = "TIE GAME!";
    // message = `Your bet of ${currentBet} coins is returned.`;
    message = (
      <Text>
        Your bet of <Text className="font-bold ">{currentBet}</Text> coins is
        returned.
      </Text>
    );
  } else if (gameResult === "playerBust" || gameResult === "dealerWin") {
    isWin = false;
    title = "YOU LOST!";
    // message = `You lost ${currentBet} coins.\n\n Dealer score: ${dealerScore} \n Player score: ${playerScore}`;
    message = (
      <Text>
        You lost <Text className="font-bold">{currentBet}</Text> coins.
        {"\n\n"}Dealer score: {dealerScore} {"\n"}Player score: {playerScore}
      </Text>
    );
  } else if (gameResult === "dealerBlackjack") {
    isWin = false;
    title = "DEALER BLACKJACK!";
    // message = `You lost ${currentBet} coins.`;
    message = (
      <Text>
        You lost <Text className="font-bold">{currentBet}</Text> coins.
      </Text>
    );
  } else {
    console.error("Unknown game result:", gameResult);
    return null;
  }

  const handlePlayAgain = () => {
    onClose();
    resetGame();
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-center items-center p-10">
        <View
          className={`bg-amber-50 rounded-xl w-full p-6 border-4 ${
            isWin ? "border-orange-600" : "border-rose-500"
          }`}
        >
          <Text
            className={`text-4xl font-bold text-center mb-2 ${
              isWin ? "text-green-500" : "text-gray-800"
            }`}
          >
            {title}
          </Text>

          <Text className="text-base text-gray-700 text-center mb-6">
            {message}
          </Text>

          <TouchableOpacity
            onPress={handlePlayAgain}
            className={`bg-blue-500 py-3 rounded-lg`}
          >
            {/* isWin ? "bg-blue-500" : "bg-blue-500" */}
            <Text className="text-white text-center font-bold text-lg">
              Play Again
            </Text>
          </TouchableOpacity>

          {/* <TouchableOpacity onPress={onClose} className="mt-3">
            <Text className="text-gray-500 text-center">Close</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </Modal>
  );
}
