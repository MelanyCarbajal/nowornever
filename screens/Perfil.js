import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView
} from "react-native";

import Button from "../components/Button";
import { ThemeContext } from "../context/ThemeContext";
import { Ionicons as Icon } from "@expo/vector-icons";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";

export default function Perfil({ navigation, route }) {
  const { theme } = useContext(ThemeContext);

  const [tipo, setTipo] = useState(null);

  // seguridad total
  useEffect(() => {
    if (route?.params?.tipo) {
      setTipo(route.params.tipo);
    }
  }, [route]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      Alert.alert("Sesión cerrada", "Hasta pronto 👋");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.background }}>
      <View style={styles.container}>

        {/* CARD PERFIL */}
        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <Image
            source={require("../assets/6073873.png")}
            style={styles.image}
          />

          <Text style={[styles.title, { color: theme.text }]}>
            Perfil del usuario
          </Text>

          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Categoría:
          </Text>

          <Text style={[styles.tipo]}>
            {tipo || "Sin test realizado"}
          </Text>
        </View>

        {/* CARDS MENU */}
        <View style={styles.grid}>

          <TouchableOpacity
            style={[styles.cardBtn, { backgroundColor: theme.card }]}
            onPress={() => navigation.navigate("Estadisticas")}
          >
            <Icon name="bar-chart" size={26} color={theme.primary} />
            <Text style={[styles.cardText, { color: theme.text }]}>
              Estadísticas
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.cardBtn, { backgroundColor: theme.card }]}
            onPress={() => navigation.navigate("Historial")}
          >
            <Icon name="folder-open" size={26} color={theme.primary} />
            <Text style={[styles.cardText, { color: theme.text }]}>
              Historial
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.cardBtn, { backgroundColor: theme.card }]}
            onPress={() => navigation.navigate("TestProcrastinacion")}
          >
            <Icon name="refresh" size={26} color={theme.primary} />
            <Text style={[styles.cardText, { color: theme.text }]}>
              Rehacer Test
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.cardBtn, { backgroundColor: theme.card }]}
            onPress={() => navigation.navigate("Configuracion")}
          >
            <Icon name="settings" size={26} color={theme.primary} />
            <Text style={[styles.cardText, { color: theme.text }]}>
              Configuración
            </Text>
          </TouchableOpacity>

        </View>

        {/* LOGOUT */}
        <View style={{ marginTop: 20 }}>
          <Button
            title="Cerrar sesión"
            variant="danger"
            onPress={handleLogout}
          />
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center"
  },

  card: {
    width: "100%",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 20,
    elevation: 3
  },

  image: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
    borderWidth: 2,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold"
  },

  subtitle: {
    marginTop: 5
  },

  tipo: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5
  },

  grid: {
    width: "100%",
    gap: 12
  },

  cardBtn: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    gap: 12
  },

  cardText: {
    fontSize: 16,
    fontWeight: "600"
  }
});