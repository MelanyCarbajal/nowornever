import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Button from "../components/Button";

export default function Resultado({ route, navigation }) {
  const {
    objetivo,
    diasRestantes,
    horasEfectivas,
    riesgo,
    estado,
    mensaje,
  } = route.params;

  const [contador, setContador] = useState(0);

  useEffect(() => {
    let value = 0;

    const interval = setInterval(() => {
      value += 0.1;

      if (value >= horasEfectivas) {
        value = horasEfectivas;
        clearInterval(interval);
      }

      setContador(value);
    }, 40);

    return () => clearInterval(interval);
  }, []);

  const horas = Math.floor(contador);
  const minutos = Math.round((contador - horas) * 60);

  return (
    <View style={styles.container}>

      <Text style={styles.title}>📊 NowOrNever</Text>

      {/* OBJETIVO */}
      <View style={styles.card}>
        <Text style={styles.label}>🎯 Objetivo</Text>
        <Text style={styles.value}>{objetivo}</Text>
      </View>

      {/* DÍAS */}
      <View style={styles.card}>
        <Text style={styles.label}>📅 Días restantes</Text>
        <Text style={styles.value}>{diasRestantes}</Text>
      </View>

      {/* TIEMPO */}
      <View style={styles.card}>
        <Text style={styles.label}>⚡Tiempo real disponible</Text>
        <Text style={styles.counter}>
          {horas}h {minutos}m
        </Text>
      </View>

      {/* RIESGO */}
      <View style={styles.card}>
        <Text style={styles.label}>📊 Riesgo</Text>
        <Text style={styles.riesgo}>{riesgo.toFixed(0)}%</Text>
      </View>

      {/* ESTADO */}
      <View style={[styles.statusCard, getStatusColor(estado)]}>
        <Text style={styles.estado}>{estado}</Text>
        <Text style={styles.mensaje}>{mensaje}</Text>
      </View>


      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Volver</Text>
      </TouchableOpacity>
    </View>
  );
}

/* COLORES */
const getStatusColor = (estado) => {
  if (estado.includes("Vas bien")) return { backgroundColor: "#DCFCE7" };
  if (estado.includes("justo")) return { backgroundColor: "#FEF9C3" };
  if (estado.includes("Muy")) return { backgroundColor: "#FED7AA" };
  return { backgroundColor: "#FECACA" };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    padding: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 20,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 4,
  },

  label: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 4,
  },

  value: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },

  counter: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2563EB",
  },

  riesgo: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#DC2626",
  },

  statusCard: {
    marginTop: 10,
    padding: 18,
    borderRadius: 16,
    alignItems: "center",
  },

  estado: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
  },

  mensaje: {
    fontSize: 14,
    color: "#374151",
    marginTop: 5,
    textAlign: "center",
  },
  backButton: {
    backgroundColor: "#2563EB",
    paddingVertical: 14,
    borderRadius: 14,
    marginTop: 20,
    alignItems: "center",
  },

  backButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});