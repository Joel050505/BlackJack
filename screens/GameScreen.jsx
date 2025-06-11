import {useEffect, useState} from "react";
import {
  View,
  ImageBackground,
  TouchableOpacity,
  Text,
  Image,
  Alert,
} from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import GameMenuModal from "../components/GameMenuModal";
import ShopMenuModal from "../components/ShopMenuModal";
import {handleBackConfirmation} from "../utils/handleBackConfirmation";
import {useCoins} from "../context/CoinsContext";
import ChipCollection from "../components/ChipCollection";
import {BettingControls, GameplayControls} from "../components/GameControls";
import {getRandomCard} from "../utils/gamelogic/getRandomCard";
import {
  isBlackjack,
  calculateHandValue,
} from "../utils/gamelogic/blackJackLogic";
import {
  playDealer,
  determineWinner,
  endGame,
} from "../utils/gamelogic/gameRules";

export default function GameScreen({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [shopModalVisible, setShopModalVisible] = useState(false);
  const [currentBet, setCurrentBet] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gamePhase, setGamePhase] = useState("betting"); // betting, playing, dealer, finished

  // Player cards
  const [playerCards, setPlayerCards] = useState([]);
  const [playerScore, setPlayerScore] = useState(0);

  // Dealer cards
  const [dealerCards, setDealerCards] = useState([]);
  const [dealerScore, setDealerScore] = useState(0);
  const [showDealerCard, setShowDealerCard] = useState(false);

  const [gameResult, setGameResult] = useState("");

  const {coins, addCoins, subtractCoins} = useCoins();

  // Deal initial cards
  const handleDeal = () => {
    if (currentBet === 0) {
      Alert.alert("No Bet", "Please place a bet before dealing!");
      return;
    }

    if (coins < currentBet) {
      Alert.alert(
        "Insufficient Coins",
        "You don't have enough coins for this bet!"
      );
      return;
    }

    // Subtract bet from coins
    subtractCoins(currentBet);

    // Deal 2 cards to player and dealer
    const playerCard1 = getRandomCard();
    const playerCard2 = getRandomCard();
    const dealerCard1 = getRandomCard();
    const dealerCard2 = getRandomCard();

    const newPlayerCards = [playerCard1, playerCard2];
    const newDealerCards = [dealerCard1, dealerCard2];

    const newPlayerScore = calculateHandValue(newPlayerCards);
    const newDealerScore = calculateHandValue(newDealerCards);

    setPlayerCards(newPlayerCards);
    setDealerCards(newDealerCards);
    setPlayerScore(newPlayerScore);
    setDealerScore(newDealerScore);
    setIsPlaying(true);
    setGamePhase("playing");
    setShowDealerCard(false);
    setGameResult("");

    // Check for immediate blackjack
    if (isBlackjack(newPlayerCards, newPlayerScore)) {
      if (isBlackjack(newDealerCards, newDealerScore)) {
        // Both have blackjack - tie
        endGame({
          result: "tie",
          currentBet,
          setGamePhase,
          setGameResult,
          addCoins,
          resetGame,
        });
      } else {
        // Player blackjack wins
        endGame({
          result: "playerBlackjack",
          currentBet,
          setGamePhase,
          setGameResult,
          addCoins,
          resetGame,
        });
      }
    } else if (isBlackjack(newDealerCards, newDealerScore)) {
      // Dealer blackjack wins
      setShowDealerCard(true);
      endGame({
        result: "dealerBlackjack",
        currentBet,
        setGamePhase,
        setGameResult,
        addCoins,
        resetGame,
      });
    }
  };

  // Player hits (takes another card)
  const handleHit = () => {
    if (gamePhase !== "playing") return;

    const newCard = getRandomCard();
    const newPlayerCards = [...playerCards, newCard];
    const newPlayerScore = calculateHandValue(newPlayerCards);

    setPlayerCards(newPlayerCards);
    setPlayerScore(newPlayerScore);

    // Check if player busts
    if (newPlayerScore > 21) {
      setShowDealerCard(true);
      endGame({
        result: "playerBust",
        currentBet,
        setGamePhase,
        setGameResult,
        addCoins,
        resetGame,
      });
    } else if (newPlayerScore === 21) {
      // Auto stand on 21
      handleStand();
    }
  };

  // Player stands (dealer's turn)
  const handleStand = () => {
    if (gamePhase !== "playing") return;

    setGamePhase("dealer");
    setShowDealerCard(true);

    // Dealer plays automatically
    setTimeout(() => {
      playDealer({
        dealerCards,
        dealerScore,
        playerScore,
        playerCards,
        setDealerCards,
        setDealerScore,
        getRandomCard,
        isBlackjack,
        calculateHandValue,
        currentBet,
        setGamePhase,
        setGameResult,
        addCoins,
        resetGame,
      });
    }, 1000);
  };

  // Reset game for new round
  function resetGame() {
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

  // Betting functions
  const addBet = (amount) => {
    if (coins >= amount && gamePhase === "betting") {
      setCurrentBet((prevBet) => prevBet + amount);
    }
  };

  const resetBet = () => {
    if (gamePhase === "betting") {
      setCurrentBet(0);
    }
  };

  // Get visible dealer score (hide second card value until revealed)
  const getVisibleDealerScore = () => {
    if (!showDealerCard && dealerCards.length > 0) {
      // Only show first card value
      const firstCard = dealerCards[0];
      if (firstCard.value === 1) return 11; // Ace
      if (firstCard.value > 10) return 10; // Face card
      return firstCard.value;
    }
    return dealerScore;
  };

  return (
    <ImageBackground
      source={require("../assets/image/board.jpg")}
      className="flex-1 w-full h-full"
      resizeMode="cover"
    >
      {/* Header */}
      <View className="w-full flex-row justify-between items-start px-5 pt-20">
        <TouchableOpacity
          className="bg-black/35 rounded-xl p-2"
          onPress={() => setShopModalVisible(true)}
        >
          <View className="flex-row items-center gap-3">
            <FontAwesome5
              name="coins"
              size={16}
              color="#FFC107"
              style={{marginLeft: 5}}
            />
            <Text className="text-yellow-400 font-bold text-left text-base">
              {coins}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-black/35 p-2 rounded-full items-center"
          onPress={() => setModalVisible(true)}
        >
          <FontAwesome5 name="cog" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Dealer Cards Display */}
      {isPlaying && (
        <View className="flex flew-row items-center justify-center mt-10">
          <Text className="text-white text-lg mb-2">Dealer</Text>
          <View className="flex-row items-center justify-center">
            <View className="flex-row items-center justify-center">
              {dealerCards.map((card, index) => (
                <Image
                  key={index}
                  source={
                    index === 1 && !showDealerCard
                      ? require("../assets/image/card-back2.png") // Hide second card
                      : card?.image
                  }
                  className="w-44 h-56 mx-1"
                  style={{
                    marginLeft: index > 0 ? -130 : 0,
                  }}
                  resizeMode="contain"
                />
              ))}
            </View>

            <View>
              <Text className="text-white text-xl mt-2 bg-black/50 px-3 py-1 rounded">
                {getVisibleDealerScore()}
                {dealerScore > 21 && showDealerCard}
              </Text>
            </View>
          </View>
        </View>
      )}

      {/* Current Bet Display */}
      <View className="flex-1 items-center justify-center">
        <Text className="text-white text-sm mb-2">Current Bet</Text>
        <View className="flex-row items-center ">
          <FontAwesome5 name="coins" size={20} color="#FFC107" />
          <Text className="text-yellow-400 text-2xl font-bold ml-2">
            {currentBet}
          </Text>
        </View>

        {gameResult && (
          <Text className="text-white text-lg mt-4 text-center">
            {gameResult.includes("player") && gameResult.includes("Win")
              ? "You Win!"
              : gameResult.includes("dealer") && gameResult.includes("Win")
              ? "Dealer Wins!"
              : gameResult.includes("tie")
              ? "Tie Game!"
              : gameResult.includes("Blackjack")
              ? "Blackjack!"
              : gameResult.includes("Bust")
              ? "Bust!"
              : ""}
          </Text>
        )}
      </View>

      {/* Player Cards Display */}
      {isPlaying && (
        <View className="flex items-center justify-center mb-10">
          <Text className="text-white text-lg mb-2">Player</Text>
          <View className="flex flex-row items-center align-center justify-center">
            <View className="flex-row items-center justify-center">
              {playerCards.map((card, index) => (
                <Image
                  key={index}
                  source={card?.image}
                  className="w-44 h-56 mx-1"
                  style={{marginLeft: index > 0 ? -131 : 0}}
                  resizeMode="contain"
                />
              ))}
            </View>
            <View>
              <Text className="text-white text-xl mt-2 bg-black/50 px-3 py-1 rounded">
                {playerScore}
                {isBlackjack(playerCards, playerScore)}
              </Text>
            </View>
          </View>
        </View>
      )}

      {/* Game Controls */}
      <View className="px-5 pb-10">
        {gamePhase === "betting" && (
          <>
            <ChipCollection
              coins={coins}
              addBet={addBet}
              currentBet={currentBet}
              setShopModalVisible={setShopModalVisible}
            />

            <BettingControls
              setCurrentBet={setCurrentBet}
              resetBet={resetBet}
              currentBet={currentBet}
              coins={coins}
              onDeal={handleDeal}
            />
          </>
        )}

        {gamePhase === "playing" && (
          <GameplayControls
            onHit={handleHit}
            onStand={handleStand}
            isPlaying={true}
            gamePhase={gamePhase}
            canHit={playerScore < 21}
            canStand={true}
          />
        )}
      </View>

      {/* Modals */}
      <GameMenuModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onBackToMenu={() => handleBackConfirmation(setModalVisible, navigation)}
        resetGame={resetGame}
      />

      <ShopMenuModal
        visible={shopModalVisible}
        onClose={() => setShopModalVisible(false)}
      />
    </ImageBackground>
  );
}

