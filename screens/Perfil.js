import React, { useContext, useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, Alert, StyleSheet, ScrollView } from "react-native";
import Button from "../components/Button";
import { ThemeContext } from "../context/ThemeContext";
import { Ionicons as Icon } from "@expo/vector-icons";
import { signOut } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Perfil({ navigation }) {
  const { theme } = useContext(ThemeContext);
  const isFocused = useIsFocused();
  
  const [tipo, setTipo] = useState("Cargando...");
  const [userData, setUserData] = useState(auth.currentUser);
  const [fotoPerfil, setFotoPerfil] = useState(auth.currentUser?.photoURL || null);

  useEffect(() => {
    // Actualizar foto y nombre cuando volvamos de editar perfil al instante
    if (isFocused) {
      setUserData({ ...auth.currentUser });
      AsyncStorage.getItem("foto_perfil").then(cached => {
        if (cached) setFotoPerfil(cached);
      });
      AsyncStorage.getItem("pending_username").then(pending => {
        if (pending) setUserData(prev => ({ ...prev, displayName: pending }));
      });
    }
  }, [isFocused]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;


    AsyncStorage.getItem(`test_perfil_${user.uid}`).then(cached => {
      if (cached) setTipo(cached);
    });

    const unsubscribe = onSnapshot(doc(db, "users", user.uid), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        
        if (data.perfil_productividad) {
          setTipo(data.perfil_productividad);
          AsyncStorage.setItem(`test_perfil_${user.uid}`, data.perfil_productividad);
        } else {
          setTipo("Sin test realizado");
        }


        if (data.photoBase64) {
          setFotoPerfil(data.photoBase64);
          AsyncStorage.setItem("foto_perfil", data.photoBase64);
        } else if (data.photoURL) {
          setFotoPerfil(data.photoURL);
        }

        AsyncStorage.getItem("pending_username").then(pending => {
          if (data.username && !pending) {
            setUserData(prev => ({ ...prev, displayName: data.username }));
          }
        });

      } else {
        setTipo("Sin test realizado");
      }
    });

    return () => unsubscribe();
  }, []);

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
            source={fotoPerfil ? { uri: fotoPerfil } : require("../assets/6073873.png")}
            style={styles.image}
          />
          
          <TouchableOpacity 
            style={[styles.editBtn, { backgroundColor: theme.primary }]}
            onPress={() => navigation.navigate("EditarPerfil")}
          >
            <Icon name="pencil" size={16} color="#FFF" style={{ marginRight: 6 }} />
            <Text style={{ color: "#FFF", fontWeight: "bold", fontSize: 13 }}>Editar Perfil</Text>
          </TouchableOpacity>

          <Text style={[styles.title, { color: theme.text, marginTop: 14 }]}>
            {userData?.displayName || userData?.email || "Usuario"}
          </Text>

          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Perfil Psicológico:
          </Text>

          <Text style={[styles.tipo, { color: theme.primary }]}>
            {tipo}
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
  },

  editBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 5,
  }
});