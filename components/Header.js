import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, useWindowDimensions } from "react-native";

export default function Header({ setScreen }) {

  const { width } = useWindowDimensions();
  const isSmall = width < 400;

  const [menuOpen, setMenuOpen] = useState(false);

  const logoSize = isSmall ? 40 : 60;

  return (
    <View style={styles.container}>

      {/* HEADER TOP */}
      <View style={styles.header}>

        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/logo.png")}
            style={{ width: logoSize, height: logoSize }}
          />
          <Text style={styles.logo}>NOWORNEVER</Text>
        </View>

        {/* Botón hamburguesa (solo móvil) */}
        {isSmall && (
          <TouchableOpacity onPress={() => setMenuOpen(!menuOpen)}>
            <Text style={styles.menuIcon}>☰</Text>
          </TouchableOpacity>
        )}

        {/* Menú normal (pantallas grandes) */}
        {!isSmall && (
          <View style={styles.nav}>
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
        )}

      </View>

      {/* MENÚ DESPLEGABLE (móvil) */}
      {isSmall && menuOpen && (
        <View style={styles.mobileMenu}>
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
      )}

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
  container: {
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB"
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15
  },

  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },

  logo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827"
  },

  menuIcon: {
    fontSize: 28,
    color: "#111827"
  },

  nav: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },

  mobileMenu: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    gap: 10
  },

  navItem: {
    paddingVertical: 10
  },

  navText: {
    fontSize: 16,
    color: "#374151"
  },

  logout: {
    backgroundColor: "#FEE2E2",
    padding: 10,
    borderRadius: 10,
    alignItems: "center"
  },

  logoutText: {
    color: "#EF4444",
    fontWeight: "bold"
  }
};