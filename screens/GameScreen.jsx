import {useState} from "react";
import {View, ImageBackground, Alert} from "react-native";
import {useCoins} from "../context/CoinsContext";
import GameMenuModal from "../components/modals/GameMenuModal";
import ShopMenuModal from "../components/modals/ShopMenuModal";
import GameResultModal from "../components/modals/GameResultModal";
import DealerHand from "../components/gameComponents/DealerHand";
import PlayerHand from "../components/gameComponents/PlayerHand";
import CurrentBetDisplay from "../components/gameComponents/CurrentBetDisplay";
import HeaderWithIcons from "../components/layout/HeaderWithIcons";
import ChipCollection from "../components/controls/ChipCollection";
import {
  BettingControls,
  GameplayControls,
} from "../components/controls/GameControls";
import {handleBackToHome} from "../utils/handleBackToHome";
import {getRandomCard} from "../utils/gamelogic/getRandomCard";
import {playDealer, endGame} from "../utils/gamelogic/gameRules";
import {
  isBlackjack,
  calculateHandValue,
} from "../utils/gamelogic/blackJackLogic";
import {playCardDealSound, playBackgroundMusic} from "../utils/PlaySound";

// import {playBackgroundMusic} from "../utils/PlaySound";

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

  // Game result message
  const [gameResult, setGameResult] = useState("");

  // Coins context
  const {coins, addCoins, subtractCoins} = useCoins();

  // playBackgroundMusic();

  {
    /* ////////////////////////
      //// GAME FUNCTIONS /////
      //////////////////////// */
  }

  // Deal initial cards
  function handleDeal() {
    if (currentBet === 0) {
      Alert.alert("No Bet", "Please place a bet before dealing!");

      return;
    }

    // Check if player has enough coins for the bet
    if (coins < currentBet) {
      Alert.alert(
        "Insufficient Coins",
        "You don't have enough coins for this bet!"
      );
      return;
    }

    // Play card deal sound
    for (let i = 0; i < 2; i++) {
      setTimeout(() => {
        playCardDealSound();
      }, i * 500);
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
          setShowWinningModal,
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
  }

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
  {
    /* ////////////////////////
      //// BETTING SYSTEM /////
      //////////////////////// */
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

  return (
    <ImageBackground
      source={require("../assets/image/board.jpg")}
      className="flex-1 w-full h-full"
      resizeMode="cover"
    >
      {/* ///////////////////////
          //// HEADER SECTION ////
          /////////////////////// */}
      <HeaderWithIcons
        coins={coins}
        onShopPress={() => setShopModalVisible(true)}
        onSettingsPress={() => setModalVisible(true)}
      />

      {/* //////////////////////
          //// GAME BOARD ///////
          ////////////////////// */}
      <View className="flex-1 justify-center items-center px-4 mb-10">
        {/* Dealer Cards Display */}
        {isPlaying && (
          <DealerHand
            dealerCards={dealerCards}
            showDealerCard={showDealerCard}
            dealerScore={dealerScore}
          />
        )}

        {/* Current Bet Display */}
        <CurrentBetDisplay currentBet={currentBet} />

        {/* Player Cards Display */}
        {isPlaying && (
          <PlayerHand
            playerCards={playerCards}
            playerScore={playerScore}
            isBlackjack={isBlackjack}
          />
        )}
      </View>

      {/* ///////////////////////
          //// GAME CONTROLS /////
          /////////////////////// */}
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

      {/* ///////////////////////
          ////// MODALS //////////
          /////////////////////// */}

      {/* Winning Modal */}
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

      {/* Losing Modal */}
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
        onBackToHome={() => handleBackToHome(setModalVisible, navigation)}
        resetGame={resetGame}
        gamePhase={gamePhase}
        currentBet={currentBet}
      />

      {/* Shop Modal */}
      <ShopMenuModal
        visible={shopModalVisible}
        onClose={() => setShopModalVisible(false)}
      />
    </ImageBackground>
  );
}
