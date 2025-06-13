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

// Add this near the top of your PlaySound.js file
let backgroundMusicSound = null; // Store reference to background music

// Modify your playBackgroundMusic function to store the reference
export const playBackgroundMusic = async (volume = 0.01) => {
  try {
    // If we already have background music playing, adjust volume instead of creating a new one
    if (backgroundMusicSound) {
      await backgroundMusicSound.setVolumeAsync(volume);

      // If volume is 0, pause the sound
      if (volume <= 0) {
        await backgroundMusicSound.pauseAsync();
      } else {
        // Make sure it's playing if it was paused
        const status = await backgroundMusicSound.getStatusAsync();
        if (!status.isPlaying) {
          await backgroundMusicSound.playAsync();
        }
      }
      return backgroundMusicSound;
    }

    // Create new sound object if we don't have one
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/sounds/bg-sound.mp3"),
      {
        isLooping: true,
        volume: volume,
        shouldPlay: volume > 0, // Only auto-play if volume > 0
      }
    );

    // Store reference
    backgroundMusicSound = sound;

    // Don't unload automatically - we'll manage this separately
    return sound;
  } catch (error) {
    console.error("Error playing background music", error);
    return null;
  }
};

// Add these new functions for controlling background music

// Pause background music
export const pauseBackgroundMusic = async () => {
  try {
    if (backgroundMusicSound) {
      await backgroundMusicSound.pauseAsync();
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error pausing background music", error);
    return false;
  }
};

// Resume background music
export const resumeBackgroundMusic = async () => {
  try {
    if (backgroundMusicSound) {
      await backgroundMusicSound.playAsync();
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error resuming background music", error);
    return false;
  }
};

// Stop and unload background music
export const stopBackgroundMusic = async () => {
  try {
    if (backgroundMusicSound) {
      await backgroundMusicSound.stopAsync();
      await backgroundMusicSound.unloadAsync();
      backgroundMusicSound = null;
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error stopping background music", error);
    return false;
  }
};

// Adjust volume of background music
export const setBackgroundMusicVolume = async (volume) => {
  try {
    if (backgroundMusicSound) {
      await backgroundMusicSound.setVolumeAsync(volume);
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error setting background music volume", error);
    return false;
  }
};

// // For background music with volume control
// export const playBackgroundMusic = async (volume = 0.01) => {
//   try {
//     const { sound } = await Audio.Sound.createAsync(
//       require("../assets/sounds/bg-sound.mp3"),
//       {
//         isLooping: true, // Make the background music loop continuously
//         volume: volume, // Set lower volume (0.0 to 1.0)
//         shouldPlay: true, // Auto-play when loaded
//       }
//     );

//     // Don't unload automatically - we'll manage this separately
//     return sound;
//   } catch (error) {
//     console.error("Error playing background music", error);
//     return null;
//   }
// };
