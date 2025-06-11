import {TouchableOpacity, View, Text} from "react-native";

export default function BettingChip({
  value,
  color,
  borderColor,
  dashedColor,
  onPress,
  disabled,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={{
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: disabled ? `${color}30` : color,
        borderWidth: 3,
        borderColor: disabled ? `${borderColor}30` : borderColor,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: disabled ? 0.1 : 0.3,
        shadowRadius: 5,
        elevation: disabled ? 2 : 6,
      }}
    >
      <View
        style={{
          position: "absolute",
          width: 60,
          height: 60,
          borderRadius: 30,
          borderWidth: 1,
          borderColor: disabled ? `${dashedColor}30` : dashedColor,
          borderStyle: "dashed",
        }}
      />
      <Text
        style={{
          color: disabled ? "rgba(255, 255, 255, 0.5)" : "white",
          fontSize: 16,
          fontWeight: "bold",
          textShadowColor: "rgba(0, 0, 0, 0.5)",
          textShadowOffset: {width: 1, height: 1},
          textShadowRadius: 2,
        }}
      >
        {value}
      </Text>
    </TouchableOpacity>
  );
}
