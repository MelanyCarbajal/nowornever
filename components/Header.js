import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, useWindowDimensions, StyleSheet } from "react-native";

// 1. CAMBIO CLAVE: Cambiamos '{ setScreen }' por '{ navigation }'
export default function Header({ navigation }) {

  const { width } = useWindowDimensions();
  const isSmall = width < 400;

  const [menuOpen, setMenuOpen] = useState(false);

  const logoSize = isSmall ? 40 : 60;

  return (
    <View style={styles.container}>

      <View style={styles.header}>

        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/logo.png")}
            style={{ width: logoSize, height: logoSize }}
          />
          <Text style={styles.logo}>NOWORNEVER</Text>
        </View>

        {isSmall && (
          <TouchableOpacity onPress={() => setMenuOpen(!menuOpen)}>
            <Text style={styles.menuIcon}>☰</Text>
          </TouchableOpacity>
        )}

        {!isSmall && (
          <View style={styles.nav}>
            {/* 2. CAMBIO CLAVE: Usamos navigation.navigate con los nombres correctos */}
            <NavItem text="Inicio" onPress={() => navigation.navigate("Inicio")} />
            <NavItem text="Dashboard" onPress={() => navigation.navigate("Home")} />
            <NavItem text="Perfil" onPress={() => navigation.navigate("Perfil")} />

            <TouchableOpacity
              style={styles.logout}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.logoutText}>Salir</Text>
            </TouchableOpacity>
          </View>
        )}

      </View>

      {/* MENÚ DESPLEGABLE (móvil) */}
      {isSmall && menuOpen && (
        <View style={styles.mobileMenu}>
          {/* 3. CAMBIO CLAVE: Actualizamos las rutas del menú móvil también */}
          <NavItem text="Inicio" onPress={() => navigation.navigate("Inicio")} />
          <NavItem text="Dashboard" onPress={() => navigation.navigate("Home")} />
          <NavItem text="Perfil" onPress={() => navigation.navigate("Perfil")} />

          <TouchableOpacity
            style={styles.logout}
            onPress={() => navigation.navigate("Login")}
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

// 4. BUENA PRÁCTICA: Envolvemos los estilos en StyleSheet.create()
const styles = StyleSheet.create({
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
});