import {View, Text, Image} from "react-native";

export default function PlayerHand({playerCards, playerScore, isBlackjack}) {
  return (
    <View className="items-center justify-center w-full mb-4">
      <Text className="text-white text-lg mb-2">Player</Text>
      <View className="flex-row items-center justify-center">
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
  );
}
