import React, { useState } from "react";
import {View,Text,TouchableOpacity, Image,useWindowDimensions,StyleSheet,} from "react-native";

export default function Header({ navigation }) {
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 400;
  const logoSize = isSmallScreen ? 40 : 55;

  const handleLogout = () => {

    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* LOGO */}
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/logo.png")}
            style={{
              width: logoSize,
              height: logoSize,
            }}
            resizeMode="contain"
          />

          <Text style={styles.logoText}>NOWORNEVER</Text>
        </View>

        {/* BOTÓN CERRAR SESIÓN */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",

    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },

  header: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    paddingHorizontal: 18,
    paddingVertical: 14,
  },

  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  logoText: {
    marginLeft: 10,

    fontSize: 18,

    fontWeight: "bold",

    color: "#111827",
  },

  logoutButton: {
    backgroundColor: "#FEE2E2",

    paddingVertical: 10,
    paddingHorizontal: 16,

    borderRadius: 10,

    alignItems: "center",
  },

  logoutText: {
    color: "#DC2626",

    fontWeight: "bold",
    fontSize: 14,
  },
});
