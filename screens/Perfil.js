import React from "react";
import { View, Text } from "react-native";
import Button from "../components/Button";

export default function Perfil({ setScreen }) {
  return (
    <View style={styles.container}>

      <View style={styles.card}>

        <Text style={styles.title}>
          Perfil del usuario
        </Text>

        {/* Información del usuario */}
        <Text style={styles.text}>
          Categoría de procrastinador: “Perfeccionista”.
          No empieza una tarea porque siente que no está listo o no será suficientemente bueno.
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

        {/* Botón */}
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
    backgroundColor: "#F3E8FF", 
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 22,
    borderRadius: 20,
    width: "100%",

    shadowColor: "#6D28D9",
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 4
  },

  title: {
    fontSize: 22,
    color: "#6D28D9",
    fontWeight: "bold",
    marginBottom: 12
  },

  text: {
    color: "#6B7280",
    marginBottom: 5
  },

  miniCard: {
    backgroundColor: "#F5F3FF",
    padding: 14,
    borderRadius: 14,
    marginTop: 10,
    alignItems: "center",
    width: "100%",
    borderWidth: 1,
    borderColor: "#E9D5FF"
  },

  icon: {
    fontSize: 26,
    marginBottom: 5
  },

  cardTitle: {
    color: "#6D28D9",
    fontWeight: "bold"
  }
};