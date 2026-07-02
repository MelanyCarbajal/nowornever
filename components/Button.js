import React, { useContext } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { ThemeContext } from "../context/ThemeContext";

export default function Button({
  title,
  onPress,
  variant = "primary",
  disabled = false,
  style = {}
}) {
  const { theme } = useContext(ThemeContext);

  const buttonStyle = [
    styles.button,
    { backgroundColor: theme.primary },
    variant === "danger" && { backgroundColor: theme.danger },
    variant === "outline" && { backgroundColor: "transparent", borderColor: theme.primary, borderWidth: 1 },
    disabled && { backgroundColor: theme.textSecondary, opacity: 0.7 },
    style
  ];

  const textStyle = [
    styles.text,
    variant === "outline" && { color: theme.primary },
  ];

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled}
      style={buttonStyle}
    >
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
