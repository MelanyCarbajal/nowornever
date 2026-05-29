import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function Historial({ navigation }) {
  const data = require("../assets/data/estadisticas.json");

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("PrivateTabs", { screen: "Perfil" })}
        style={styles.backBtn}
        activeOpacity={0.8}>
        <Text style={styles.backText}>Volver al perfil</Text>
      </TouchableOpacity>

      <Text style={styles.title}>
        🗂️ Historial de Simulaciones
      </Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => {
          const color =
            item.riesgo < 60
              ? "#22C55E"
              : item.riesgo < 85
                ? "#F59E0B"
                : "#EF4444";

          return (
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.card}
            >
              {/* HEADER */}
              <View style={styles.header}>
                <View style={styles.iconBox}>
                  <Text style={styles.icon}>🎯</Text>
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.objetivo}>
                    {item.objetivo}
                  </Text>

                  <Text style={styles.fecha}>
                    Simulación #{index + 1}
                  </Text>
                </View>

                <View
                  style={[
                    styles.badge,
                    { backgroundColor: color },
                  ]}
                >
                  <Text style={styles.badgeText}>
                    {item.riesgo}%
                  </Text>
                </View>
              </View>

              {/* DIVIDER */}
              <View style={styles.divider} />

              {/* INFO */}
              <View style={styles.infoContainer}>
                <View style={styles.infoBox}>
                  <Text style={styles.infoLabel}>
                    Estado
                  </Text>

                  <Text style={styles.estado}>
                    {item.estado}
                  </Text>
                </View>

                <View style={styles.infoBox}>
                  <Text style={styles.infoLabel}>
                    Riesgo
                  </Text>

                  <Text
                    style={[
                      styles.riesgoTexto,
                      { color },
                    ]}
                  >
                    {item.riesgo < 60
                      ? "Bajo"
                      : item.riesgo < 85
                        ? "Moderado"
                        : "Alto"}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
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
    fontSize: 26,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 18,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 18,
    marginBottom: 16,

    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 4,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: "#DBEAFE",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  icon: {
    fontSize: 24,
  },

  objetivo: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#111827",
  },

  fecha: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 4,
  },

  badge: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
  },

  badgeText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 13,
  },

  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 16,
  },

  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  infoBox: {
    flex: 1,
  },

  infoLabel: {
    fontSize: 12,
    color: "#9CA3AF",
    marginBottom: 5,
  },

  estado: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
  },

  riesgoTexto: {
    fontSize: 15,
    fontWeight: "bold",
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

backIcon: {
  color: "#FFFFFF",
  fontSize: 18,
  marginRight: 6,
  fontWeight: "bold",
},

backText: {
  color: "#FFFFFF",
  fontWeight: "700",
  fontSize: 14,
},
});