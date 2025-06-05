import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ImageBackground } from "react-native";

export default function App() {
  return (
    <ImageBackground
      source={require("./assets/9999520.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.text}>Welcome to Black Jack bonus fiesta</Text>
        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // Removed backgroundColor: "#fff"
  },
  text: {
    color: "white",
    fontSize: 40,
    textAlign: "center",
    fontWeight: "bold",
    padding: 20,
    position: "absolute",
    top: "14%",
  },
});
