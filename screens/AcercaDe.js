import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { Ionicons as Icon } from "@expo/vector-icons";

export default function AcercaDe({ navigation }) {
  const { theme, isDarkMode } = useContext(ThemeContext);

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={[styles.backBtn, { backgroundColor: theme.primary }]}
        activeOpacity={0.8}>
        <Icon name="arrow-back" size={20} color="#FFFFFF" style={{ marginRight: 6 }} />
        <Text style={styles.backText}>Volver</Text>
      </TouchableOpacity>

      <Text style={[styles.title, { color: theme.text }]}>Acerca de NowOrNever</Text>

      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <View style={styles.logoContainer}>
          <Icon name="rocket" size={48} color={theme.primary} />
          <Text style={[styles.appName, { color: theme.text }]}>NowOrNever</Text>
          <Text style={[styles.version, { color: theme.textSecondary }]}>Versión 1.0.0</Text>
        </View>

        <Text style={[styles.description, { color: theme.textSecondary }]}>
          NowOrNever es una herramienta diseñada para ayudarte a combatir la procrastinación. 
          A través de simulaciones de riesgo y análisis basados en tu comportamiento, 
          te motivamos a cumplir tus plazos de manera eficiente, priorizando tu salud mental.
        </Text>
        
        <View style={styles.features}>
          <FeatureItem icon="bar-chart" title="Análisis de Progreso" theme={theme} />
          <FeatureItem icon="calendar" title="Gestión de Plazos" theme={theme} />
          <FeatureItem icon="shield-checkmark" title="Privacidad y Seguridad" theme={theme} />
        </View>
      </View>
      
      <View style={[styles.card, { backgroundColor: theme.card, marginTop: 16 }]}>
        <Text style={[styles.subTitle, { color: theme.text }]}>Desarrollado para ti</Text>
        <Text style={[styles.description, { color: theme.textSecondary }]}>
          Nuestro objetivo es construir tecnología que forme estudiantes más productivos y menos estresados. 
          Desarrollado con amor en 2026.
        </Text>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

function FeatureItem({ icon, title, theme }) {
  return (
    <View style={styles.featureItem}>
      <Icon name={icon} size={20} color={theme.primary} style={{ marginRight: 10 }} />
      <Text style={[styles.featureText, { color: theme.text }]}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  backBtn: { flexDirection: "row", alignItems: "center", alignSelf: "flex-start", paddingVertical: 10, paddingHorizontal: 14, borderRadius: 14, marginBottom: 16, shadowColor: "#000", shadowOpacity: 0.15, shadowRadius: 6, elevation: 5 },
  backText: { color: "#FFFFFF", fontWeight: "700", fontSize: 14 },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 20 },
  card: { padding: 24, borderRadius: 24, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 10, elevation: 3 },
  logoContainer: { alignItems: "center", marginBottom: 20 },
  appName: { fontSize: 22, fontWeight: "bold", marginTop: 10 },
  version: { fontSize: 14, marginTop: 4 },
  description: { fontSize: 15, lineHeight: 24, textAlign: "justify", marginBottom: 20 },
  features: { borderTopWidth: 1, borderTopColor: "#E5E7EB", paddingTop: 16 },
  featureItem: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  featureText: { fontSize: 16, fontWeight: "500" },
  subTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
});