// import {
//   View,
//   ImageBackground,
//   TouchableOpacity,
//   Text,
//   Image,
//   Alert,
// } from "react-native";
// import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
// import GameMenuModal from "../components/GameMenuModal";
// import ShopMenuModal from "../components/ShopMenuModal";
// import ChipCollection from "../components/ChipCollection";
// import {useState} from "react";
// import {handleBackConfirmation} from "../utils/handleBackConfirmation";
// import {useCoins} from "../context/CoinsContext";
// import {BettingControls, GameplayControls} from "../components/GameControls";

// // Import game logic functions
// import {getRandomCard} from "../utils/gamelogic/getRandomCard";
// import {
//   calculateHandValue,
//   isBlackjack,
// } from "../utils/gamelogic/scoreCalculator";
// // import {determineWinner} from "../utils/gamelogic/gameRules";
// // import {endGame, resetGame} from "../utils/gamelogic/payouts";

// import {formatGameResult} from "../utils/gamelogic/resultFomatter";
// import {playPokerChipSound} from "../utils/PlaySound";

// export default function GameScreen({navigation}) {
//   const [modalVisible, setModalVisible] = useState(false);
//   const [shopModalVisible, setShopModalVisible] = useState(false);
//   const [currentBet, setCurrentBet] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [gamePhase, setGamePhase] = useState("betting"); // betting, playing, dealer, finished

