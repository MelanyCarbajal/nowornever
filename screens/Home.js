import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import Header from "../components/Header";
import { ThemeContext } from "../context/ThemeContext";
import { Ionicons as Icon } from "@expo/vector-icons";

export default function Home({ navigation, route }) {
  const { theme } = useContext(ThemeContext);
  const nombreUsuario = route.params?.username || "Usuario";

  return (
    <View style={[styles.wrapper, { backgroundColor: theme.background }]}>
      <Header navigation={navigation} />

      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.contentWrapper}>
          <View style={styles.headerSection}>
          <Text style={[styles.title, { color: theme.text }]}>Dashboard</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>Hola, {nombreUsuario} 👋</Text>
        </View>

        <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate("NuevaSimulacion")}>
          <View style={[styles.mainCard, { backgroundColor: theme.primary, shadowColor: theme.primary }]}>
            <Icon name="add-circle" size={48} color="#FFFFFF" style={{ marginBottom: 10 }} />
            <Text style={styles.mainTitle}>Nueva Simulación</Text>
            <Text style={styles.mainSubtitle}>Define tu meta y predice tu resultado</Text>
          </View>
        </TouchableOpacity>

        <Text style={[styles.sectionTitle, { color: theme.text }]}>Herramientas</Text>

        <View style={styles.grid}>
          <DashboardCard
            icon="bar-chart"
            title="Estadísticas"
            subtitle="Ver progreso"
            onPress={() => navigation.navigate("Estadisticas")}
            theme={theme}
          />
          <DashboardCard
            icon="folder-open"
            title="Historial"
            subtitle="Simulaciones"
            onPress={() => navigation.navigate("Historial")}
            theme={theme}
          />
          <DashboardCard
            icon="calendar"
            title="Calendario"
            subtitle="Tus fechas"
            onPress={() => navigation.navigate("Calendario")}
            theme={theme}
          />
          <DashboardCard
            icon="bulb"
            title="Consejos"
            subtitle="Acción correctiva"
            onPress={() => navigation.navigate("Recomendaciones")}
            theme={theme}
          />
          <DashboardCard
            icon="person"
            title="Perfil"
            subtitle="Ver cuenta"
            onPress={() => navigation.navigate("Perfil")}
            theme={theme}
          />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function DashboardCard({ icon, title, subtitle, onPress, theme }) {
  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: theme.card }]}
      activeOpacity={0.85}
      onPress={onPress}
    >
      <Icon name={icon} size={32} color={theme.primary} style={{ marginBottom: 10 }} />
      <Text style={[styles.cardTitle, { color: theme.text }]}>{title}</Text>
      <Text style={[styles.cardSubtitle, { color: theme.textSecondary }]}>{subtitle}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  container: { flex: 1 },
  scrollContent: { flexGrow: 1, padding: 20 },
  contentWrapper: { width: "100%", maxWidth: 650, alignSelf: "center", flex: 1 },
  headerSection: { marginBottom: 24 },
  title: { fontSize: 30, fontWeight: "bold" },
  subtitle: { marginTop: 6, fontSize: 15 },
  mainCard: {
    borderRadius: 24,
    paddingVertical: 30,
    paddingHorizontal: 24,
    alignItems: "center",
    marginBottom: 28,
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  mainTitle: { fontSize: 20, fontWeight: "bold", color: "#FFFFFF", marginBottom: 6 },
  mainSubtitle: { color: "#DBEAFE", textAlign: "center", fontSize: 14 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 16 },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  card: {
    width: "48%",
    borderRadius: 18,
    paddingVertical: 24,
    paddingHorizontal: 14,
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: { fontSize: 15, fontWeight: "bold", marginBottom: 4 },
  cardSubtitle: { fontSize: 12, textAlign: "center" },
});
