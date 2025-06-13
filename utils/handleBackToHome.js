import {Alert} from "react-native";

export function handleBackToHome(setModalVisible, navigation) {
  // Stänger modalen
  setModalVisible(false);

  Alert.alert(
    "Leave Game?",
    "Are you sure you want to leave the game? Your progress will be lost.",
    [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => navigation.navigate("Home"),
      },
    ]
  );
}
