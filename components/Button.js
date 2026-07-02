import React from "react";

import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function Button({
  title,
  onPress,
  variant = "primary",
  disabled = false,
}) {
 
  const buttonStyle = [
    styles.button,

    variant === "danger" && styles.dangerButton,

    variant === "outline" && styles.outlineButton,

    disabled && styles.disabledButton,
  ];

  const textStyle = [styles.text, variant === "outline" && styles.outlineText];

  return (
    <TouchableOpacity
      activeOpacity={0.85}
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
    backgroundColor: "#2563EB",

    paddingVertical: 15,
    paddingHorizontal: 20,

    borderRadius: 14,

    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,

    elevation: 3,
  },

  dangerButton: {
    backgroundColor: "#EF4444",
  },

  outlineButton: {
    backgroundColor: "transparent",

    borderWidth: 1,
    borderColor: "#2563EB",
  },

  disabledButton: {
    backgroundColor: "#9CA3AF",
    opacity: 0.7,
  },

  text: {
    color: "#FFFFFF",

    fontSize: 15,
    fontWeight: "bold",
  },

  outlineText: {
    color: "#2563EB",
  },
});
