import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Platform
} from "react-native";
import { ThemeContext } from "../context/ThemeContext";

const preguntas = [
  "¿Planificas tu día antes de empezar?",
  "¿Pospones tareas importantes?",
  "¿Eres perfeccionista?",
  "¿Te distraes fácilmente?",
  "¿Terminas lo que empiezas?",
  "¿Trabajas solo con presión?",
  "¿Rindes mejor bajo estrés?",
  "¿Eres constante en tu rutina?"
];

// Opciones interactivas del 1 al 5
const opciones = [
  { valor: 1, emoji: "😡", color: "#ef4444", label: "Nunca" },
  { valor: 2, emoji: "😒", color: "#f97316", label: "Poco" },
  { valor: 3, emoji: "😐", color: "#eab308", label: "A veces" },
  { valor: 4, emoji: "🙂", color: "#84cc16", label: "Casi" },
  { valor: 5, emoji: "🤩", color: "#22c55e", label: "Siempre" },
];

export default function TestProcrastinacion({ navigation }) {
  const { theme } = useContext(ThemeContext);
  const [respuestas, setRespuestas] = useState(Array(8).fill(null)); // Usar null para saber si no se ha respondido

  const setAnswer = (i, value) => {
    const copy = [...respuestas];
    copy[i] = value;
    setRespuestas(copy);
  };

  const calcular = () => {
    // Validar que todas estén respondidas
    if (respuestas.includes(null)) {
      alert("Por favor responde todas las preguntas para obtener tu perfil real.");
      return;
    }

    const total = respuestas.reduce((a, b) => a + b, 0);

    let tipo = "";
    if (total <= 12) tipo = "Procrastinador Crónico";
    else if (total <= 20) tipo = "Evitador de tareas";
    else if (total <= 28) tipo = "Perfeccionista";
    else if (total <= 34) tipo = "Inestable";
    else tipo = "Productivo Constante";

    navigation.navigate("ResultadoTest", {
      tipo,
      total,
      respuestas
    });
  };

  const respondidas = respuestas.filter((r) => r !== null).length;
  const progreso = (respondidas / preguntas.length) * 100;

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>🧠 Test de Productividad</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Descubre tu perfil y personaliza tu IA
          </Text>
        </View>

        {/* Barra de progreso interactiva */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBg}>
            <View style={[styles.progressFill, { width: `${progreso}%`, backgroundColor: theme.primary }]} />
          </View>
          <Text style={[styles.progressText, { color: theme.textSecondary }]}>
            Completado: {respondidas} de {preguntas.length}
          </Text>
        </View>

        {preguntas.map((p, i) => (
          <View key={i} style={[styles.card, { backgroundColor: theme.card, shadowColor: theme.text }]}>
            <Text style={[styles.question, { color: theme.text }]}>{i + 1}. {p}</Text>

            <View style={styles.optionsRow}>
              {opciones.map((op) => {
                const isSelected = respuestas[i] === op.valor;
                return (
                  <TouchableOpacity
                    key={op.valor}
                    onPress={() => setAnswer(i, op.valor)}
                    activeOpacity={0.7}
                    style={[
                      styles.optionBtn,
                      { backgroundColor: theme.inputBackground }, // color inactivo
                      isSelected && { backgroundColor: op.color, transform: [{ scale: 1.1 }] } // animacion simple
                    ]}
                  >
                    <Text style={styles.emoji}>{op.emoji}</Text>
                    {isSelected && <Text style={styles.labelTxt}>{op.label}</Text>}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}

        {/* BOTÓN CON ANIMACION DE COLOR */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: respondidas === preguntas.length ? theme.primary : theme.border }]}
          onPress={calcular}
          disabled={respondidas !== preguntas.length}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>
            {respondidas === preguntas.length ? "¡Ver mi resultado!" : "Faltan preguntas..."}
          </Text>
        </TouchableOpacity>

        {/* ESPACIO EXTRA PARA QUE NO LO TAPEN LAS TABS */}
        <View style={{ height: 80 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: {
    padding: 20,
    paddingBottom: Platform.OS === "android" ? 100 : 120,
    width: "100%",
    maxWidth: 600,
    alignSelf: "center" 
  },
  header: {
    alignItems: "center",
    marginBottom: 20
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center"
  },
  subtitle: {
    fontSize: 14,
    marginTop: 5,
    textAlign: "center"
  },
  progressContainer: {
    marginBottom: 25,
  },
  progressBg: {
    height: 10,
    backgroundColor: "#E5E7EB",
    borderRadius: 5,
    overflow: "hidden"
  },
  progressFill: {
    height: "100%",
    borderRadius: 5,
  },
  progressText: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: "600",
    textAlign: "right"
  },
  card: {
    marginBottom: 20,
    padding: 20,
    borderRadius: 16,
    elevation: 3,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  question: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 16
  },
  optionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  optionBtn: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 55,
    borderRadius: 12,
    padding: 5
  },
  emoji: {
    fontSize: 24,
  },
  labelTxt: {
    fontSize: 10,
    color: "white",
    fontWeight: "bold",
    marginTop: 2
  },
  button: {
    padding: 18,
    borderRadius: 16,
    marginTop: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold"
  }
});