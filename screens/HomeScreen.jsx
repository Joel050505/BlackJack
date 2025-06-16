import { Text, View, ImageBackground, TouchableOpacity } from "react-native";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { playBackgroundMusic } from "../utils/PlaySound";
import { Audio } from "expo-av";

export default function HomeScreen({ navigation }) {
  // Använd useSharedValue istället för Animated.Value
  const bounceAnim = useSharedValue(0);

  // Skapa en animerad stil
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: bounceAnim.value }],
    };
  });

  // Konfigurera animationen med Reanimated
  useEffect(() => {
    bounceAnim.value = withRepeat(
      withSequence(
        withTiming(-15, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 800, easing: Easing.inOut(Easing.ease) })
      ),
      -1 // -1 betyder oändlig upprepning
    );
  }, []);

  return (
    <ImageBackground
      source={require("../assets/image/wooden-texture.jpg")}
      className="flex-1 w-full h-full"
      resizeMode="cover"
    >
      <Animated.View
        className="flex-1 items-center justify-center"
        style={animatedStyle}
      >
        <View className="items-center">
          {/* Enhanced text with subtle shadows and better spacing */}
          <Text
            className="text-green-500 text-4xl font-bold text-center mb-2 tracking-wider"
            style={{
              textShadowColor: "rgba(0, 0, 0, 0.7)",
              textShadowOffset: { width: 2, height: 2 },
              textShadowRadius: 4,
            }}
          >
            Welcome To
          </Text>
          <Text
            className="text-yellow-400 text-6xl font-bold text-center mb-2 tracking-wide"
            style={{
              textShadowColor: "rgba(0, 0, 0, 0.8)",
              textShadowOffset: { width: 3, height: 3 },
              textShadowRadius: 6,
            }}
          >
            Black Jack
          </Text>
          <Text
            className="text-red-500 text-5xl font-bold text-center italic mb-4"
            style={{
              textShadowColor: "rgba(0, 0, 0, 0.7)",
              textShadowOffset: { width: 2, height: 2 },
              textShadowRadius: 5,
            }}
          >
            Bonus Fiesta
          </Text>
        </View>

        <StatusBar style="light" />

        {/* Enhanced button with gradient-like effect and better styling */}
        <TouchableOpacity
          className="bg-gray-900 px-8 py-4 rounded-2xl mt-6 items-center border-2 border-yellow-500"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 8,
          }}
          onPress={() => {
            navigation.navigate("Game");
            Audio.setIsEnabledAsync(true);
            playBackgroundMusic(0.01);
          }}
        >
          <Text
            className="text-yellow-400 font-bold text-xl text-center p-4 tracking-wide"
            style={{
              textShadowColor: "rgba(0, 0, 0, 0.5)",
              textShadowOffset: { width: 1, height: 1 },
              textShadowRadius: 2,
            }}
          >
            START GAME
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </ImageBackground>
  );
}
