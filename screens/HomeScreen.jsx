import { Text, View, ImageBackground, TouchableOpacity } from "react-native";
import { useEffect, useRef } from "react";
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
          <Text className="text-green-600 text-4xl font-bold text-center mb-1 tracking-wider">
            Welcome To
          </Text>
          <Text className="text-yellow-400 text-6xl font-bold text-center mb-1 tracking-wide">
            Black Jack
          </Text>
          <Text className="text-red-500 text-5xl font-bold text-center italic">
            Bonus Fiesta
          </Text>
        </View>
        <StatusBar style="light" />
        <TouchableOpacity
          className="bg-black px-5 py-2.5 rounded-xl mt-5 items-center"
          onPress={() => {
            navigation.navigate("Game");
            Audio.setIsEnabledAsync(true);
            playBackgroundMusic(0.01);
          }}
        >
          <Text className="text-white font-bold text-base text-center p-2.5">
            Start Game
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </ImageBackground>
  );
}
