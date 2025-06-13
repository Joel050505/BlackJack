import {useState, useEffect} from "react";
import {View, Text, Animated, Easing} from "react-native";

export default function DealerHand({dealerCards, showDealerCard, dealerScore}) {
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
          useNativeDriver: false,
          easing: Easing.out(Easing.ease),
        }).start();
      }
    });

    // Uppdatera animations-arrayen
    setAnimations(newAnimations);
  }, [dealerCards]); // Kör endast när dealerCards ändras

  // Get visible dealer score (hide second card value until revealed)
  const getVisibleDealerScore = () => {
    if (!showDealerCard && dealerCards.length > 0) {
      // Only show first card value
      const firstCard = dealerCards[0];
      if (firstCard.value === 1) return 11; // Ace
      if (firstCard.value > 10) return 10; // Face card
      return firstCard.value;
    }
    return dealerScore;
  };

  return (
    <View className="items-center justify-center w-full mb-4">
      {/* Poäng */}
      <Text className="text-white text-lg font-semibold bg-black/50 px-3 py-1 rounded-lg mb-2">
        Dealer: {getVisibleDealerScore(dealerScore)}
      </Text>

      {/* Korten */}
      <View className="h-[230] w-[200] relative">
        {dealerCards.map((card, index) => (
          <Animated.Image
            key={index}
            source={
              // Om det är andra kortet och vi inte ska visa det, visa baksidan
              index === 1 && !showDealerCard
                ? require("../../assets/image/card-back2.png")
                : card?.image
            }
            className="w-[176] h-[224] m-1 absolute"
            style={{
              left: index * 30, // Dynamiskt värde, måste vara i style
              transform: [{translateX: animations[index] || 0}], // Animation måste vara i style
              zIndex: index, // Dynamiskt värde, måste vara i style
            }}
            resizeMode="contain"
          />
        ))}
      </View>
    </View>
  );
}
