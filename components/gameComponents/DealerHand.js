// import {View, Text, Image} from "react-native";

// // const cardBackImage = require("../../assets/image/card-back2.png");
// // const cardBackImage = require("../assets/image/card-back2.png");
// export default function DealerHand({
//   dealerCards,
//   showDealerCard,
//   getVisibleDealerScore,
//   dealerScore,
// }) {
//   return (
//     <View className="items-center justify-center w-full mb-4">
//       <Text className="text-white text-lg mb-2">Dealer</Text>
//       <View className="flex-row items-center justify-center">
//         <View className="flex-row items-center justify-center">
//           {dealerCards.map((card, index) => (
//             <Image
//               key={index}
//               source={
//                 index === 1 && !showDealerCard
//                   ? require("../../assets/image/card-back2.png") // Hide second card
//                   : card?.image
//               }
//               className="w-44 h-56 mx-1"
//               style={{
//                 marginLeft: index > 0 ? -130 : 0,
//               }}
//               resizeMode="contain"
//             />
//           ))}
//         </View>

//         <View>
//           <Text className="text-white text-xl mt-2 bg-black/50 px-3 py-1 rounded">
//             {getVisibleDealerScore()}
//             {dealerScore > 21 && showDealerCard}
//           </Text>
//         </View>
//       </View>
//     </View>
//   );
// }
import React, {useState, useEffect} from "react";
import {View, Text, Animated, Easing} from "react-native";

export default function DealerHand({
  dealerCards,
  showDealerCard,
  getVisibleDealerScore,
  dealerScore,
}) {
  // Skapa animationsvärden för varje kort
  const [animations, setAnimations] = useState([]);

  // När dealerCards uppdateras, skapa animationer för nya kort
  useEffect(() => {
    // Skapa en kopia av nuvarande animationer
    const newAnimations = [...animations];

    // För varje kort, kontrollera om det redan har en animation
    dealerCards.forEach((card, index) => {
      // Om kortet inte har en animation än, skapa en
      if (!newAnimations[index]) {
        // Skapa animation som börjar utanför skärmen
        const anim = new Animated.Value(300);
        newAnimations[index] = anim;

        // Animera kortet till rätt position
        Animated.timing(anim, {
          toValue: 0, // Slutposition
          duration: 500, // Längd på animation
          delay: index * 200, // Fördröjning baserat på kortets position
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        }).start();
      }
    });

    // Uppdatera animations-arrayen
    setAnimations(newAnimations);
  }, [dealerCards]); // Kör endast när dealerCards ändras

  return (
    <View className="items-center justify-center  w-full mb-4">
      {/* Poäng */}
      <Text className="text-white text-lg font-semibold bg-black/50 px-3 py-1 rounded-lg mb-2">
        {dealerScore}
      </Text>

      <View className="flex-row items-center justify-center gap-10">
        {/* Korten */}
        <View style={{height: 230, width: 200, position: "relative"}}>
          {dealerCards.map((card, index) => (
            <Animated.Image
              key={index}
              source={
                // Om det är andra kortet och vi inte ska visa det, visa baksidan
                index === 1 && !showDealerCard
                  ? require("../../assets/image/card-back2.png")
                  : card?.image
              }
              style={{
                width: 176, // Kortbredd
                height: 224, // Korthöjd
                margin: 4,
                position: "absolute",
                left: index * 30, // Varje kort läggs lite till höger
                transform: [{translateX: animations[index] || 0}],
                zIndex: index, // Senare kort hamnar överst
              }}
              resizeMode="contain"
            />
          ))}
        </View>
      </View>
    </View>
  );
}
