import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

export default function Estadisticas({ navigation }) {
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

  // LOADING
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <View style={styles.loadingCard}>
          <Text style={styles.loadingEmoji}>📊</Text>


          <Text style={styles.loadingTitle}>
            Analizando productividad
          </Text>

          <Text style={styles.loadingText}>
            Calculando escenarios y riesgo...
          </Text>

          <Text style={styles.loadingDots}>
            ● ● ●
          </Text>
        </View>
      </View>
    );
  }

  // ERROR
  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorTitle}>
          ⚠️ Error
        </Text>

        <Text style={styles.errorText}>
          No se pudieron cargar los datos
        </Text>
      </View>
    );
  }

  // CÁLCULOS
  const promedio =
    data.length > 0
      ? Math.round(
        data.reduce(
          (acc, item) => acc + item.riesgo,
          0
        ) / data.length
      )
      : 0;

  const criticos = data.filter(
    (item) => item.riesgo >= 85
  ).length;

  const moderados = data.filter(
    (item) =>
      item.riesgo >= 60 && item.riesgo < 85
  ).length;

  const seguros = data.filter(
    (item) => item.riesgo < 60
  ).length;

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}>
      <TouchableOpacity
        onPress={() => navigation.navigate("PrivateTabs", { screen: "Perfil" })}
        style={styles.backBtn}
        activeOpacity={0.8}>
        <Text style={styles.backText}>Volver al perfil</Text>
      </TouchableOpacity>
      <Text style={styles.title}>
        📊 Estadísticas NowOrNever
      </Text>

      {/* CARD PRINCIPAL */}
      <TouchableOpacity
        style={styles.mainCard}
        activeOpacity={0.85}
      >
        <Text style={styles.mainLabel}>
          Simulaciones realizadas
        </Text>

        <Text style={styles.mainValue}>
          {data.length}
        </Text>

        <Text style={styles.subText}>
          Sigue mejorando tu productividad 🚀
        </Text>
      </TouchableOpacity>

      {/* GRID */}
      <View style={styles.grid}>

        {/* PROMEDIO */}
        <View
          style={[
            styles.statCard,
            styles.blueCard
          ]}
        >
          <Text style={styles.statEmoji}>
            📈
          </Text>

          <Text style={styles.blueNumber}>
            {promedio}%
          </Text>

          <Text style={styles.statLabel}>
            Riesgo promedio
          </Text>
        </View>

        {/* CRITICOS */}
        <View
          style={[
            styles.statCard,
            styles.redCard
          ]}
        >
          <Text style={styles.statEmoji}>
            🔥
          </Text>

          <Text style={styles.redNumber}>
            {criticos}
          </Text>

          <Text style={styles.statLabel}>
            Escenarios críticos
          </Text>
        </View>

        {/* MODERADOS */}
        <View
          style={[
            styles.statCard,
            styles.yellowCard
          ]}
        >
          <Text style={styles.statEmoji}>
            ⚠️
          </Text>

          <Text style={styles.yellowNumber}>
            {moderados}
          </Text>

          <Text style={styles.statLabel}>
            Escenarios moderados
          </Text>
        </View>

        {/* SEGUROS */}
        <View
          style={[
            styles.statCard,
            styles.greenCard
          ]}
        >
          <Text style={styles.statEmoji}>
            ✅
          </Text>

          <Text style={styles.greenNumber}>
            {seguros}
          </Text>

          <Text style={styles.statLabel}>
            Escenarios seguros
          </Text>
        </View>
      </View>

      {/* MENSAJE DINÁMICO */}
      <View style={styles.tipCard}>
        <Text style={styles.tipTitle}>
          ⚡ Recomendación
        </Text>

        <Text style={styles.tipText}>
          {
            promedio < 40
              ? "Excelente organización. Mantienes un riesgo bastante bajo."
              : promedio < 60
                ? "Tu productividad es estable. Sigue manteniendo tus horarios."
                : promedio < 85
                  ? "Tus simulaciones muestran presión moderada. Organiza mejor tus tiempos."
                  : "Nivel de riesgo elevado. Reduce carga o aumenta horas disponibles."
          }
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    padding: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 18,
    color: "#111827",
  },

  // LOADING
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    padding: 20,
  },

  loadingCard: {
    backgroundColor: "#FFFFFF",
    padding: 35,
    borderRadius: 24,
    alignItems: "center",
    width: "85%",

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 5,
  },

  loadingEmoji: {
    fontSize: 55,
    marginBottom: 12,
  },

  loadingTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111827",
  },

  loadingText: {
    marginTop: 8,
    color: "#6B7280",
    textAlign: "center",
    fontSize: 14,
  },

  loadingDots: {
    marginTop: 20,
    fontSize: 22,
    color: "#2563EB",
    fontWeight: "bold",
  },

  // ERROR
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    padding: 20,
  },

  errorTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#DC2626",
    marginBottom: 10,
  },

  errorText: {
    color: "#6B7280",
    fontSize: 15,
    textAlign: "center",
  },

  // CARD PRINCIPAL
  mainCard: {
    backgroundColor: "#2563EB",
    padding: 24,
    borderRadius: 22,
    marginBottom: 18,

    shadowColor: "#2563EB",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 5,
  },

  mainLabel: {
    color: "#DBEAFE",
    fontSize: 14,
  },

  mainValue: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginVertical: 6,
  },

  subText: {
    color: "#BFDBFE",
    fontSize: 13,
  },

  // GRID
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  statCard: {
    width: "48%",
    borderRadius: 22,
    padding: 18,
    marginBottom: 14,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 4,
  },

  statEmoji: {
    fontSize: 24,
    marginBottom: 10,
  },

  statLabel: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: "600",
    lineHeight: 18,
  },

  // BLUE
  blueCard: {
    backgroundColor: "#DBEAFE",
  },

  blueNumber: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#1D4ED8",
  },

  // RED
  redCard: {
    backgroundColor: "#FEE2E2",
  },

  redNumber: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#DC2626",
  },

  // YELLOW
  yellowCard: {
    backgroundColor: "#FEF3C7",
  },

  yellowNumber: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#D97706",
  },

  // GREEN
  greenCard: {
    backgroundColor: "#DCFCE7",
  },

  greenNumber: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#16A34A",
  },

  // MENSAJE
  tipCard: {
    backgroundColor: "#111827",
    padding: 22,
    borderRadius: 22,
    marginTop: 5,
  },

  tipTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 10,
  },

  tipText: {
    color: "#D1D5DB",
    fontSize: 14,
    lineHeight: 22,
  },
  backBtn: {
  flexDirection: "row",
  alignItems: "center",
  alignSelf: "flex-start",

  backgroundColor: "#2563EB",
  paddingVertical: 10,
  paddingHorizontal: 14,
  borderRadius: 14,

  marginBottom: 12,

  shadowColor: "#000",
  shadowOpacity: 0.15,
  shadowRadius: 6,
  shadowOffset: {
    width: 0,
    height: 3,
  },

  elevation: 5,
},

backText: {
  color: "#FFFFFF",
  fontWeight: "700",
  fontSize: 14,
},
});