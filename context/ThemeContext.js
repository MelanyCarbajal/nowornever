import React, { createContext, useState, useEffect } from "react";
import { useColorScheme } from "react-native";

export const ThemeContext = createContext();

export const lightTheme = {
  mode: "light",
  background: "#F3F4F6", 
  card: "#FFFFFF",
  text: "#111827", 
  textSecondary: "#4B5563",
  primary: "#4F46E5", 
  danger: "#EF4444",
  success: "#10B981",
  warning: "#F59E0B",
  border: "#E5E7EB",
  inputBackground: "#F9FAFB",
};

export const darkTheme = {
  mode: "dark",
  background: "#111827", 
  card: "#1F2937",
  text: "#F9FAFB",
  textSecondary: "#9CA3AF",
  primary: "#6366F1", 
  danger: "#FB7185",
  success: "#34D399",
  warning: "#FBBF24",
  border: "#334155",
  inputBackground: "#0F172A", 
};

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme();

  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === "dark");

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
