import React, { useState, useContext } from "react";
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity, ScrollView, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Button from "../components/Button";
import { ThemeContext } from "../context/ThemeContext";

export default function NuevaSimulacion({ navigation }) {
  const { theme } = useContext(ThemeContext);
  const [objetivo, setObjetivo] = useState("");
  const [fechaLimite, setFechaLimite] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [horas, setHoras] = useState("");
  const [nivel, setNivel] = useState("");

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || fechaLimite;
    setShowDatePicker(Platform.OS === 'ios');
    setFechaLimite(currentDate);
  };

  const handleSimular = () => {
    if (!objetivo || !horas || !nivel) {
      Alert.alert("Campos incompletos", "Completa todos los campos.");
      return;
    }

    const horasNum = parseFloat(horas);
    const nivelNum = parseInt(nivel);

    if (isNaN(horasNum) || isNaN(nivelNum) || nivelNum < 1 || nivelNum > 10) {
      Alert.alert("Error", "Horas deben ser número. Nivel de 1 a 10.");
      return;
    }

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const limite = new Date(fechaLimite);
    limite.setHours(0, 0, 0, 0);

    const diasRestantes = Math.ceil((limite.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24));

    if (diasRestantes < 0) {
      Alert.alert("Fecha inválida", "La fecha límite ya pasó.");
      return;
    }

    const factorProcrastinacion = 1 - (nivelNum / 10) * 0.6;
    const factorSeguro = Math.max(0.1, Math.min(1, factorProcrastinacion));
    const horasEfectivas = horasNum * factorSeguro;
    const capacidadTotal = Math.max(1, diasRestantes) * 8; // asumiendo 8 horas max por día real
    const riesgoCalculado = (horasNum) / capacidadTotal * 100;
    const riesgoReal = Math.min(Math.max(riesgoCalculado * (nivelNum / 5), 10), 100);

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
      objetivo, diasRestantes, horasEfectivas, horasEnteras, minutos,
      riesgo: riesgoReal, estado, mensaje, sobrecarga: riesgoReal > 100,
    });
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]} contentContainerStyle={styles.scrollContent}>
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Text style={[styles.title, { color: theme.text }]}>Nueva Simulación</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          Ingresa los datos para predecir tu escenario y calcular el punto de no retorno.
        </Text>

        <TextInput
          style={[styles.input, { backgroundColor: theme.inputBackground, color: theme.text, borderColor: theme.border }]}
          placeholder="Objetivo (ej. Examen Final)"
          placeholderTextColor={theme.textSecondary}
          value={objetivo}
          onChangeText={setObjetivo}
        />

        <TouchableOpacity 
          style={[styles.input, { backgroundColor: theme.inputBackground, borderColor: theme.border, justifyContent: 'center' }]} 
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={{ color: theme.text }}>
            Fecha Límite: {fechaLimite.toISOString().split('T')[0]}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={fechaLimite}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onChangeDate}
            minimumDate={new Date()}
          />
        )}

        <TextInput
          style={[styles.input, { backgroundColor: theme.inputBackground, color: theme.text, borderColor: theme.border }]}
          placeholder="Horas que crees necesitar"
          placeholderTextColor={theme.textSecondary}
          keyboardType="numeric"
          value={horas}
          onChangeText={setHoras}
        />

        <TextInput
          style={[styles.input, { backgroundColor: theme.inputBackground, color: theme.text, borderColor: theme.border }]}
          placeholder="Nivel de procrastinación (1-10)"
          placeholderTextColor={theme.textSecondary}
          keyboardType="numeric"
          value={nivel}
          onChangeText={setNivel}
        />

        <View style={{ height: 20 }} />
        <Button title="Calcular Escenario" onPress={handleSimular} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    padding: 30,
    borderRadius: 24,
    width: "100%",
    maxWidth: 360,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center"
  },
  subtitle: {
    marginBottom: 24,
    textAlign: "center",
    fontSize: 14,
    lineHeight: 20
  },
  input: {
    padding: 16,
    borderRadius: 14,
    marginBottom: 16,
    width: "100%",
    borderWidth: 1,
    fontSize: 16,
  }
});

