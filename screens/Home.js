import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function Home({ user, setScreen }) {
  return (
    <View style={styles.container}>

      <Text style={styles.title}>Dashboard</Text>

      <Text style={styles.subtitle}>
        Hola, {user?.nombre || "Usuario"} 👋
      </Text>

      {/* Tarjeta principal */}
      <TouchableOpacity activeOpacity={0.85}>
        <View style={styles.bigCard}>
          <Text style={styles.bigIcon}>＋</Text>
          <Text style={styles.bigTitle}>Nueva simulación</Text>
          <Text style={styles.bigSub}>
            Define tu meta y predice tu resultado
          </Text>
        </View>
      </TouchableOpacity>

      {/* Grid */}
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
    backgroundColor: "#F9FAFB",
    padding: 20
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#111827"
  },

  subtitle: {
    color: "#6B7280",
    marginBottom: 20
  },

  bigCard: {
    backgroundColor: "#2563EB", 
    padding: 24,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 20,

    shadowColor: "#2563EB",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5
  },

  bigIcon: {
    fontSize: 34,
    color: "white",
    marginBottom: 5
  },

  bigTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16
  },

  bigSub: {
    color: "#DBEAFE",
    fontSize: 12,
    textAlign: "center"
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },

  card: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 16,
    marginBottom: 15,
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2
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