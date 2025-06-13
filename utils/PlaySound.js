import { Audio } from "expo-av";

// Function that can be imported and used anywhere
export const playSound = async (soundFile) => {
  try {
    const { sound } = await Audio.Sound.createAsync(soundFile);
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
// For card dealing sound
export const PlayAllInSound = () => {
  return playSound(require("../assets/sounds/allinpush_chips.mp3"));
};

// For card dealing sound
export const playCardDealSound = () => {
  return playSound(require("../assets/sounds/card-sound.mp3"));
};

// For winning sound
export const winningSound = () => {
  return playSound(require("../assets/sounds/winning-sound.mp3"));
};
// For losing sound
export const losingSound = () => {
  return playSound(require("../assets/sounds/gameover-sound.mp3"));
};
// For kaching sound
export const kachingSound = () => {
  return playSound(require("../assets/sounds/coin-recieved.mp3"));
};

// For background music with volume control
export const playBackgroundMusic = async (volume = 0.01) => {
  try {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/sounds/bg-sound.mp3"),
      {
        isLooping: true, // Make the background music loop continuously
        volume: volume, // Set lower volume (0.0 to 1.0)
        shouldPlay: true, // Auto-play when loaded
      }
    );

    // Don't unload automatically - we'll manage this separately
    return sound;
  } catch (error) {
    console.error("Error playing background music", error);
    return null;
  }
};
