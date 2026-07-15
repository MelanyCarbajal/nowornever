import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator, Alert, SafeAreaView } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { Ionicons as Icon } from "@expo/vector-icons";
import { auth, db } from "../config/firebase";
import { doc, setDoc } from "firebase/firestore";

const imagenesResultados = {
  "Procrastinador Crónico": "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=500&q=80",
  "Evitador de tareas": "https://s1.abcstatics.com/media/bienestar/2022/09/13/procrastinar-kfvC--1248x698@abc.jpg",
  "Perfeccionista": "https://www.infobae.com/resizer/v2/WHF2EHNBNNHKPF5RJDPA27MIQM.png?auth=fc61b8c0a5d56b166ff4939baea0251da6fe22a84df227299091a1fe612bb897",
  "Inestable": "https://imgmedia.larepublica.pe/1000x590/larepublica/migration/images/S2T74FU5NVDSROM5OLTNLTXNFM.webp",
  "Productivo Constante": "https://www.entrenamientoimparables.com/wp-content/uploads/2024/08/tecnicas-de-productividad-para-estudiantes.webp",
};

export default function ResultadoTest({ route, navigation }) {
  const { theme } = useContext(ThemeContext);
  const { tipo, total, respuestas } = route.params;

  useEffect(() => {
    guardarEnBaseDeDatos();
  }, []);

  const guardarEnBaseDeDatos = () => {
    const user = auth.currentUser;
    if (user) {
     
      const userRef = doc(db, "users", user.uid);
      setDoc(userRef, {
        perfil_productividad: tipo,
        puntaje_test: total,
        respuestas_crudas: respuestas,
        fecha_test: new Date().toISOString()
      }, { merge: true }).catch(error => console.error("Error guardando test:", error));
    }
  };

  const guardarYSalir = () => {

    navigation.navigate("Tabs", { screen: "Perfil" });
  };

  const imageUrl = imagenesResultados[tipo] || imagenesResultados["Inestable"];

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>
      <View style={styles.container}>
        <Text style={[styles.headerText, { color: theme.text }]}>Resultado del Análisis</Text>

        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <Image source={{ uri: imageUrl }} style={styles.image} />
          
          <View style={styles.content}>
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>Tu perfil detectado es:</Text>
            <Text style={[styles.title, { color: theme.primary }]}>{tipo}</Text>
            
            <View style={styles.scoreBadge}>
              <Text style={styles.scoreText}>Puntaje: {total}/40</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={guardarYSalir}
          style={[styles.mainBtn, { backgroundColor: theme.primary }]}
          activeOpacity={0.8}
        >
          <Text style={styles.mainBtnText}>Ir a mi Perfil</Text>
          <Icon name="arrow-forward" size={18} color="white" style={{ marginLeft: 8 }} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.replace("TestProcrastinacion")}
          style={styles.secondaryBtn}
        >
          <Text style={[styles.secondaryBtnText, { color: theme.textSecondary }]}>Repetir el test</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    maxWidth: 500,
    alignSelf: "center"
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20
  },
  card: {
    width: "100%",
    borderRadius: 24,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 15,
    elevation: 8,
    marginBottom: 30
  },
  image: {
    width: "100%",
    height: 220,
    resizeMode: "cover"
  },
  content: {
    padding: 24,
    alignItems: "center"
  },
  subtitle: {
    fontSize: 14,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 8
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 16
  },
  scoreBadge: {
    backgroundColor: "#111827",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginBottom: 20
  },
  scoreText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14
  },
  savingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12
  },
  mainBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingVertical: 18,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5
  },
  mainBtnText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold"
  },
  secondaryBtn: {
    marginTop: 20,
    padding: 10
  },
  secondaryBtnText: {
    fontSize: 14,
    fontWeight: "600",
    textDecorationLine: "underline"
  }
});