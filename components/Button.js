import React from "react";
import { TouchableOpacity, Text } from "react-native";

export default function Button({
  title,
  onPress,
  variant = "primary", 
  disabled = false
}) {

  const getBackground = () => {
    if (disabled) return "#9CA3AF";

    switch (variant) {
      case "danger":
        return "#EF4444";
      case "outline":
        return "transparent";
      default:
        return "#2563EB"; 
    }
  };

  const getTextColor = () => {
    if (variant === "outline") return "#2563EB";
    return "white";
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
      style={[
        styles.button,
        {
          backgroundColor: getBackground(),
          borderWidth: variant === "outline" ? 1 : 0,
          borderColor: "#2563EB",
          opacity: disabled ? 0.7 : 1
        }
      ]}
    >
      <Text style={[styles.text, { color: getTextColor() }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = {
  button: {
    padding: 15,
    borderRadius: 14,
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3
  },

  text: {
    fontWeight: "bold",
    fontSize: 15
  }
};