import React from "react";
import {Text, View, ImageBackground, TouchableOpacity} from "react-native";

export default function GameScreen({navigation}) {
  return (
    <ImageBackground
      source={require("../assets/image/board.jpg")}
      className="flex-1 w-full h-full"
      resizeMode="cover"
    >
      <View className="flex-1 items-center justify-center">
        <TouchableOpacity
          className="bg-black px-5 py-2.5 rounded-xl items-center"
          onPress={() => navigation.navigate("Home")}
        >
          <Text className="text-white font-bold text-base text-center p-2.5">
            Back
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
