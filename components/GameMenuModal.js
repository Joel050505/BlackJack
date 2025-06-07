import React from "react";
import {Text, View, Modal, TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";

export default function GameMenuModal({visible, onClose, onBackToMenu}) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/60">
        <View className="bg-gray-800 rounded-xl p-6 w-4/5 items-center">
          {/* Close button */}
          <TouchableOpacity
            className="absolute right-3 top-3"
            onPress={onClose}
          >
            <Ionicons name="close-circle" size={28} color="white" />
          </TouchableOpacity>

          <Text className="text-white text-xl font-bold mb-8 mt-4">
            Game Settings
          </Text>

          {/* Continue playing button */}
          <TouchableOpacity
            className="bg-green-700 py-2 rounded-lg mb-4 w-full items-center"
            onPress={onClose}
          >
            <View className="flex-row items-center justify-center">
              <Text className="text-white font-bold text-lg ml-2">
                Continue Playing
              </Text>
            </View>
          </TouchableOpacity>

          {/* Back to main menu button */}
          <TouchableOpacity
            className="bg-red-600 py-2 rounded-lg mb-4 w-full items-center"
            onPress={onBackToMenu}
          >
            <View className="flex-row items-center justify-center">
              <Ionicons name="arrow-back" size={24} color="white" />
              <Text className="text-white font-bold text-lg ml-2">
                Back to Home
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
