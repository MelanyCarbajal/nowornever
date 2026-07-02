import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import Button from "../components/Button";
import Header from "../components/Header";
import { ThemeContext } from "../context/ThemeContext";

export default function Recomendaciones({ navigation }) {
  const { theme } = useContext(ThemeContext);
  const [mensaje, setMensaje] = useState("");
  const [autor, setAutor] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const obtenerConsejo = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await fetch("https://api.adviceslip.com/advice");
      if (!response.ok) throw new Error("Error API");
      const data = await response.json();
      setMensaje(data.slip.advice);
      setAutor("Consejo en tiempo real");
    } catch (error) {
      console.error("Error consumiendo API:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerConsejo();
  }, []);

  return (
    <View style={[styles.wrapper, { backgroundColor: theme.background }]}>
      <Header navigation={navigation} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <Text style={[styles.title, { color: theme.text }]}>Consejos Universitarios</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Recomendaciones dinámicas para mejorar tu productividad y evitar la procrastinación.
          </Text>

          <View style={styles.messageContainer}>
            {loading ? (
              <ActivityIndicator size="large" color={theme.primary} />
            ) : error ? (
              <Text style={[styles.errorText, { color: theme.danger }]}>No se pudo conectar al servidor</Text>
            ) : (
              <>
                <Text style={[styles.messageText, { color: theme.primary }]}>"{mensaje}"</Text>
                <Text style={[styles.authorText, { color: theme.textSecondary }]}>— {autor}</Text>
              </>
            )}
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Obtener otro consejo" onPress={obtenerConsejo} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  container: { flex: 1, padding: 20 },
  card: { borderRadius: 24, padding: 24, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 10, elevation: 4 },
  title: { fontSize: 26, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
  subtitle: { fontSize: 14, textAlign: "center", marginBottom: 30, lineHeight: 20 },
  messageContainer: { minHeight: 220, justifyContent: "center", alignItems: "center" },
  messageText: { fontSize: 20, textAlign: "center", fontStyle: "italic", fontWeight: "600", marginBottom: 20 },
  authorText: { fontSize: 14 },
  errorText: { fontWeight: "500", textAlign: "center" },
  buttonContainer: { marginTop: 30 },
});
