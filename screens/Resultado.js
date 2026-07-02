import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { Ionicons as Icon } from "@expo/vector-icons";

export default function Resultado({ route, navigation }) {
  const { theme, isDarkMode } = useContext(ThemeContext);
  const { objetivo, diasRestantes, horasEfectivas, riesgo, estado, mensaje } = route.params;

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
  }, [horasEfectivas]);

  const horas = Math.floor(contador);
  const minutos = Math.round((contador - horas) * 60);

  // Colores dinámicos para estados en modo oscuro/claro
  const getStatusColor = (status) => {
    if (status.includes("Vas bien")) return isDarkMode ? "#064E3B" : "#DCFCE7";
    if (status.includes("justo")) return isDarkMode ? "#713F12" : "#FEF9C3";
    if (status.includes("Muy")) return isDarkMode ? "#9A3412" : "#FED7AA";
    return isDarkMode ? "#7F1D1D" : "#FECACA";
  };

  const getStatusTextColor = (status) => {
    if (status.includes("Vas bien")) return isDarkMode ? "#34D399" : "#166534";
    if (status.includes("justo")) return isDarkMode ? "#FDE047" : "#854D0E";
    if (status.includes("Muy")) return isDarkMode ? "#FDBA74" : "#9A3412";
    return isDarkMode ? "#FCA5A5" : "#991B1B";
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Resultado</Text>

      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <View style={styles.labelRow}>
          <Icon name="flag" size={16} color={theme.textSecondary} style={styles.labelIcon} />
          <Text style={[styles.label, { color: theme.textSecondary }]}>Objetivo</Text>
        </View>
        <Text style={[styles.value, { color: theme.text }]}>{objetivo}</Text>
      </View>

      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <View style={styles.labelRow}>
          <Icon name="calendar" size={16} color={theme.textSecondary} style={styles.labelIcon} />
          <Text style={[styles.label, { color: theme.textSecondary }]}>Días restantes</Text>
        </View>
        <Text style={[styles.value, { color: theme.text }]}>{diasRestantes}</Text>
      </View>

      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <View style={styles.labelRow}>
          <Icon name="time" size={16} color={theme.textSecondary} style={styles.labelIcon} />
          <Text style={[styles.label, { color: theme.textSecondary }]}>Tiempo real disponible</Text>
        </View>
        <Text style={[styles.counter, { color: theme.primary }]}>
          {horas}h {minutos}m
        </Text>
      </View>

      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <View style={styles.labelRow}>
          <Icon name="warning" size={16} color={theme.textSecondary} style={styles.labelIcon} />
          <Text style={[styles.label, { color: theme.textSecondary }]}>Riesgo</Text>
        </View>
        <Text style={[styles.riesgo, { color: theme.danger }]}>{riesgo.toFixed(0)}%</Text>
      </View>

      <View style={[styles.statusCard, { backgroundColor: getStatusColor(estado) }]}>
        <Text style={[styles.estado, { color: getStatusTextColor(estado) }]}>{estado}</Text>
        <Text style={[styles.mensaje, { color: getStatusTextColor(estado) }]}>{mensaje}</Text>
      </View>

      <TouchableOpacity
        style={[styles.backButton, { backgroundColor: theme.primary }]}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Volver</Text>
      </TouchableOpacity>
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 26, fontWeight: "bold", textAlign: "center", marginBottom: 20, marginTop: 10 },
  card: { padding: 18, borderRadius: 20, marginBottom: 14, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 10, elevation: 3 },
  labelRow: { flexDirection: "row", alignItems: "center", marginBottom: 4 },
  labelIcon: { marginRight: 6 },
  label: { fontSize: 13 },
  value: { fontSize: 17, fontWeight: "600" },
  counter: { fontSize: 22, fontWeight: "bold" },
  riesgo: { fontSize: 34, fontWeight: "bold" },
  statusCard: { marginTop: 10, padding: 20, borderRadius: 16, alignItems: "center" },
  estado: { fontSize: 24, fontWeight: "bold" },
  mensaje: { fontSize: 14, marginTop: 5, textAlign: "center" },
  backButton: { paddingVertical: 16, borderRadius: 16, marginTop: 20, alignItems: "center" },
  backButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "bold" },
});