//   // Player cards
//   const [playerCards, setPlayerCards] = useState([]);
//   const [playerScore, setPlayerScore] = useState(0);

//   // Dealer cards
//   const [dealerCards, setDealerCards] = useState([]);
//   const [dealerScore, setDealerScore] = useState(0);
//   const [showDealerCard, setShowDealerCard] = useState(false);

//   const [gameResult, setGameResult] = useState("");

//   const {coins, addCoins, subtractCoins} = useCoins();

//   // Get visible dealer score (hide second card value until revealed)
//   const getVisibleDealerScore = () => {
//     if (!showDealerCard && dealerCards.length > 0) {
//       // Only show first card value
//       const firstCard = dealerCards[0];
//       if (firstCard.value === 1) return 11; // Ace
//       if (firstCard.value > 10) return 10; // Face card
//       return firstCard.value;
//     }
//     return dealerScore;
//   };

//   // Add to current bet
//   const addBet = (amount) => {
//     if (coins >= amount) {
//       setCurrentBet(currentBet + amount);
//       playPokerChipSound();
//     } else {
//       Alert.alert(
//         "Insufficient Coins",
//         "You don't have enough coins for this bet!"
//       );
//     }
//   };

//   // Deal initial cards
//   const handleDeal = () => {
//     if (currentBet === 0) {
//       Alert.alert("No Bet", "Please place a bet before dealing!");
//       return;
//     }

//     if (coins < currentBet) {
//       Alert.alert(
//         "Insufficient Coins",
//         "You don't have enough coins for this bet!"
//       );
//       return;
//     }

//     // Subtract bet from coins
//     subtractCoins(currentBet);

//     // Deal cards
//     const playerCard1 = getRandomCard();
//     const playerCard2 = getRandomCard();
//     const dealerCard1 = getRandomCard();
//     const dealerCard2 = getRandomCard();

//     const newPlayerCards = [playerCard1, playerCard2];
//     const newDealerCards = [dealerCard1, dealerCard2];

//     const newPlayerScore = calculateHandValue(newPlayerCards);
//     const newDealerScore = calculateHandValue(newDealerCards);

//     setPlayerCards(newPlayerCards);
//     setDealerCards(newDealerCards);
//     setPlayerScore(newPlayerScore);
//     setDealerScore(newDealerScore);
//     setIsPlaying(true);
//     setGamePhase("playing");
//     setShowDealerCard(false);
//     setGameResult("");

