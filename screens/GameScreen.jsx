import React from "react";
import {
  Text,
  View,
  ImageBackground,
  Animated,
  TouchableOpacity,
} from "react-native";
import styles from "../styles";

export default function GameScreen({navigation}) {
  return (
    <ImageBackground
      source={require("../assets/image/board.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View>
        <TouchableOpacity
          style={styles.Button}
          onPress={() => navigation.navigate("Home")}
        >
          <Text>Back</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
