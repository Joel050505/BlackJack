// import {View, Text, Image} from "react-native";

// export default function PlayerHand({playerCards, playerScore, isBlackjack}) {
//   return (
//     <View className="items-center justify-center w-full mb-4">
//       <Text className="text-white text-lg mb-2">Player</Text>
//       <View className="flex-row items-center justify-center">
//         <View className="flex-row items-center justify-center">
//           {playerCards.map((card, index) => (
//             <Image
//               key={index}
//               source={card?.image}
//               className="w-44 h-56 mx-1"
//               style={{marginLeft: index > 0 ? -131 : 0}}
//               resizeMode="contain"
//             />
//           ))}
//         </View>
//         <View>
//           <Text className="text-white text-xl mt-2 bg-black/50 px-3 py-1 rounded">
//             {playerScore}
//             {isBlackjack(playerCards, playerScore)}
//           </Text>
//         </View>
//       </View>
//     </View>
//   );
// }

import React, {useState, useEffect} from "react";
import {View, Text, Animated, Easing} from "react-native";

export default function PlayerHand({playerCards, playerScore}) {
  // Skapa animationsvärden för varje kort
  const [animations, setAnimations] = useState([]);

  // När playerCards uppdateras, skapa animationer för nya kort
  useEffect(() => {
    // Skapa en kopia av nuvarande animationer
    const newAnimations = [...animations];

    // För varje kort, kontrollera om det redan har en animation
    playerCards.forEach((card, index) => {
      // Om kortet inte har en animation än, skapa en
      if (!newAnimations[index]) {
        // Skapa animation som börjar utanför skärmen
        const anim = new Animated.Value(300);
        newAnimations[index] = anim;

        // Animera kortet till rätt position
        Animated.timing(anim, {
          toValue: 0, // Slutposition
          duration: 300, // Längd på animation
          delay: index * 200, // Fördröjning baserat på kortets position
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        }).start();
      }
    });

    // Uppdatera animations-arrayen
    setAnimations(newAnimations);
  }, [playerCards]); // Kör endast när playerCards ändras

  return (
    <View className="flex items-center justify-center w-full mb-4">
      {/* Korten */}
      <View className="h-[230] w-[200] relative mr-10">
        {playerCards.map((card, index) => (
          <Animated.Image
            key={index}
            source={card?.image}
            className="w-[176] h-[224] m-1 absolute"
            style={{
              left: index * 30,
              transform: [{translateX: animations[index] || 0}],
              zIndex: index,
            }}
            resizeMode="contain"
          />
        ))}
      </View>

      {/* Poäng */}
      <Text className="text-white text-lg font-semibold bg-black/50 px-3 py-1 mt-2 rounded-lg">
        {playerScore}
      </Text>
    </View>
  );
}
