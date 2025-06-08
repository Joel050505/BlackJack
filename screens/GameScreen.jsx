import { useState } from "react";
import { View, ImageBackground, TouchableOpacity, Text } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import GameMenuModal from "../components/GameMenuModal";
import ShopMenuModal from "../components/ShopMenuModal";
import { handleBackConfirmation } from "../utils/handleBackConfirmation";
import { useCoins } from "../context/CoinsContext"; // Importing the Coins context

export default function GameScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [shopModalVisible, setShopModalVisible] = useState(false);
  const [currentBet, setCurrentBet] = useState(0); // State för nuvarande bet
  const [isPlaying, setIsPlaying] = useState(false); // State för att hålla koll på om spelet pågår

  const coins = useCoins().coins; // Using the coins from context

  // Funktion för att lägga till bet
  const addBet = (amount) => {
    if (coins >= amount) {
      setCurrentBet((prevBet) => prevBet + amount);
    }
  };

  // Funktion för att återställa bet
  const resetBet = () => {
    setCurrentBet(0);
  };

  // Game functions
  const handleHit = () => {
    // Add your hit logic here
    console.log("Hit pressed");
  };

  const handleStand = () => {
    // Add your stand logic here
    console.log("Stand pressed");
  };

  const handleDeal = () => {
    // Add your deal logic here
    setIsPlaying(true); // Set playing state to true
    console.log("Deal pressed");
  };

  return (
    <ImageBackground
      source={require("../assets/image/board.jpg")}
      className="flex-1 w-full h-full"
      resizeMode="cover"
    >
      {/* Header med justify-between för att placera elementen på var sin sida */}
      <View className="w-full flex-row justify-between items-start px-5 pt-20">
        {/* Vänster sida - klickbar score-view som öppnar shop */}
        <TouchableOpacity
          className="bg-black/35 rounded-xl p-3"
          onPress={() => setShopModalVisible(true)}
        >
          <View className="flex-row items-center gap-3">
            <FontAwesome5
              name="coins"
              size={16}
              color="#FFC107"
              style={{ marginLeft: 5 }}
            />
            <Text className="text-yellow-400 font-bold text-left text-base">
              {coins}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Höger sida - Huvud Meny */}
        <TouchableOpacity
          className="bg-black/35 p-2 rounded-full items-center"
          onPress={() => setModalVisible(true)}
        >
          <FontAwesome5 name="cog" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Spelets huvudinnehåll */}
      <View className="flex-1 items-center justify-center">
        <Text className="text-white text-sm mb-2">Current Bet</Text>
        <View className="flex-row items-center">
          <FontAwesome5 name="coins" size={20} color="#FFC107" />
          <Text className="text-yellow-400 text-2xl font-bold ml-2">
            {currentBet}
          </Text>
        </View>
      </View>
      <View className="px-5 pb-10">
        {/* Spelets huvudinnehåll */}

        {/* Betting och Game Controls */}
        {/* Casino Chips */}

        {isPlaying ? null : (
          <View className="flex-row justify-center items-center mb-6 gap-4">
            {/* 25 Chip - Green */}

            <TouchableOpacity
              onPress={() => addBet(25)}
              disabled={coins < 25}
              style={{
                width: 70,
                height: 70,
                borderRadius: 35,
                backgroundColor:
                  coins >= 25 ? "#2E7D32" : "rgba(46, 125, 50, 0.3)",
                borderWidth: 3,
                borderColor: coins >= 25 ? "#4CAF50" : "rgba(76, 175, 80, 0.3)",
                justifyContent: "center",
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: coins >= 25 ? 0.3 : 0.1,
                shadowRadius: 5,
                elevation: coins >= 25 ? 6 : 2,
              }}
            >
              <View
                style={{
                  position: "absolute",
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  borderWidth: 1,
                  borderColor:
                    coins >= 25 ? "#66BB6A" : "rgba(102, 187, 106, 0.3)",
                  borderStyle: "dashed",
                }}
              />
              <Text
                style={{
                  color: coins >= 25 ? "white" : "rgba(255, 255, 255, 0.5)",
                  fontSize: 16,
                  fontWeight: "bold",
                  textShadowColor: "rgba(0, 0, 0, 0.5)",
                  textShadowOffset: { width: 1, height: 1 },
                  textShadowRadius: 2,
                }}
              >
                25
              </Text>
            </TouchableOpacity>

            {/* 50 Chip - Blue */}
            <TouchableOpacity
              onPress={() => addBet(50)}
              disabled={coins < 50}
              style={{
                width: 70,
                height: 70,
                borderRadius: 35,
                backgroundColor:
                  coins >= 50 ? "#1565C0" : "rgba(21, 101, 192, 0.3)",
                borderWidth: 3,
                borderColor:
                  coins >= 50 ? "#2196F3" : "rgba(33, 150, 243, 0.3)",
                justifyContent: "center",
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: coins >= 50 ? 0.3 : 0.1,
                shadowRadius: 5,
                elevation: coins >= 50 ? 6 : 2,
              }}
            >
              <View
                style={{
                  position: "absolute",
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  borderWidth: 1,
                  borderColor:
                    coins >= 50 ? "#64B5F6" : "rgba(100, 181, 246, 0.3)",
                  borderStyle: "dashed",
                }}
              />
              <Text
                style={{
                  color: coins >= 50 ? "white" : "rgba(255, 255, 255, 0.5)",
                  fontSize: 16,
                  fontWeight: "bold",
                  textShadowColor: "rgba(0, 0, 0, 0.5)",
                  textShadowOffset: { width: 1, height: 1 },
                  textShadowRadius: 2,
                }}
              >
                50
              </Text>
            </TouchableOpacity>

            {/* 100 Chip - Orange */}
            <TouchableOpacity
              onPress={() => addBet(100)}
              disabled={coins < 100}
              style={{
                width: 70,
                height: 70,
                borderRadius: 35,
                backgroundColor:
                  coins >= 100 ? "#E65100" : "rgba(230, 81, 0, 0.3)",
                borderWidth: 3,
                borderColor:
                  coins >= 100 ? "#FF9800" : "rgba(255, 152, 0, 0.3)",
                justifyContent: "center",
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: coins >= 100 ? 0.3 : 0.1,
                shadowRadius: 5,
                elevation: coins >= 100 ? 6 : 2,
              }}
            >
              <View
                style={{
                  position: "absolute",
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  borderWidth: 1,
                  borderColor:
                    coins >= 100 ? "#FFB74D" : "rgba(255, 183, 77, 0.3)",
                  borderStyle: "dashed",
                }}
              />
              <Text
                style={{
                  color: coins >= 100 ? "white" : "rgba(255, 255, 255, 0.5)",
                  fontSize: 16,
                  fontWeight: "bold",
                  textShadowColor: "rgba(0, 0, 0, 0.5)",
                  textShadowOffset: { width: 1, height: 1 },
                  textShadowRadius: 2,
                }}
              >
                100
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setShopModalVisible(true)}
              disabled={coins < 100}
              style={{
                width: 70,
                height: 70,
                borderRadius: 35,
                backgroundColor:
                  coins >= 100 ? "#800080" : "rgba(230, 81, 0, 0.3)",
                borderWidth: 3,
                borderColor:
                  coins >= 100 ? "#800080" : "rgba(255, 152, 0, 0.3)",
                justifyContent: "center",
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: coins >= 100 ? 0.3 : 0.1,
                shadowRadius: 5,
                elevation: coins >= 100 ? 6 : 2,
              }}
            >
              <View
                style={{
                  position: "absolute",
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  borderWidth: 1,
                  borderColor:
                    coins >= 100 ? "#FFB74D" : "rgba(255, 183, 77, 0.3)",
                  borderStyle: "dashed",
                }}
              />
              <Text
                style={{
                  color: coins >= 100 ? "white" : "rgba(255, 255, 255, 0.5)",
                  fontSize: 16,
                  fontWeight: "bold",
                  textShadowColor: "rgba(0, 0, 0, 0.5)",
                  textShadowOffset: { width: 1, height: 1 },
                  textShadowRadius: 2,
                }}
              >
                Buy
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Action Buttons Row 1 - Only show when not playing */}
        {!isPlaying ? (
          <View className="flex-row justify-between items-center mb-3 gap-3">
            {/* Buy Button */}
            <TouchableOpacity
              onPress={() => setCurrentBet(coins)}
              className="bg-green-600 px-6 py-3 rounded-xl flex-1 items-center"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
              }}
            >
              <View className="flex-row items-center">
                <Text className="text-white font-bold text-base ml-2">
                  All in
                </Text>
              </View>
            </TouchableOpacity>

            {/* Reset Button */}
            <TouchableOpacity
              onPress={resetBet}
              disabled={currentBet === 0}
              className={`px-6 py-3 rounded-xl flex-1 items-center ${
                currentBet > 0 ? "bg-red-600" : "bg-red-600/30"
              }`}
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: currentBet > 0 ? 0.25 : 0.1,
                shadowRadius: 4,
                elevation: currentBet > 0 ? 5 : 2,
              }}
            >
              <View className="flex-row items-center">
                <FontAwesome5
                  name="undo"
                  size={16}
                  color={currentBet > 0 ? "white" : "rgba(255, 255, 255, 0.5)"}
                />
                <Text
                  className={`font-bold text-base ml-2 ${
                    currentBet > 0 ? "text-white" : "text-white/50"
                  }`}
                >
                  Reset
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : null}

        {/* Action Buttons Row 2 */}
        <View className="flex-row justify-between items-center gap-2">
          {isPlaying ? (
            <>
              {/* Hit Button */}
              <TouchableOpacity
                onPress={handleHit}
                className="bg-blue-600 px-4 py-3 rounded-xl flex-1 items-center"
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.25,
                  shadowRadius: 4,
                  elevation: 5,
                }}
              >
                <Text className="text-white font-bold text-base">Hit</Text>
              </TouchableOpacity>

              {/* Stand Button */}
              <TouchableOpacity
                onPress={handleStand}
                className="bg-orange-600 px-4 py-3 rounded-xl flex-1 items-center"
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.25,
                  shadowRadius: 4,
                  elevation: 5,
                }}
              >
                <Text className="text-white font-bold text-base">Stand</Text>
              </TouchableOpacity>
            </>
          ) : null}

          {/* Deal Button */}
          {isPlaying ? null : (
            <TouchableOpacity
              onPress={handleDeal}
              className="bg-purple-600 px-4 py-3 rounded-xl flex-1 items-center"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
              }}
            >
              <Text className="text-white font-bold text-base">Deal</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Settings Modal Component */}
      <GameMenuModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onBackToMenu={() => handleBackConfirmation(setModalVisible, navigation)}
      />

      {/* Shop Modal Component */}
      <ShopMenuModal
        visible={shopModalVisible}
        onClose={() => setShopModalVisible(false)}
      />
    </ImageBackground>
  );
}
