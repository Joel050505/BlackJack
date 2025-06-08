import { use, useState } from "react";
import { View, ImageBackground, TouchableOpacity, Text } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import GameMenuModal from "../components/GameMenuModal";
import ShopMenuModal from "../components/ShopMenuModal";
import { handleBackConfirmation } from "../utils/handleBackConfirmation";
import { useCoins } from "../context/CoinsContext"; // Importing the Coins context

export default function GameScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [shopModalVisible, setShopModalVisible] = useState(false);

  // Hårdkodad poäng för synlighetens skull
  const coins = useCoins().coins; // Using the coins from context

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
        {/* Här kan du lägga till spelknappar och annat innehåll */}
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
