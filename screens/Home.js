import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, } from "react-native";

import Header from "../components/Header";

export default function Home({ navigation }) {

  const nombreUsuario = "Usuario"; 

  return (
    <View style={styles.wrapper}>

      <Header navigation={navigation} />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        <View style={styles.headerSection}>
          <Text style={styles.title}>Dashboard</Text>

          <Text style={styles.subtitle}>Hola, {nombreUsuario} 👋</Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.navigate("NuevaSimulacion")}
        >
          <View style={styles.mainCard}>
            <Text style={styles.mainIcon}>＋</Text>

            <Text style={styles.mainTitle}>Nueva Simulación</Text>

            <Text style={styles.mainSubtitle}>
              Define tu meta y predice tu resultado
            </Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Herramientas</Text>
        <View style={styles.grid}>
          <DashboardCard
            icon="📊"
            title="Estadísticas"
            subtitle="Ver progreso"
            onPress={() =>
              navigation.navigate("PrivateTabs", {
                screen: "Estadisticas",
              })
            }
          />

          <DashboardCard icon="📅" title="Historial" subtitle="Simulaciones"
              onPress={() =>
              navigation.navigate("PrivateTabs", {
                screen: "Historial",
              })
            }
          />

          <DashboardCard
            icon="💡"
            title="Consejos"
            subtitle="Acción correctiva"
            onPress={() => navigation.navigate("Recomendaciones")}
          />

          <DashboardCard
            icon="👤"
            title="Perfil"
            subtitle="Ver cuenta"
            onPress={() => navigation.navigate("Perfil")}
          />
        </View>
      </ScrollView>
    </View>
  );
}


function DashboardCard({ icon, title, subtitle, onPress }) {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={onPress}
    >
      <Text style={styles.cardIcon}>{icon}</Text>

      <Text style={styles.cardTitle}>{title}</Text>

      <Text style={styles.cardSubtitle}>{subtitle}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },

  container: {
    flex: 1,
    padding: 20,
  },

  headerSection: {
    marginBottom: 24,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#111827",
  },

  subtitle: {
    marginTop: 6,
    fontSize: 15,
    color: "#6B7280",
  },

  mainCard: {
    backgroundColor: "#2563EB",

    borderRadius: 24,

    paddingVertical: 30,
    paddingHorizontal: 24,

    alignItems: "center",

    marginBottom: 28,

    shadowColor: "#2563EB",
    shadowOpacity: 0.25,
    shadowRadius: 12,

    elevation: 6,
  },

  mainIcon: {
    fontSize: 38,
    color: "#FFFFFF",
    marginBottom: 10,
  },

  mainTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 6,
  },

  mainSubtitle: {
    color: "#DBEAFE",
    textAlign: "center",
    fontSize: 14,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",

    marginBottom: 16,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  card: {
    width: "48%",

    backgroundColor: "#FFFFFF",

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

  cardIcon: {
    fontSize: 30,
    marginBottom: 10,
  },

  cardTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 4,
  },

  cardSubtitle: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
  },
});
