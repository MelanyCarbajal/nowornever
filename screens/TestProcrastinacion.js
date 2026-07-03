import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Platform
} from "react-native";

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

export default function TestProcrastinacion({ navigation }) {
  const [respuestas, setRespuestas] = useState(Array(8).fill(0));

  const setAnswer = (i, value) => {
    const copy = [...respuestas];
    copy[i] = value;
    setRespuestas(copy);
  };

  const calcular = () => {
    const total = respuestas.reduce((a, b) => a + b, 0);

    let tipo = "";

    if (total <= 12) tipo = "🟡 Procrastinador Crónico";
    else if (total <= 20) tipo = "🔴 Evitador de tareas";
    else if (total <= 28) tipo = "🟠 Perfeccionista";
    else if (total <= 34) tipo = "🔵 Inestable";
    else tipo = "🟢 Productivo Constante";

    navigation.navigate("ResultadoTest", {
      tipo,
      total,
      respuestas
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>🧠 Test de Productividad</Text>

        {preguntas.map((p, i) => (
          <View key={i} style={styles.card}>
            <Text style={styles.question}>{p}</Text>

            <View style={styles.options}>
              {[0, 1, 2, 3, 4, 5].map((n) => (
                <TouchableOpacity
                  key={n}
                  onPress={() => setAnswer(i, n)}
                  style={[
                    styles.option,
                    respuestas[i] === n && styles.optionSelected
                  ]}
                >
                  <Text style={styles.optionText}>{n}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* BOTÓN */}
        <TouchableOpacity style={styles.button} onPress={calcular}>
          <Text style={styles.buttonText}>Ver resultado</Text>
        </TouchableOpacity>

        {/* ESPACIO EXTRA PARA QUE NO LO TAPEN LAS TABS */}
        <View style={{ height: 80 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f5f6fa"
  },
  container: {
    padding: 20,
    paddingBottom: Platform.OS === "android" ? 100 : 120
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20
  },
  card: {
    marginBottom: 18,
    padding: 15,
    borderRadius: 12,
    backgroundColor: "white",
    elevation: 2
  },
  question: {
    fontSize: 15,
    marginBottom: 10
  },
  options: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  option: {
    padding: 10,
    marginRight: 6,
    borderRadius: 8,
    backgroundColor: "#ccc"
  },
  optionSelected: {
    backgroundColor: "#111"
  },
  optionText: {
    color: "white",
    fontWeight: "bold"
  },
  button: {
    backgroundColor: "#22c55e",
    padding: 16,
    borderRadius: 12,
    marginTop: 20
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold"
  }
});