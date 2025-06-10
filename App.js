import "./global.css";
import {useState} from "react";
import {View, ActivityIndicator, Animated, LogBox} from "react-native";
import HomeScreen from "./screens/HomeScreen";
import GameScreen from "./screens/GameScreen";
import {CoinsProvider} from "./context/CoinsContext";

function App() {
  const [currentScreen, setCurrentScreen] = useState("Home");
  const [isLoading, setIsLoading] = useState(false);
  const fadeAnim = useState(new Animated.Value(1))[0]; // Animeringsvärde för fade-in/fade-out

  // Navigeringsfunktioner
  function navigate(screenName) {
    // Undvik onödig navigering
    if (currentScreen === screenName) return;

    // Visa laddningsindikator
    setIsLoading(true);

    // Fade ut aktuell skärm
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      // Byt skärm
      setCurrentScreen(screenName);

      // Kort väntetid för laddningsanimation
      setTimeout(() => {
        // Fade in ny skärm
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }).start(() => {
          setIsLoading(false);
        });
      }, 800);
    });
  }

  // Navigation-objekt som skickas till skärmarna
  const navigation = {
    navigate: navigate,
    goBack: () => navigate("Home"),
  };

  return (
    <CoinsProvider>
      <View className="flex-1 bg-black">
        {/* Laddningsindikator */}
        {isLoading && (
          <View className="absolute w-full h-full justify-center items-center bg-black z-10">
            <ActivityIndicator size="large" color="#FFC107" />
          </View>
        )}

        {/* Skärmcontainer med opacity-animation */}
        <Animated.View className="flex-1" style={{opacity: fadeAnim}}>
          {currentScreen === "Home" && <HomeScreen navigation={navigation} />}
          {currentScreen === "Game" && <GameScreen navigation={navigation} />}
        </Animated.View>
      </View>
    </CoinsProvider>
  );
}

export default App;
