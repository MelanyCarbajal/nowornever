import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

export default function Historial() {
  const data = require("../assets/data/estadisticas.json");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🗂️ Historial de Simulaciones</Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.objetivo}>🎯 {item.objetivo}</Text>

            <View style={styles.row}>
              <Text style={styles.label}>Riesgo:</Text>
              <Text
                style={[
                  styles.riesgo,
                  item.riesgo > 80 ? styles.rojo : styles.verde,
                ]}
              >
                {item.riesgo}%
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Estado:</Text>
              <Text style={styles.estado}>{item.estado}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    padding: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#111827",
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },

  objetivo: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#111827",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },

  label: {
    color: "#6B7280",
    fontSize: 13,
  },

  riesgo: {
    fontWeight: "bold",
  },

  estado: {
    fontWeight: "bold",
    color: "#374151",
  },

  rojo: {
    color: "#EF4444",
  },

  verde: {
    color: "#22C55E",
  },
});