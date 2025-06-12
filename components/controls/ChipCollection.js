import {View} from "react-native";
import BettingChip from "./BettingChip";
import {playPokerChipSound} from "../../utils/PlaySound";

export default function ChipCollection({
  coins,
  addBet,
  currentBet,
  setShopModalVisible,
}) {
  return (
    <View className="flex-row justify-center items-center mb-6 gap-4">
      <BettingChip
        value="25"
        color="#2E7D32"
        borderColor="#4CAF50"
        dashedColor="#66BB6A"
        onPress={() => {
          addBet(25);
          playPokerChipSound();
        }}
        disabled={coins < 25 || currentBet + 25 > coins}
      />

      <BettingChip
        value="50"
        color="#1565C0"
        borderColor="#2196F3"
        dashedColor="#64B5F6"
        onPress={() => {
          addBet(50);
          playPokerChipSound();
        }}
        disabled={coins < 50 || currentBet + 50 > coins}
      />

      <BettingChip
        value="100"
        color="#E65100"
        borderColor="#FF9800"
        dashedColor="#FFB74D"
        onPress={() => {
          addBet(100);
          playPokerChipSound();
        }}
        disabled={coins < 100 || currentBet + 100 > coins}
      />

      <BettingChip
        value="Buy"
        color="#800080"
        borderColor="#800080"
        dashedColor="#FFB74D"
        onPress={() => setShopModalVisible(true)}
        disabled={false}
      />
    </View>
  );
}