//     // Check for immediate blackjack
//     if (isBlackjack(newPlayerCards, newPlayerScore)) {
//       if (isBlackjack(newDealerCards, newDealerScore)) {
//         // Both have blackjack - tie
//         setShowDealerCard(true);
//         endGameLocal("tie");
//       } else {
//         // Player blackjack wins
//         setShowDealerCard(true);
//         endGameLocal("playerBlackjack");
//       }
//     } else if (isBlackjack(newDealerCards, newDealerScore)) {
//       // Dealer blackjack wins
//       setShowDealerCard(true);
//       endGameLocal("dealerBlackjack");
//     }
//   };

//   // Player hits (takes another card)
//   const handleHit = () => {
//     if (gamePhase !== "playing") return;

//     const newCard = getRandomCard();
//     const newPlayerCards = [...playerCards, newCard];
//     const newPlayerScore = calculateHandValue(newPlayerCards);

//     setPlayerCards(newPlayerCards);
//     setPlayerScore(newPlayerScore);

//     // Check if player busts
//     if (newPlayerScore > 21) {
//       setShowDealerCard(true);
//       endGameLocal("playerBust");
//     } else if (newPlayerScore === 21) {
//       // Auto stand on 21
//       handleStand();
//     }
//   };

//   // Player stands (end turn)
//   const handleStand = () => {
//     setGamePhase("dealer");
//     setShowDealerCard(true);

//     // Dealer plays automatically
//     setTimeout(() => {
//       playDealerLocal();
//     }, 1000);
//   };

//   // Dealer plays according to rules (must hit on 16 or less, stand on 17 or more)
//   const playDealerLocal = async () => {
//     let currentDealerCards = [...dealerCards];
//     let currentDealerScore = dealerScore;

//     while (currentDealerScore < 17) {
//       await new Promise((resolve) => setTimeout(resolve, 1000)); // Add delay for animation

//       const newCard = getRandomCard();
//       currentDealerCards = [...currentDealerCards, newCard];
//       currentDealerScore = calculateHandValue(currentDealerCards);

//       setDealerCards(currentDealerCards);
//       setDealerScore(currentDealerScore);
//     }

//     // Determine winner
//     determineWinnerLocal(playerScore, currentDealerScore);
//   };

//   // Determine the winner and handle payouts
//   const determineWinnerLocal = (playerFinalScore, dealerFinalScore) => {
//     if (dealerFinalScore > 21) {
//       endGameLocal("dealerBust");
//     } else if (playerFinalScore > dealerFinalScore) {
//       endGameLocal("playerWin");
//     } else if (dealerFinalScore > playerFinalScore) {
//       endGameLocal("dealerWin");
//     } else {
//       endGameLocal("tie");
//     }
//   };

//   // End game and handle payouts
//   const endGameLocal = (result) => {
//     setGamePhase("finished");
//     setGameResult(result);

//     let payout = 0;
//     let message = "";

//     switch (result) {
//       case "playerBlackjack":
//         payout = Math.floor(currentBet * 2.5); // Blackjack pays 2.5x (1.5x + original bet)
//         message = `Blackjack! You won ${payout} coins!`;
//         break;
//       case "playerWin":
//       case "dealerBust":
//         payout = currentBet * 2; // Regular win pays 2x (1x + original bet)
//         message = `You won ${payout} coins!`;
//         break;
//       case "tie":
//         payout = currentBet; // Return original bet
//         message = `It's a tie! Your bet of ${currentBet} coins is returned.`;
//         break;
//       case "playerBust":
//       case "dealerWin":
//       case "dealerBlackjack":
//         payout = 0; // Player loses bet (already subtracted)
//         message = `You lost ${currentBet} coins.`;
//         break;
//     }

//     if (payout > 0) {
//       addCoins(payout);
//     }

//     Alert.alert("Game Over", message, [
//       {
//         text: "New Game",
//         onPress: () => {
//           resetGameLocal();
//         },
//       },
//     ]);
//   };

//   // Reset game for new round
//   const resetGameLocal = () => {
//     setPlayerCards([]);
//     setDealerCards([]);
//     setPlayerScore(0);
//     setDealerScore(0);
//     setIsPlaying(false);
//     setGamePhase("betting");
//     setShowDealerCard(false);
//     setGameResult("");
//     setCurrentBet(0);
//   };

