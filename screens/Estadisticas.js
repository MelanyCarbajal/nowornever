import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

export default function Estadisticas() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      setLoading(true);
      setError(false);

      const json = require("../assets/data/estadisticas.json");

      await new Promise((resolve) => setTimeout(resolve, 900));

      setData(json);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  //  LOADING 
  if (loading) {
    return (
      <View style={styles.center}>
        <Text style={styles.loadingTitle}>📊 Cargando estadísticas</Text>

        <Text style={styles.loadingText}>
          Analizando tu productividad...
        </Text>

        <Text style={styles.loadingDots}>● ● ●</Text>
      </View>
    );
  }
 
  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorTitle}>⚠️ Error</Text>
        <Text style={styles.errorText}>
          No se pudieron cargar los datos
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📊 Estadísticas NowOrNever</Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const color =
            item.riesgo < 60
              ? "#22C55E"
              : item.riesgo < 85
              ? "#F59E0B"
              : "#EF4444";

          return (
            <View style={styles.card}>
              <Text style={styles.obj}>🎯 {item.objetivo}</Text>

              <View style={styles.row}>
                <Text style={styles.label}>Riesgo</Text>
                <Text style={[styles.riesgo, { color }]}>
                  {item.riesgo}%
                </Text>
              </View>

              <Text style={styles.estado}>{item.estado}</Text>
            </View>
          );
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    padding: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#111827",
  },

 
  mainCard: {
    backgroundColor: "#2563EB",
    padding: 22,
    borderRadius: 18,
    marginBottom: 15,
  },

  mainLabel: {
    color: "#DBEAFE",
    fontSize: 14,
  },

  mainValue: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginVertical: 5,
  },

  subText: {
    color: "#BFDBFE",
    fontSize: 12,
  },


  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  card: {
    width: "48%",
    padding: 15,
    borderRadius: 14,
    marginBottom: 12,
  },

  cardLabel: {
    fontSize: 12,
    color: "#374151",
  },

  cardValue: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 5,
  },
  insight: {
    marginTop: 10,
    backgroundColor: "#111827",
    padding: 16,
    borderRadius: 14,
  },

  insightTitle: {
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 5,
  },

  insightText: {
    color: "#D1D5DB",
    fontSize: 13,
  },
});