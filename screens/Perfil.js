import React, { useContext } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Button from "../components/Button";
import { ThemeContext } from "../context/ThemeContext";
import { Ionicons as Icon } from "@expo/vector-icons";

export default function Perfil({ navigation }) {
  const { theme } = useContext(ThemeContext);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Image
          source={require("../assets/6073873.png")}
          style={[styles.profileImage, { borderColor: theme.primary }]}
        />
        <Text style={[styles.title, { color: theme.text }]}>Perfil del usuario</Text>
        <Text style={[styles.text, { color: theme.textSecondary }]}>Categoría: “Perfeccionista”</Text>
        <Text style={[styles.text, { color: theme.textSecondary }]}>Nivel: 3</Text>
        <Text style={[styles.text, { color: theme.textSecondary }]}>Días productivos: 2 / 7</Text>

        <TouchableOpacity
          style={[styles.miniCard, { backgroundColor: theme.inputBackground, borderColor: theme.border }]}
          activeOpacity={0.85}
          onPress={() => navigation.navigate("Estadisticas")}
        >
          <Icon name="bar-chart" size={24} color={theme.primary} style={{ marginBottom: 5 }} />
          <Text style={[styles.cardTitle, { color: theme.primary }]}>Estadísticas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.miniCard, { backgroundColor: theme.inputBackground, borderColor: theme.border }]}
          activeOpacity={0.85}
          onPress={() => navigation.navigate("Historial")}
        >
          <Icon name="folder-open" size={24} color={theme.primary} style={{ marginBottom: 5 }} />
          <Text style={[styles.cardTitle, { color: theme.primary }]}>Historial</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.miniCard, { backgroundColor: theme.inputBackground, borderColor: theme.border }]}
          activeOpacity={0.85}
          onPress={() => navigation.navigate("Configuracion")}
        >
          <Icon name="settings" size={24} color={theme.textSecondary} style={{ marginBottom: 5 }} />
          <Text style={[styles.cardTitle, { color: theme.textSecondary }]}>Configuración</Text>
        </TouchableOpacity>
        
        <View style={{ height: 16 }} />
        <Button title="Volver al Home" onPress={() => navigation.navigate("Home")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  card: {
    padding: 24,
    borderRadius: 24,
    width: "100%",
    maxWidth: 360,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 16,
    borderWidth: 3,               
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center"
  },
  text: {
    marginBottom: 6,
    textAlign: "center"
  },
  miniCard: {
    padding: 14,
    borderRadius: 14,
    marginTop: 10,
    alignItems: "center",
    width: "100%",
    borderWidth: 1,
  },
  cardTitle: {
    fontWeight: "bold"
  }
});
