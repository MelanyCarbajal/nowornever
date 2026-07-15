import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { Ionicons as Icon } from "@expo/vector-icons";
import { auth, db } from "../config/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Estadisticas({ navigation }) {
  const { theme, isDarkMode } = useContext(ThemeContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      setLoading(false);
      return;
    }

    AsyncStorage.getItem(`estadisticas_${user.uid}`).then(cached => {
      if (cached) {
        setData(JSON.parse(cached));
        setLoading(false);
      }
    });

    const unsubscribe = onSnapshot(doc(db, "users", user.uid), 
      (docSnap) => {
        if (docSnap.exists() && docSnap.data().simulaciones) {
          const docs = docSnap.data().simulaciones;
          setData(docs);
          setLoading(false);
          setError(false);
          AsyncStorage.setItem(`estadisticas_${user.uid}`, JSON.stringify(docs));
        } else {
          setData([]);
          setLoading(false);
        }
      }, 
      (err) => {
        console.error("Error cargando estadísticas", err);
        if (data.length === 0) setError(true);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.background }]}>
        <View style={[styles.loadingCard, { backgroundColor: theme.card }]}>
          <Icon name="bar-chart" size={64} color={theme.primary} style={{ marginBottom: 16 }} />
          <Text style={[styles.loadingTitle, { color: theme.text }]}>Analizando productividad</Text>
          <Text style={[styles.loadingText, { color: theme.textSecondary }]}>Calculando escenarios y riesgo...</Text>
          <Text style={[styles.loadingDots, { color: theme.primary }]}>● ● ●</Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.center, { backgroundColor: theme.background }]}>
        <Icon name="alert-circle" size={48} color={theme.danger} style={{ marginBottom: 10 }} />
        <Text style={[styles.errorTitle, { color: theme.danger }]}>Error</Text>
        <Text style={[styles.errorText, { color: theme.textSecondary }]}>No se pudieron cargar los datos</Text>
      </View>
    );
  }

  const promedio = data.length > 0 ? Math.round(data.reduce((acc, item) => acc + item.riesgo, 0) / data.length) : 0;
  const criticos = data.filter((item) => item.riesgo >= 85).length;
  const moderados = data.filter((item) => item.riesgo >= 60 && item.riesgo < 85).length;
  const seguros = data.filter((item) => item.riesgo < 60).length;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <View style={styles.contentWrapper}>
        <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={[styles.backBtn, { backgroundColor: theme.primary }]}
        activeOpacity={0.8}>
        <Icon name="arrow-back" size={20} color="#FFFFFF" style={{ marginRight: 6 }} />
        <Text style={styles.backText}>Volver</Text>
      </TouchableOpacity>
      
      <Text style={[styles.title, { color: theme.text }]}>Estadísticas</Text>

      <TouchableOpacity style={[styles.mainCard, { backgroundColor: theme.primary, shadowColor: theme.primary }]} activeOpacity={0.85}>
        <Text style={styles.mainLabel}>Simulaciones realizadas</Text>
        <Text style={styles.mainValue}>{data.length}</Text>
        <Text style={styles.subText}>Sigue mejorando tu productividad 🚀</Text>
      </TouchableOpacity>

      {/* 
        TODO (Gamificación - Sistema de Castigos): 
        1. Agregar aquí un componente de "Energía" o "Nivel de Disciplina" (ej. Barra de vida).
        2. Esa variable debe venir de Firebase (ej. user.disciplina).
        3. Si el usuario se rinde en Calendario.js, restar puntos a esa variable y actualizar Firebase.
        4. Si el nivel de disciplina llega a 0%, cambiar el color principal a rojo o bloquear la app temporalmente.
      */}

      <View style={styles.grid}>
        {/* PROMEDIO */}
        <View style={[styles.statCard, { backgroundColor: isDarkMode ? "#1E3A8A" : "#DBEAFE" }]}>
          <Icon name="trending-up" size={28} color={isDarkMode ? "#60A5FA" : "#1D4ED8"} style={styles.statIcon} />
          <Text style={[styles.blueNumber, { color: isDarkMode ? "#60A5FA" : "#1D4ED8" }]}>{promedio}%</Text>
          <Text style={[styles.statLabel, { color: theme.text }]}>Riesgo promedio</Text>
        </View>

        {/* CRITICOS */}
        <View style={[styles.statCard, { backgroundColor: isDarkMode ? "#7F1D1D" : "#FEE2E2" }]}>
          <Icon name="flame" size={28} color={isDarkMode ? "#FCA5A5" : "#DC2626"} style={styles.statIcon} />
          <Text style={[styles.redNumber, { color: isDarkMode ? "#FCA5A5" : "#DC2626" }]}>{criticos}</Text>
          <Text style={[styles.statLabel, { color: theme.text }]}>Escenarios críticos</Text>
        </View>

        {/* MODERADOS */}
        <View style={[styles.statCard, { backgroundColor: isDarkMode ? "#713F12" : "#FEF3C7" }]}>
          <Icon name="warning" size={28} color={isDarkMode ? "#FDE047" : "#D97706"} style={styles.statIcon} />
          <Text style={[styles.yellowNumber, { color: isDarkMode ? "#FDE047" : "#D97706" }]}>{moderados}</Text>
          <Text style={[styles.statLabel, { color: theme.text }]}>Escenarios moderados</Text>
        </View>

        {/* SEGUROS */}
        <View style={[styles.statCard, { backgroundColor: isDarkMode ? "#064E3B" : "#DCFCE7" }]}>
          <Icon name="checkmark-circle" size={28} color={isDarkMode ? "#34D399" : "#16A34A"} style={styles.statIcon} />
          <Text style={[styles.greenNumber, { color: isDarkMode ? "#34D399" : "#16A34A" }]}>{seguros}</Text>
          <Text style={[styles.statLabel, { color: theme.text }]}>Escenarios seguros</Text>
        </View>
      </View>

      <View style={[styles.tipCard, { backgroundColor: theme.card, borderWidth: 1, borderColor: theme.border }]}>
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
          <Icon name="bulb" size={24} color={theme.warning} style={{ marginRight: 8 }} />
          <Text style={[styles.tipTitle, { color: theme.text }]}>Recomendación</Text>
        </View>
        <Text style={[styles.tipText, { color: theme.textSecondary }]}>
          {promedio < 40
            ? "Excelente organización. Mantienes un riesgo bastante bajo."
            : promedio < 60
              ? "Tu productividad es estable. Sigue manteniendo tus horarios."
              : promedio < 85
                ? "Tus simulaciones muestran presión moderada. Organiza mejor tus tiempos."
                : "Nivel de riesgo elevado. Reduce carga o aumenta horas disponibles."}
        </Text>
      </View>
      <View style={{ height: 40 }} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { flexGrow: 1, padding: 20 },
  contentWrapper: { width: "100%", maxWidth: 650, alignSelf: "center", flex: 1 },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 18 },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  loadingCard: { padding: 35, borderRadius: 24, alignItems: "center", width: "85%", shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 10, elevation: 5 },
  loadingTitle: { fontSize: 22, fontWeight: "bold" },
  loadingText: { marginTop: 8, textAlign: "center", fontSize: 14 },
  loadingDots: { marginTop: 20, fontSize: 22, fontWeight: "bold" },
  center: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  errorTitle: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  errorText: { fontSize: 15, textAlign: "center" },
  mainCard: { padding: 24, borderRadius: 22, marginBottom: 18, shadowOpacity: 0.2, shadowRadius: 10, elevation: 5 },
  mainLabel: { color: "#DBEAFE", fontSize: 14 },
  mainValue: { fontSize: 42, fontWeight: "bold", color: "#FFFFFF", marginVertical: 6 },
  subText: { color: "#BFDBFE", fontSize: 13 },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginBottom: 18 },
  statCard: { width: "48%", borderRadius: 22, padding: 18, marginBottom: 14, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 8, elevation: 4 },
  statIcon: { marginBottom: 10 },
  statLabel: { marginTop: 8, fontSize: 13, fontWeight: "600", lineHeight: 18 },
  blueNumber: { fontSize: 30, fontWeight: "bold" },
  redNumber: { fontSize: 30, fontWeight: "bold" },
  yellowNumber: { fontSize: 30, fontWeight: "bold" },
  greenNumber: { fontSize: 30, fontWeight: "bold" },
  tipCard: { padding: 22, borderRadius: 22, marginTop: 5 },
  tipTitle: { fontSize: 17, fontWeight: "bold" },
  tipText: { fontSize: 14, lineHeight: 22 },
  backBtn: { flexDirection: "row", alignItems: "center", alignSelf: "flex-start", paddingVertical: 10, paddingHorizontal: 14, borderRadius: 14, marginBottom: 12, shadowColor: "#000", shadowOpacity: 0.15, shadowRadius: 6, elevation: 5 },
  backText: { color: "#FFFFFF", fontWeight: "700", fontSize: 14 },
});
