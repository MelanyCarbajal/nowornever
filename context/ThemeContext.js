import React, { createContext, useState, useEffect } from "react";
import { useColorScheme } from "react-native";

export const ThemeContext = createContext();

export const lightTheme = {
  mode: "light",
  background: "#F3F4F6", // Fondo gris claro muy premium, tipo Notion/Linear
  card: "#FFFFFF",
  text: "#111827", // Texto profundo casi negro para máxima legibilidad
  textSecondary: "#4B5563",
  primary: "#4F46E5", // Azul Indigo formal y muy profesional
  danger: "#EF4444",
  success: "#10B981",
  warning: "#F59E0B",
  border: "#E5E7EB",
  inputBackground: "#F9FAFB",
};

export const darkTheme = {
  mode: "dark",
  background: "#111827", // Gris oscuro súper profundo y limpio
  card: "#1F2937",
  text: "#F9FAFB",
  textSecondary: "#9CA3AF",
  primary: "#6366F1", // Azul indigo más suave para contraste en oscuro

  danger: "#FB7185",
  success: "#34D399",
  warning: "#FBBF24",
  border: "#334155",
  inputBackground: "#0F172A", // or slightly lighter #1E293B
};

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme();
  
  // By default, match system, but allow override
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === "dark");

  // Optional: Listen to system changes if we want to force it
  // useEffect(() => {
  //   setIsDarkMode(systemColorScheme === "dark");
  // }, [systemColorScheme]);

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
