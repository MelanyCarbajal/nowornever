import React from "react";
import { TouchableOpacity, Text } from "react-native";

export default function Button({ title, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={styles.button}
    >
      <Text style={styles.text}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = {
  button: {
    backgroundColor: "#6D28D9", 
    padding: 15,
    borderRadius: 14,
    alignItems: "center",

    shadowColor: "#6D28D9",
    shadowOpacity: 0.4,
    shadowRadius: 8,

  },

  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15
  }
};