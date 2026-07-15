import React, { useContext, useEffect, useState, useCallback, memo } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from "react-native";
import Header from "../components/Header";
import { ThemeContext } from "../context/ThemeContext";
import { Ionicons as Icon } from "@expo/vector-icons";
import { auth, db } from "../config/firebase";
import { doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateProfile } from "firebase/auth";
import { useIsFocused } from "@react-navigation/native";

const DashboardCard = memo(({ icon, title, subtitle, onPress, theme }) => {
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
});

export default function Home({ navigation, route }) {
  const { theme } = useContext(ThemeContext);
  const isFocused = useIsFocused();
  const [nombreUsuario, setNombreUsuario] = useState(auth.currentUser?.displayName || auth.currentUser?.email || "");
  const [fotoPerfil, setFotoPerfil] = useState(auth.currentUser?.photoURL || null);

  useEffect(() => {
    if (isFocused) {
      cargarDatos();
    }
  }, [isFocused]);

  const cargarDatos = useCallback(async () => {
    const user = auth.currentUser;
    if (!user) return;

    const cachedFoto = await AsyncStorage.getItem("foto_perfil");
    if (cachedFoto) setFotoPerfil(cachedFoto);
    
    const pendingName = await AsyncStorage.getItem("pending_username");
    if (pendingName) {
      setNombreUsuario(pendingName);

    }
    await user.reload();
    if (user.displayName && !pendingName) setNombreUsuario(user.displayName);


    try {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        if (data.username && !pendingName) setNombreUsuario(data.username);
        
        if (data.photoBase64) {
          setFotoPerfil(data.photoBase64);
          AsyncStorage.setItem("foto_perfil", data.photoBase64);
        } else if (data.photoURL && !cachedFoto) {
          setFotoPerfil(data.photoURL);
        }
      }

      if (pendingName) await AsyncStorage.removeItem("pending_username");
    } catch (error) {
      console.log("Error leyendo Firestore en Home", error);
    }
  }, []);

  const goSimulacion = useCallback(() => navigation.navigate("NuevaSimulacion"), [navigation]);
  const goEstadisticas = useCallback(() => navigation.navigate("Estadisticas"), [navigation]);
  const goHistorial = useCallback(() => navigation.navigate("Historial"), [navigation]);
  const goCalendario = useCallback(() => navigation.navigate("Calendario"), [navigation]);
  const goRecomendaciones = useCallback(() => navigation.navigate("Recomendaciones"), [navigation]);

  return (
    <View style={[styles.wrapper, { backgroundColor: theme.background }]}>
      <Header navigation={navigation} />

      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.contentWrapper}>
          <View style={[styles.headerSection, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
            <View>
              <Text style={[styles.title, { color: theme.text }]}>Dashboard</Text>
              <Text style={[styles.subtitle, { color: theme.text }]}>Hola, {nombreUsuario} 👋</Text>
            </View>
            <Image 
              source={fotoPerfil ? { uri: fotoPerfil } : require("../assets/6073873.png")}
              style={{ width: 50, height: 50, borderRadius: 25, borderWidth: 2, borderColor: theme.primary }}
            />
          </View>

        <TouchableOpacity activeOpacity={0.9} onPress={goSimulacion}>
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
            onPress={goEstadisticas}
            theme={theme}
          />
          <DashboardCard
            icon="folder-open"
            title="Historial"
            subtitle="Simulaciones"
            onPress={goHistorial}
            theme={theme}
          />
          <DashboardCard
            icon="calendar"
            title="Calendario"
            subtitle="Tus fechas"
            onPress={goCalendario}
            theme={theme}
          />
          <DashboardCard
            icon="bulb"
            title="Consejos"
            subtitle="Acción correctiva"
            onPress={goRecomendaciones}
            theme={theme}
          />
          </View>
        </View>
      </ScrollView>
    </View>
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
