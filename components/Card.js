import React from "react";
import { View } from "react-native";

export default function Card({ children, variant = "default", style = {} }) {

  const getBackground = () => {
    switch (variant) {
      case "dark":
        return "#111827";
      default:
        return "#FFFFFF";
    }
  };

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: getBackground() },
        style // 🔥 permite personalizar desde afuera
      ]}
    >
      {children}
    </View>
  );
}

const styles = {
  card: {
    width: "100%",
    padding: 20,
    borderRadius: 18,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3
  }
};