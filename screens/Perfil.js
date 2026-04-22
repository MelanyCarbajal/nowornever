import React from "react";
import { View, Text, Image } from "react-native";
import Button from "../components/Button";

export default function Perfil({ setScreen }) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>

        <Image
          source={require("../assets/6073873.png")}
          style={styles.profileImage}
        />

        <Text style={styles.title}>
          Perfil del usuario
        </Text>

        <Text style={styles.text}>
          Categoría: “Perfeccionista”
        </Text>

        <Text style={styles.text}>
          Nivel: 3
        </Text>

        <Text style={styles.text}>
          Días productivos: 2 / 7
        </Text>

        {/* Tarjetas */}
        <View style={styles.miniCard}>
          <Text style={styles.icon}>📊</Text>
          <Text style={styles.cardTitle}>Estadísticas</Text>
        </View>

        <View style={styles.miniCard}>
          <Text style={styles.icon}>🏆</Text>
          <Text style={styles.cardTitle}>Logros</Text>
        </View>

        <Button
          title="Volver al Home"
          onPress={() => setScreen("home")}
        />

      </View>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 22,
    borderRadius: 20,
    width: "100%",

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3
  },

  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    alignSelf: "center",
    marginBottom: 15,
    borderWidth: 3,               
    borderColor: "#2563EB"        
  },

  title: {
    fontSize: 22,
    color: "#111827",
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center"
  },

  text: {
    color: "#6B7280",
    marginBottom: 6,
    textAlign: "center"
  },

  miniCard: {
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 14,
    marginTop: 10,
    alignItems: "center",
    width: "100%",
    borderWidth: 1,
    borderColor: "#E5E7EB" 
  },

  icon: {
    fontSize: 26,
    marginBottom: 5
  },

  cardTitle: {
    color: "#2563EB", 
    fontWeight: "bold"
  }
};