//   return (
//     <ImageBackground
//       source={require("../assets/image/board.jpg")}
//       className="flex-1 w-full h-full"
//       resizeMode="cover"
//     >
//       <View className="w-full flex-row justify-between items-start px-5 pt-20">
//         <TouchableOpacity
//           className="bg-black/35 rounded-xl p-2"
//           onPress={() => setShopModalVisible(true)}
//         >
//           <View className="flex-row items-center gap-3">
//             <FontAwesome5
//               name="coins"
//               size={16}
//               color="#FFC107"
//               style={{marginLeft: 5}}
//             />
//             <Text className="text-yellow-400 font-bold text-left text-base">
//               {coins}
//             </Text>
//           </View>
//         </TouchableOpacity>

//         <TouchableOpacity
//           className="bg-black/35 p-2 rounded-full items-center"
//           onPress={() => setModalVisible(true)}
//         >
//           <FontAwesome5 name="cog" size={24} color="white" />
//         </TouchableOpacity>
//       </View>

//       {isPlaying && (
//         <View className="flex flew-row items-center justify-center mt-10">
//           <Text className="text-white text-lg mb-2">Dealer</Text>
//           <View className="flex-row items-center justify-center">
//             <View className="flex-row items-center justify-center">
//               {dealerCards.map((card, index) => (
//                 <Image
//                   key={index}
//                   source={
//                     index === 1 && !showDealerCard
//                       ? require("../assets/image/card-back.jpg")
//                       : card?.image
//                   }
//                   className="w-44 h-56 mx-1 transition-all ease-out duration-300"
//                   style={{marginLeft: index > 0 ? -130 : 0}}
//                   resizeMode="contain"
//                 />
//               ))}
//             </View>

//             <View>
//               <Text className="text-white text-xl mt-2 bg-black/50 px-3 py-1 rounded">
//                 {getVisibleDealerScore()}
//                 {showDealerCard && isBlackjack(dealerCards, dealerScore)
//                   ? " (Blackjack!)"
//                   : ""}
//               </Text>
//             </View>
//           </View>
//         </View>
//       )}

//       <View className="flex-1 items-center justify-center">
//         <Text className="text-white text-sm mb-2">Current Bet</Text>
//         <View className="flex-row items-center ">
//           <FontAwesome5 name="coins" size={20} color="#FFC107" />
//           <Text className="text-yellow-400 text-2xl font-bold ml-2">
//             {currentBet}
//           </Text>
//         </View>

//         {gameResult && (
//           <Text className="text-white text-lg mt-4 text-center">
//             {formatGameResult(gameResult)}
//           </Text>
//         )}
//       </View>

//       {isPlaying && (
//         <View className="flex items-center justify-center mb-10">
//           <Text className="text-white text-lg mb-2">Player</Text>
//           <View className="flex flex-row items-center align-center justify-center">
//             <View className="flex-row items-center justify-center">
//               {playerCards.map((card, index) => (
//                 <Image
//                   key={index}
//                   source={card?.image}
//                   className="w-44 h-56 mx-1"
//                   style={{marginLeft: index > 0 ? -131 : 0}}
//                   resizeMode="contain"
//                 />
//               ))}
//             </View>
//             <View>
//               <Text className="text-white text-xl mt-2 bg-black/50 px-3 py-1 rounded">
//                 {playerScore}
//                 {isBlackjack(playerCards, playerScore) ? " (Blackjack!)" : ""}
//               </Text>
//             </View>
//           </View>
//         </View>
//       )}

//       {/* Game Controls */}
//       <View className="px-5 pb-10">
//         {gamePhase === "betting" && (
//           <>
//             <ChipCollection
//               coins={coins}
//               addBet={addBet}
//               currentBet={currentBet}
//               setShopModalVisible={setShopModalVisible}
//             />

//             <BettingControls
//               setCurrentBet={setCurrentBet}
//               resetBet={() => setCurrentBet(0)}
//               currentBet={currentBet}
//               coins={coins}
//               onDeal={handleDeal}
//             />
//           </>
//         )}

//         {gamePhase === "playing" && (
//           <GameplayControls
//             onHit={handleHit}
//             onStand={handleStand}
//             isPlaying={true}
//             gamePhase={gamePhase}
//             canHit={playerScore < 21}
//             canStand={true}
//           />
//         )}
//       </View>

//       <GameMenuModal
//         visible={modalVisible}
//         onClose={() => setModalVisible(false)}
//         onBackToMenu={() => handleBackConfirmation(setModalVisible, navigation)}
//         resetGame={resetGameLocal}
//       />

//       <ShopMenuModal
//         visible={shopModalVisible}
//         onClose={() => setShopModalVisible(false)}
//       />
//     </ImageBackground>
//   );
// }
