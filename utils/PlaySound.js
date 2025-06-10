import React, {useState} from "react";
import {Audio} from "expo-av";

// Function that can be imported and used anywhere
export const playSound = async (soundFile) => {
  try {
    const {sound} = await Audio.Sound.createAsync(soundFile);
    await sound.playAsync();

    // Unload when finished to free memory
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) {
        sound.unloadAsync();
      }
    });

    return sound;
  } catch (error) {
    console.error("Error playing sound", error);
    return null;
  }
};

// For poker chips specifically
export const playPokerChipSound = () => {
  return playSound(require("../assets/sounds/poker_chips.mp3"));
};

export const PlayAllInSound = () => {
  return playSound(require("../assets/sounds/allinpush_chips.mp3"));
};
