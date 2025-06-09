import {
  Text,
  View,
  ImageBackground,
  Animated,
  TouchableOpacity,
} from "react-native";
import { useEffect, useRef } from "react";
import { StatusBar } from "expo-status-bar";

export default function HomeScreen({ navigation }) {
  // Animation value for bouncing text
  const bounceAnim = useRef(new Animated.Value(0)).current;

  // Setting up the bounce animation
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -15,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <ImageBackground
      source={require("../assets/image/wooden-texture.jpg")}
      className="flex-1 w-full h-full"
      resizeMode="cover"
    >
      <Animated.View
        className="flex-1 items-center justify-center"
        style={{
          transform: [{ translateY: bounceAnim }],
        }}
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
          onPress={() => navigation.navigate("Game")}
        >
          <Text className="text-white font-bold text-base text-center p-2.5">
            Start Game
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </ImageBackground>
  );
}
