import React from "react";
import {Text, View, Modal, TouchableOpacity, ScrollView} from "react-native";
import {Ionicons} from "@expo/vector-icons";

export default function ShopMenuModal({visible, onClose}) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/70">
        <View className="bg-gray-800 rounded-xl p-6 w-10/12 h-3/4 items-center">
          {/* Close button */}
          <TouchableOpacity
            className="absolute right-3 top-3 z-10"
            onPress={onClose}
          >
            <Ionicons name="close-circle" size={28} color="white" />
          </TouchableOpacity>

          <Text className="text-yellow-400 text-2xl font-bold mb-6 mt-2">
            Bonus Shop
          </Text>

          <ScrollView className="w-full">
            <View className="space-y-4 w-full">
              {/* Free chips */}
              <View className="bg-gray-700 rounded-xl p-4 flex-row justify-between items-center">
                <View>
                  <Text className="text-white font-bold text-lg">
                    Free Coins
                  </Text>
                  <Text className="text-green-400">250 coins</Text>
                </View>
                <TouchableOpacity
                  className="bg-green-600 px-4 py-2 rounded-lg"
                  onPress={() => {}}
                >
                  <Text className="text-white font-bold">FREE</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>

          <TouchableOpacity
            className="bg-gray-600 py-3 px-8 rounded-lg mt-4"
            onPress={onClose}
          >
            <Text className="text-white font-bold">Return to Game</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
