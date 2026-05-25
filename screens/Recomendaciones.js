import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import Button from "../components/Button";

export default function NuevaSimulacion({ navigation }) {
  // Manejo de estados para el API
  const [consejo, setConsejo] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Funcionalidad para consumir el API
const obtenerRecomendacion = async () => {
  setLoading(true);
  setError(false);

  try {
    // API de frases
    const respuesta = await fetch(
      "https://dummyjson.com/quotes/random"
    );

    if (!respuesta.ok) {
      throw new Error("Error en la respuesta");
    }

    const datos = await respuesta.json();

    // Traducción automática
    const traduccion = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
        datos.quote
      )}&langpair=en|es`
    );

    const datosTraducidos = await traduccion.json();

    setConsejo(datosTraducidos.responseData.translatedText);

  } catch (error) {
    console.error("Hubo un error al consumir la API:", error);
    setError(true);

  } finally {
    setLoading(false);
  }
};


  // Llamar al API al cargar la pantalla
  useEffect(() => {
    obtenerRecomendacion();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        
        <Text style={styles.title}>
          Acciones Correctivas
        </Text>

        <Text style={styles.subtitle}>
          Un consejo en tiempo real para evitar tu Punto de No Retorno
        </Text>

        <View style={styles.apiContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#2563EB" />
          ) : error ? (
            <Text style={styles.errorText}>
              No pudimos conectar con el servidor
            </Text>
          ) : (
            <Text style={styles.consejoText}>
              {consejo}
            </Text>
          )}

          <View style={{ height: 20 }} />

          <Button
            title="Obtener otro consejo"
            onPress={obtenerRecomendacion}
          />
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 26,
    borderRadius: 20,
    width: "100%",
    maxWidth: 340,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    alignItems: "center",
  },

  title: {
    fontSize: 24,
    color: "#111827",
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },

  subtitle: {
    color: "#6B7280",
    marginBottom: 20,
    textAlign: "center",
    fontSize: 14,
  },

  apiContainer: {
    minHeight: 100,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },

  consejoText: {
    fontSize: 18,
    color: "#4A90E2",
    fontStyle: "italic",
    textAlign: "center",
    fontWeight: "600",
  },

  errorText: {
    fontSize: 14,
    color: "#EF4444",
    textAlign: "center",
  },
});