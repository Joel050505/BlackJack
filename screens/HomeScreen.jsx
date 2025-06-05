import {
  Text,
  View,
  ImageBackground,
  Animated,
  TouchableOpacity,
} from "react-native";
import styles from "../styles";
import {useEffect, useRef} from "react";
import {StatusBar} from "expo-status-bar";

export default function HomeScreen({navigation}) {
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
      style={styles.background}
      resizeMode="cover"
    >
      <Animated.View
        style={[
          styles.titleText,
          styles.container,
          {transform: [{translateY: bounceAnim}]},
        ]}
      >
        <Text style={styles.titleText}>
          Welcome To{"\n"}Black Jack{"\n"}Bonus Fiesta
        </Text>
        <StatusBar style="light" />
        <TouchableOpacity
          style={styles.Button}
          onPress={() => navigation.navigate("Game")}
        >
          <Text style={styles.text}>Start Game</Text>
        </TouchableOpacity>
      </Animated.View>
    </ImageBackground>
  );
}
