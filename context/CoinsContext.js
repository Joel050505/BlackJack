import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CoinsContext = createContext();

export const CoinsProvider = ({ children }) => {
  const [coins, setCoins] = useState(100); // Start with 2500 coins
  const [loading, setLoading] = useState(true);

  // Load coins from AsyncStorage when the component mounts
  useEffect(() => {
    const loadCoins = async () => {
      try {
        const storedCoins = await AsyncStorage.getItem("userCoins"); // Changed from "coins" to "userCoins"
        if (storedCoins !== null) {
          setCoins(parseInt(storedCoins, 10));
        }
      } catch (error) {
        console.error("Failed to load coins from storage:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCoins();
  }, []);

  // Save coins to storage whenever they change
  useEffect(() => {
    const saveCoins = async () => {
      try {
        await AsyncStorage.setItem("userCoins", coins.toString());
      } catch (error) {
        console.error("Failed to save coins to storage", error);
      }
    };

    if (!loading) {
      saveCoins();
    }
  }, [coins, loading]);

  // Functions to modify coins
  const addCoins = (amount) => {
    setCoins((currentCoins) => currentCoins + amount);
  };

  // Function to update coins directly
  const updateCoins = (newAmount) => {
    setCoins(newAmount);
  };

  const subtractCoins = (amount) => {
    setCoins((prev) => prev - amount);
  };

  return (
    <CoinsContext.Provider
      value={{
        coins,
        addCoins,
        updateCoins,
        loading,
        subtractCoins,
      }}
    >
      {children}
    </CoinsContext.Provider>
  );
};

// Custom hook to use the coins context
export const useCoins = () => {
  const context = useContext(CoinsContext);
  if (context === undefined) {
    throw new Error("useCoins must be used within a CoinsProvider");
  }
  return context;
};

export default CoinsContext;
