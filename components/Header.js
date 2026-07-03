import React, { useContext } from "react";
import { View, Text, TouchableOpacity, Image, useWindowDimensions, StyleSheet } from "react-native";
import { ThemeContext } from "../context/ThemeContext";

export default function Header({ navigation }) {
  const { width } = useWindowDimensions();
  const { theme } = useContext(ThemeContext);
  const isSmallScreen = width < 400;
  const logoSize = isSmallScreen ? 40 : 50;

  const handleLogout = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.card, borderBottomColor: theme.border }]}>
      <View style={styles.header}>
        {/* LOGO */}
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/logo.png")}
            style={{ width: logoSize, height: logoSize }}
            resizeMode="contain"
          />
          <Text style={[styles.logoText, { color: theme.text }]}>NOWORNEVER</Text>
        </View>

        {/* BOTÓN CERRAR SESIÓN */}
        {/* <TouchableOpacity 
          style={[styles.logoutButton, { backgroundColor: theme.danger + "20" }]} 
          onPress={handleLogout}
        >
          <Text style={[styles.logoutText, { color: theme.danger }]}>Salir</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoText: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  logoutButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  logoutText: {
    fontWeight: "bold",
    fontSize: 14,
  },
});
