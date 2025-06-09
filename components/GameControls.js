import { View, TouchableOpacity, Text } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export function BettingControls({
  setCurrentBet,
  resetBet,
  currentBet,
  coins,
  handleDeal,
}) {
  return (
    <View className="flex-row justify-between items-center mb-3 gap-3">
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
          <Text className="text-white font-bold text-base ml-2">All in</Text>
        </View>
      </TouchableOpacity>

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
  );
}

export function GameplayControls({ onHit, onStand, isPlaying, onDeal }) {
  return (
    <View className="flex-row justify-between items-center gap-2">
      {isPlaying ? (
        <>
          <TouchableOpacity
            onPress={onHit}
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

          <TouchableOpacity
            onPress={onStand}
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
      ) : (
        <TouchableOpacity
          onPress={onDeal}
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
  );
}
