import * as React from "react";
import "./global.css"; // Import global styles
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import GameScreen from "./screens/GameScreen";
import { CoinsProvider } from "./context/CoinsContext"; // Import CoinsContext

const Stack = createStackNavigator();

function App() {
  return (
    <CoinsProvider>
      {/* Wrap the app with CoinsProvider to provide coin context */}
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Game" component={GameScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </CoinsProvider>
  );
}

export default App;
