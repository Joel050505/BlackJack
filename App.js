// import * as React from "react";
// import "./global.css"; // Import global styles
// import {NavigationContainer} from "@react-navigation/native";
// import {createStackNavigator} from "@react-navigation/stack";
// import HomeScreen from "./screens/HomeScreen";
// import GameScreen from "./screens/GameScreen";
// import {CoinsProvider} from "./context/CoinsContext"; // Import CoinsContext

// const Stack = createStackNavigator();

// function App() {
//   return (
//     <CoinsProvider>
//       {/* Wrap the app with CoinsProvider to provide coin context */}
//       <NavigationContainer>
//         <Stack.Navigator
//           initialRouteName="Home"
//           screenOptions={{headerShown: false}}
//         >
//           <Stack.Screen name="Home" component={HomeScreen} />
//           <Stack.Screen name="Game" component={GameScreen} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </CoinsProvider>
//   );
// }
import * as React from "react";
import {useState, useEffect} from "react";
import "./global.css"; // Import global styles
import {View, ActivityIndicator, Animated} from "react-native";
import HomeScreen from "./screens/HomeScreen";
import GameScreen from "./screens/GameScreen";
import {CoinsProvider} from "./context/CoinsContext"; // Import CoinsContext

function App() {
  const [currentScreen, setCurrentScreen] = useState("Home");
  const [isLoading, setIsLoading] = useState(false);
  const fadeAnim = useState(new Animated.Value(1))[0];

  // Hantera skärmbyten med en loading state
  const navigate = (screenName) => {
    if (currentScreen === screenName) return;

    setIsLoading(true);

    // Animera ut nuvarande skärm
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      // Byt skärm när utfadningen är klar
      setCurrentScreen(screenName);

      // 2 sekunders timeout för laddningsindikatorn
      setTimeout(() => {
        // Animera in den nya skärmen
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }).start(() => {
          setIsLoading(false);
        });
      }, 800); // laddningstid
    });
  };
  // Navigation props to pass to screens
  const navigation = {
    navigate: navigate,
    goBack: () => navigate("Home"),
  };

  return (
    <CoinsProvider>
      <View style={{flex: 1, backgroundColor: "#000"}}>
        {isLoading && (
          <View
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "black",
              zIndex: 10,
            }}
          >
            <ActivityIndicator size="large" color="#FFC107" />
          </View>
        )}

        <Animated.View style={{flex: 1, opacity: fadeAnim}}>
          {currentScreen === "Home" && <HomeScreen navigation={navigation} />}
          {currentScreen === "Game" && <GameScreen navigation={navigation} />}
        </Animated.View>
      </View>
    </CoinsProvider>
  );
}

export default App;
