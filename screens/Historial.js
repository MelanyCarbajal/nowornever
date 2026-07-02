import React, { useContext } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { Ionicons as Icon } from "@expo/vector-icons";

export default function Historial({ navigation }) {
  const { theme, isDarkMode } = useContext(ThemeContext);
  const data = require("../assets/data/estadisticas.json");

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={[styles.backBtn, { backgroundColor: theme.primary }]}
        activeOpacity={0.8}>
        <Icon name="arrow-back" size={20} color="#FFFFFF" style={{ marginRight: 6 }} />
        <Text style={styles.backText}>Volver</Text>
      </TouchableOpacity>

      <Text style={[styles.title, { color: theme.text }]}>Historial</Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={({ item, index }) => {
          const color = item.riesgo < 60 ? theme.success : item.riesgo < 85 ? theme.warning : theme.danger;
          const bgBadge = isDarkMode ? color + "30" : color;
          const textBadge = isDarkMode ? color : "#FFFFFF";

          return (
            <TouchableOpacity activeOpacity={0.9} style={[styles.card, { backgroundColor: theme.card }]}>
              {/* HEADER */}
              <View style={styles.header}>
                <View style={[styles.iconBox, { backgroundColor: theme.inputBackground }]}>
                  <Icon name="flag" size={24} color={theme.primary} />
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={[styles.objetivo, { color: theme.text }]}>{item.objetivo}</Text>
                  <Text style={[styles.fecha, { color: theme.textSecondary }]}>Simulación #{index + 1}</Text>
                </View>

                <View style={[styles.badge, { backgroundColor: bgBadge }]}>
                  <Text style={[styles.badgeText, { color: textBadge }]}>{item.riesgo}%</Text>
                </View>
              </View>

              {/* DIVIDER */}
              <View style={[styles.divider, { backgroundColor: theme.border }]} />

              {/* INFO */}
              <View style={styles.infoContainer}>
                <View style={styles.infoBox}>
                  <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>Estado</Text>
                  <Text style={[styles.estado, { color: theme.text }]}>{item.estado}</Text>
                </View>

                <View style={styles.infoBox}>
                  <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>Riesgo</Text>
                  <Text style={[styles.riesgoTexto, { color }]}>
                    {item.riesgo < 60 ? "Bajo" : item.riesgo < 85 ? "Moderado" : "Alto"}
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
  container: { flex: 1, padding: 20 },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 18 },
  card: { borderRadius: 22, padding: 18, marginBottom: 16, shadowColor: "#000", shadowOpacity: 0.07, shadowRadius: 8, elevation: 4 },
  header: { flexDirection: "row", alignItems: "center" },
  iconBox: { width: 52, height: 52, borderRadius: 16, justifyContent: "center", alignItems: "center", marginRight: 14 },
  objetivo: { fontSize: 17, fontWeight: "bold" },
  fecha: { fontSize: 13, marginTop: 4 },
  badge: { paddingHorizontal: 12, paddingVertical: 7, borderRadius: 999 },
  badgeText: { fontWeight: "bold", fontSize: 13 },
  divider: { height: 1, marginVertical: 16 },
  infoContainer: { flexDirection: "row", justifyContent: "space-between" },
  infoBox: { flex: 1 },
  infoLabel: { fontSize: 12, marginBottom: 5 },
  estado: { fontSize: 15, fontWeight: "600" },
  riesgoTexto: { fontSize: 15, fontWeight: "bold" },
  backBtn: { flexDirection: "row", alignItems: "center", alignSelf: "flex-start", paddingVertical: 10, paddingHorizontal: 14, borderRadius: 14, marginBottom: 12, shadowColor: "#000", shadowOpacity: 0.15, shadowRadius: 6, elevation: 5 },
  backText: { color: "#FFFFFF", fontWeight: "700", fontSize: 14 },
});
