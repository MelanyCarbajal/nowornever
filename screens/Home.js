import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function Home({ user, setScreen }) {
  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Dashboard
      </Text>

      <Text style={styles.subtitle}>
        Hola, {user?.nombre || "Usuario"} 👋
      </Text>

      {/* Tarjeta principal: Crear simulación */}
      <TouchableOpacity activeOpacity={0.8}>
        <View style={styles.bigCard}>
          <Text style={styles.bigIcon}>＋</Text>
          <Text style={styles.bigTitle}>Nueva simulación</Text>
          <Text style={styles.bigSub}>Define tu meta y parámetros</Text>
        </View>
      </TouchableOpacity>

      {/* Grid de tarjetas */}
      <View style={styles.grid}>

        <PressCard icon="📊" title="Estadísticas" />
        <PressCard icon="📅" title="Historial" />
        <PressCard icon="🔔" title="Notificaciones" />

        <TouchableOpacity
          style={styles.card}
          onPress={() => setScreen("perfil")}
        >
          <Text style={styles.cardIcon}>👤</Text>
          <Text style={styles.cardTitle}>Perfil</Text>
          <Text style={styles.cardSub}>Ver cuenta</Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}

function PressCard({ icon, title }) {
  return (
    <TouchableOpacity style={styles.card}>
      <Text style={styles.cardIcon}>{icon}</Text>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardSub}>Bloqueado</Text>
    </TouchableOpacity>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#F3E8FF",
    padding: 20
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111827"
  },

  subtitle: {
    color: "#6B7280",
    marginBottom: 20
  },

  bigCard: {
    backgroundColor: "#6D28D9",
    padding: 20,
    borderRadius: 18,
    alignItems: "center",
    marginBottom: 20
  },

  bigIcon: {
    fontSize: 32,
    color: "white"
  },

  bigTitle: {
    color: "white",
    fontWeight: "bold"
  },

  bigSub: {
    color: "#E9D5FF",
    fontSize: 12
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },

  card: {
    width: "48%",
    backgroundColor: "white",
    padding: 18,
    borderRadius: 16,
    marginBottom: 15,
    alignItems: "center"
  },

  cardIcon: {
    fontSize: 28,
    marginBottom: 8
  },

  cardTitle: {
    fontWeight: "bold",
    color: "#111827"
  },

  cardSub: {
    color: "#6B7280",
    fontSize: 12
  }
};