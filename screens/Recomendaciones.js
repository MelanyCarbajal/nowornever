import React, { useState, useEffect } from "react";

import {  View,  Text,  StyleSheet,  ActivityIndicator,  ScrollView,} from "react-native";

import Button from "../components/Button";
import Header from "../components/Header";

export default function Recomendaciones({ navigation }) {


  const [mensaje, setMensaje] = useState("");
  const [autor, setAutor] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

 {/*api extenro*/}
  const obtenerMensaje = async () => {
    setLoading(true);

    setError(false);

    try {
      const response = await fetch(
        "https://official-joke-api.appspot.com/random_joke",
      );

      if (!response.ok) {
        throw new Error("Error API");
      }

      const data = await response.json();

      setMensaje(`${data.setup} ${data.punchline}`);

      setAutor("API Externa");
    } catch (error) {
      console.error(error);

      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerMensaje();
  }, []);

  return (
    <View style={styles.wrapper}>
      {/* HEADER */}
      <Header navigation={navigation} />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.title}>Mensajes Positivos</Text>

          <Text style={styles.subtitle}>
            Frases motivacionales en tiempo real para ayudarte a evitar la
            procrastinación.
          </Text>

          <View style={styles.messageContainer}>
            {loading ? (
              <ActivityIndicator size="large" color="#2563EB" />
            ) : error ? (
              <Text style={styles.errorText}>
                No se pudo conectar al servidor
              </Text>
            ) : (
              <>
                <Text style={styles.messageText}>"{mensaje}"</Text>

                <Text style={styles.authorText}>— {autor}</Text>
              </>
            )}
          </View>

          <View style={styles.buttonContainer}>
            <Button title="Obtener otro mensaje" onPress={obtenerMensaje} />
          </View>
        </View>
      </ScrollView>
    </View>
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

  card: {
    backgroundColor: "#FFFFFF",

    borderRadius: 24,

    padding: 24,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,

    elevation: 4,
  },

  title: {
    fontSize: 26,

    fontWeight: "bold",

    color: "#111827",

    textAlign: "center",

    marginBottom: 10,
  },

  subtitle: {
    fontSize: 14,

    color: "#6B7280",

    textAlign: "center",

    marginBottom: 30,

    lineHeight: 20,
  },

  messageContainer: {
    minHeight: 220,

    justifyContent: "center",
    alignItems: "center",
  },

  messageText: {
    fontSize: 20,

    color: "#2563EB",

    textAlign: "center",

    fontStyle: "italic",

    fontWeight: "600",

    marginBottom: 20,
  },

  authorText: {
    fontSize: 14,

    color: "#6B7280",
  },

  errorText: {
    color: "#EF4444",

    fontWeight: "500",

    textAlign: "center",
  },

  buttonContainer: {
    marginTop: 30,
  },
});
