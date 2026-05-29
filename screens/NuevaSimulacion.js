import React, { useState } from "react";
import { View, Text, TextInput, Alert, StyleSheet } from "react-native";
import Button from "../components/Button";

export default function NuevaSimulacion({ navigation }) {
  const [objetivo, setObjetivo] = useState("");
  const [fechaLimite, setFechaLimite] = useState("");
  const [horas, setHoras] = useState("");
  const [nivel, setNivel] = useState("");

  const handleSimular = () => {
    if (!objetivo || !fechaLimite || !horas || !nivel) {
      Alert.alert("Campos incompletos", "Completa todos los campos.");
      return;
    }

    const horasNum = parseFloat(horas);
    const nivelNum = parseInt(nivel);

    if (isNaN(horasNum) || isNaN(nivelNum)) {
      Alert.alert("Error", "Horas y nivel deben ser números válidos");
      return;
    }

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const limite= new Date(fechaLimite);
    limite.setHours(0,0,0,0);

    if (isNaN(limite.getTime())) {
      Alert.alert("Error", "Formato de fecha inválido (YYYY-MM-DD)");
      return;
    }

    const diasRestantes = Math.ceil(
      (limite.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diasRestantes < 0) {
      Alert.alert("Fecha inválida", "La fecha ya pasó");
      return;
    }

    // productividad real
    const factorProcrastinacion = 1 - (nivelNum / 10) * 0.6;
    const factorSeguro = Math.max(0.1, Math.min(1, factorProcrastinacion));

    const horasEfectivas = horasNum * factorSeguro;

    // capacidad total disponible
   

    
    // riesgo (comparación interna)
    const capacidadTotal= Math.max(1, diasRestantes) * horasEfectivas;
    const riesgoCalculado= (horasNum * 3) / capacidadTotal *100;
    //Limitar riesgo a 100%
    const riesgoReal= Math.min(riesgoCalculado, 100);

    let estado = "";
    let mensaje = "";

    if (riesgoReal < 60) {
      estado = "Vas bien 🟢";
      mensaje = "Tienes buen margen de tiempo";
    } else if (riesgoReal < 85) {
      estado = "Vas justo 🟡";
      mensaje = "Organízate mejor";
    } else if (riesgoReal <= 100) {
      estado = "Muy justo 🔴";
      mensaje = "Estás al límite";
    } else {
      estado = "No te alcanza ⚫";
      mensaje = "Necesitas más tiempo o menos carga";
    }

    const horasEnteras = Math.floor(horasEfectivas);
    const minutos = Math.round((horasEfectivas - horasEnteras) * 60);

    navigation.navigate("Resultado", {
      objetivo,
      diasRestantes,
      horasEfectivas,
      horasEnteras,
      minutos,
      riesgo: riesgoReal,
      estado,
      mensaje,
      sobrecarga: riesgoReal > 100,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Nueva Simulación</Text>
        <Text style={styles.subtitle}>
          Ingresa los datos para predecir tu escenario y calcular el punto de no retorno.
        </Text>


        <TextInput
          style={styles.input}
          placeholder="Objetivo (ej. Examen Final)"
          value={objetivo}
          onChangeText={setObjetivo}
        />

        <TextInput
          style={styles.input}
          placeholder="Fecha Límite YYYY-MM-DD (2026-10-30)"
          value={fechaLimite}
          onChangeText={setFechaLimite}
        />

        <TextInput
          style={styles.input}
          placeholder="Horas disponibles"
          keyboardType="numeric"
          value={horas}
          onChangeText={setHoras}
        />

        <TextInput
          style={styles.input}
          placeholder="Nivel de procrastinación (1-10)"
          keyboardType="numeric"
          value={nivel}
          onChangeText={setNivel}
        />

        <View style={{ height: 10 }} />

        <Button
          title="Calcular Escenario"
          onPress={handleSimular}
        />
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
    padding: 20
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
    elevation: 3
  },
  title: {
    fontSize: 24,
    color: "#111827",
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center"
  },
  subtitle: {
    color: "#6B7280",
    marginBottom: 20,
    textAlign: "center",
    fontSize: 14
  },
  input: {
    backgroundColor: "#F3F4F6",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    width: "100%",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    color: "#111827"
  }
});

