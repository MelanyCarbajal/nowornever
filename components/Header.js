import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function Header({ setScreen }) {
  return (
    <View style={styles.header}>

      {/* Logo de la app */}
      <Text style={styles.logo}>
        NOWORNEVER
      </Text>

      {/* Navegación */}
      <View style={styles.nav}>

        <TouchableOpacity
          style={styles.item}
          onPress={() => setScreen("inicio")}
        >
          <Text style={styles.text}>Inicio</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.item}
          onPress={() => setScreen("home")}
        >
          <Text style={styles.text}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.item}
          onPress={() => setScreen("perfil")}
        >
          <Text style={styles.text}>Perfil</Text>
        </TouchableOpacity>

        {/* Cerrar sesión */}
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


const styles = {
  header: {
    height: 85,
    backgroundColor: "#F3E8FF", 
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E9D5FF"
  },

  logo: {
    color: "#6D28D9",
    fontWeight: "bold",
    fontSize: 16
  },

  nav: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },

  item: {
    backgroundColor: "#EDE9FE",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12
  },

  text: {
    color: "#5B21B6",
    fontWeight: "500",
    fontSize: 12
  },

  logout: {
    backgroundColor: "#FEE2E2",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12
  },

  logoutText: {
    color: "#EF4444",
    fontWeight: "bold",
    fontSize: 12
  }
};