import {View, Text, Image} from "react-native";

// const cardBackImage = require("../../assets/image/card-back2.png");
// const cardBackImage = require("../assets/image/card-back2.png");
export default function DealerHand({
  dealerCards,
  showDealerCard,
  getVisibleDealerScore,
  dealerScore,
}) {
  return (
    <View className="items-center justify-center w-full mb-4">
      <Text className="text-white text-lg mb-2">Dealer</Text>
      <View className="flex-row items-center justify-center">
        <View className="flex-row items-center justify-center">
          {dealerCards.map((card, index) => (
            <Image
              key={index}
              source={
                index === 1 && !showDealerCard
                  ? require("../../assets/image/card-back2.png") // Hide second card
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
  );
}
