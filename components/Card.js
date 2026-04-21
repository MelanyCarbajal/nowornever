import React from "react";
import { View } from "react-native";

export default function Card({ children }) {
  return (
    <View style={{
      width: "100%",
      backgroundColor: "#151B2C",
      padding: 20,
      borderRadius: 18,
      shadowColor: "#000",
      shadowOpacity: 0.3,
      shadowRadius: 10,
      elevation: 8
    }}>
      {children}
    </View>
  );
}