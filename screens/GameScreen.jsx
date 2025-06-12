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
import GameResultModal from "../components/GameResultModal";
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

  // Modals for winning and losing
  const [showWinningModal, setShowWinningModal] = useState(false);
  const [showLosingModal, setShowLosingModal] = useState(false);
  const [showTieModal, setShowTieModal] = useState(false);

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
          setShowWinningModal, // Lägg till dessa
          setShowLosingModal,
          setShowTieModal,
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
          setShowWinningModal,
          setShowLosingModal,
          setShowTieModal,
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
        setShowWinningModal,
        setShowLosingModal,
        setShowTieModal,
      });
    }
  };

  // Player hits (takes another card)
  function handleHit() {
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
        setShowWinningModal, // Lägg till dessa
        setShowLosingModal,
        setShowTieModal,
      });
    } else if (newPlayerScore === 21) {
      // Auto stand on 21
      setShowDealerCard(true);
      // handleStand();
      endGame({
        result: "playerWin", // Använd vanlig vinst, inte playerTwentyOne
        currentBet,
        setGamePhase,
        setGameResult,
        addCoins,
        resetGame,
        setShowWinningModal,
        setShowLosingModal,
        setShowTieModal,
      });

      //   handleStand();
    }
  }

  // Player stands (dealer's turn)
  function handleStand() {
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
        setShowWinningModal,
        setShowLosingModal,
        setShowTieModal,
      });
    }, 1000);
  }

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
      {/* Header with Icons */}
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

      {/*Winning Modal*/}
      {showWinningModal && (
        <GameResultModal
          visible={showWinningModal}
          onClose={() => setShowWinningModal(false)}
          gameResult={gameResult}
          currentBet={currentBet}
          addCoins={addCoins}
          resetGame={resetGame}
          playerScore={playerScore}
          dealerScore={dealerScore}
        />
      )}

      {/*Losing Modal*/}
      {showLosingModal && (
        <GameResultModal
          visible={showLosingModal}
          onClose={() => setShowLosingModal(false)}
          gameResult={gameResult}
          currentBet={currentBet}
          resetGame={resetGame}
          playerScore={playerScore}
          dealerScore={dealerScore}
        />
      )}

      {/* Tie Modal */}
      {showTieModal && (
        <GameResultModal
          visible={showTieModal}
          onClose={() => setShowTieModal(false)}
          gameResult={gameResult}
          currentBet={currentBet}
          resetGame={resetGame}
          playerScore={playerScore}
          dealerScore={dealerScore}
        />
      )}

      {/* Game Menu Modal */}
      <GameMenuModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onBackToMenu={() => handleBackConfirmation(setModalVisible, navigation)}
        resetGame={resetGame}
      />

      {/* Shop modal */}
      <ShopMenuModal
        visible={shopModalVisible}
        onClose={() => setShopModalVisible(false)}
      />
    </ImageBackground>
  );
}
