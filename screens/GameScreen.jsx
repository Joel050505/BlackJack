import {useState} from "react";
import {View, ImageBackground, TouchableOpacity, Text} from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import GameMenuModal from "../components/GameMenuModal";
import ShopMenuModal from "../components/ShopMenuModal";
import {handleBackConfirmation} from "../utils/handleBackConfirmation";
import {useCoins} from "../context/CoinsContext";
import ChipCollection from "../components/ChipCollection";
import {BettingControls, GameplayControls} from "../components/GameControls";

export default function GameScreen({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [shopModalVisible, setShopModalVisible] = useState(false);
  const [currentBet, setCurrentBet] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const {coins} = useCoins();

  // Spelfunktioner
  const addBet = (amount) => {
    if (coins >= amount) {
      setCurrentBet((prevBet) => prevBet + amount);
    }
  };

  const resetBet = () => setCurrentBet(0);
  const handleHit = () => console.log("Hit pressed");
  const handleStand = () => console.log("Stand pressed");

  const handleDeal = () => {
    setIsPlaying(true);
    console.log("Deal pressed");
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
          className="bg-black/35 rounded-xl p-3"
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

      {/* Current Bet Display */}
      <View className="flex-1 items-center justify-center">
        <Text className="text-white text-sm mb-2">Current Bet</Text>
        <View className="flex-row items-center">
          <FontAwesome5 name="coins" size={20} color="#FFC107" />
          <Text className="text-yellow-400 text-2xl font-bold ml-2">
            {currentBet}
          </Text>
        </View>
      </View>

      {/* Game Controls */}
      <View className="px-5 pb-10">
        {!isPlaying && (
          <ChipCollection
            coins={coins}
            addBet={addBet}
            currentBet={currentBet}
            setShopModalVisible={setShopModalVisible}
          />
        )}

        {!isPlaying && (
          <BettingControls
            setCurrentBet={setCurrentBet}
            resetBet={resetBet}
            currentBet={currentBet}
            coins={coins}
          />
        )}

        <GameplayControls
          onHit={handleHit}
          onStand={handleStand}
          onDeal={handleDeal}
          isPlaying={isPlaying}
        />
      </View>

      {/* Modals */}
      <GameMenuModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onBackToMenu={() => handleBackConfirmation(setModalVisible, navigation)}
      />

      <ShopMenuModal
        visible={shopModalVisible}
        onClose={() => setShopModalVisible(false)}
      />
    </ImageBackground>
  );
}
