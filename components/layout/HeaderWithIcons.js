import {View, TouchableOpacity, Text} from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export default function HeaderWithIcons({coins, onShopPress, onSettingsPress}) {
  return (
    <View className="w-full flex-row justify-between items-start px-5 pt-20">
      <TouchableOpacity
        className="bg-black/35 rounded-xl p-2"
        onPress={onShopPress}
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
        onPress={onSettingsPress}
      >
        <FontAwesome5 name="cog" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}
