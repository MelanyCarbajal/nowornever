import React, { useContext } from "react";
import { View } from "react-native";
import { ThemeContext } from "../context/ThemeContext";

export default function Card({ children, style = {} }) {
  const { theme } = useContext(ThemeContext);

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: theme.card },
        style
      ]}
    >
      {children}
    </View>
  );
}

const styles = {
  card: {
    width: "100%",
    padding: 24,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3
  }
};