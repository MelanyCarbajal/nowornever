import React from "react";
import { View, Text, TouchableOpacity, Image, useWindowDimensions } from "react-native";

export default function Header({ setScreen }) {

  const { width } = useWindowDimensions();
  const isSmall = width < 400;

  return (
    <View style={[
      styles.header,
      { flexDirection: isSmall ? "column" : "row" }
    ]}>

      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/logo.png")}
          style={styles.logoImage}
        />
        <Text style={styles.logo}>NOWORNEVER</Text>
      </View>

      <View style={[
        styles.nav,
        { flexDirection: isSmall ? "column" : "row" }
      ]}>

        <NavItem text="Inicio" onPress={() => setScreen("inicio")} />
        <NavItem text="Home" onPress={() => setScreen("home")} />
        <NavItem text="Perfil" onPress={() => setScreen("perfil")} />

        <TouchableOpacity
          style={styles.logout}
          onPress={() => setScreen("login")}
        >
          <Text style={styles.logoutText}>Salir</Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}

function NavItem({ text, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.navItem}>
      <Text style={styles.navText}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = {
  header: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 15,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10
  },

  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },

 logoImage: {
  width: 100,
  height: 100
},

  logo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827"
  },

  nav: {
    alignItems: "center",
    gap: 10
  },

  navItem: {
    paddingVertical: 6,
    paddingHorizontal: 10
  },

  navText: {
    color: "#374151",
    fontSize: 14
  },

  logout: {
    backgroundColor: "#FEE2E2",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12
  },

  logoutText: {
    color: "#EF4444",
    fontWeight: "bold"
  }
};