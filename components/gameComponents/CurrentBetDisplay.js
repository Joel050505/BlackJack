import {View, Text} from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export default function CurrentBetDisplay({currentBet}) {
  return (
    <View className="items-center justify-center w-full my-6">
      <Text className="text-white text-sm mb-2">Current Bet</Text>
      <View className="flex-row items-center justify-center">
        <FontAwesome5 name="coins" size={20} color="#FFC107" />
        <Text className="text-yellow-400 text-2xl font-bold ml-2">
          {currentBet}
        </Text>
      </View>
    </View>
  );
}
