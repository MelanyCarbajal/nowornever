import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  Image,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import Button from "../components/Button";
import { ThemeContext } from "../context/ThemeContext";

export default function NuevaSimulacion({ navigation, route = {} }) {
  const foto = route?.params?.foto;
  const { theme } = useContext(ThemeContext);

  // HOY (normalizado)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [objetivo, setObjetivo] = useState("");
  const [fechaLimite, setFechaLimite] = useState(today);
  const [fechaTexto, setFechaTexto] = useState(
    today.toISOString().split("T")[0]
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [horas, setHoras] = useState("");
  const [nivel, setNivel] = useState("");

  // FIX PICKER
  const onChangeDate = (event, selectedDate) => {
    if (Platform.OS !== "ios") {
      setShowDatePicker(false);
    }
    if (event.type === "dismissed") return;
    if (!selectedDate) return;

    const cleanDate = new Date(selectedDate);
    cleanDate.setHours(0, 0, 0, 0);

    if (cleanDate < today) {
      Alert.alert("Fecha inválida", "No puedes seleccionar fechas pasadas.");
      return;
    }
    setFechaLimite(cleanDate);
    setFechaTexto(
      cleanDate.toISOString().split("T")[0]
    );
  };

  const handleSimular = () => {
    console.log("CLICK SIMULAR");

    if (!objetivo.trim() || !horas.trim() || !nivel.trim()) {
      Alert.alert("Campos incompletos", "Completa todos los campos.");
      return;
    }

    const horasNumero = Number(horas);
    const nivelNumero = Number(nivel);

    if (horasNumero <= 0 || nivelNumero <= 0) {
      Alert.alert("Error", "Horas y nivel deben ser mayores a 0");
      return;
    }

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const fecha = new Date(fechaLimite);
    fecha.setHours(0, 0, 0, 0);

    const diasRestantes = Math.max(
      0,
      Math.ceil((fecha - hoy) / (1000 * 60 * 60 * 24))
    );

    const horasEfectivas = diasRestantes * horasNumero;

    const riesgo = Math.min(100, nivelNumero * 10);

    let estado = "";
    let mensaje = "";

    if (riesgo <= 30) {
      estado = "✅ Vas bien";
      mensaje = "Continúa con tu ritmo.";
    } else if (riesgo <= 60) {
      estado = "⚠️ Vas justo";
      mensaje = "Organiza mejor tus horas.";
    } else if (riesgo <= 80) {
      estado = "🟠 Alto riesgo";
      mensaje = "Empieza cuanto antes.";
    } else {
      estado = "🔴 Muy alto riesgo";
      mensaje = "Necesitas actuar inmediatamente.";
    }

    navigation.navigate("Resultado", {
      objetivo,
      diasRestantes,
      horasEfectivas,
      riesgo,
      estado,
      mensaje,
    });
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background }}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Text style={[styles.title, { color: theme.text }]}>
          Nueva Simulación
        </Text>

        {/* OBJETIVO */}
        <TextInput
          style={[
            styles.input,
            {
              color: theme.text,
              backgroundColor: theme.inputBackground,
              borderColor: theme.border,
            },
          ]}
          placeholder="Objetivo"
          placeholderTextColor={theme.textSecondary}
          value={objetivo}
          onChangeText={setObjetivo}
        />

        {Platform.OS === "web" ? (
          <TextInput
            style={[
              styles.input,
              {
                color: theme.text,
                backgroundColor: theme.inputBackground,
                borderColor: theme.border,
              },
            ]}
            placeholder="AAAA-MM-DD"
            placeholderTextColor={theme.textSecondary}
            value={fechaTexto}
            onChangeText={(text) => {
              setFechaTexto(text);

              if (text.length !== 10) return;

              const parsed = new Date(text);

              if (isNaN(parsed.getTime())) return;

              parsed.setHours(0, 0, 0, 0);

              if (parsed < today) {
                Alert.alert(
                  "Fecha inválida",
                  "No puedes usar fechas pasadas."
                );
                return;
              }

              setFechaLimite(parsed);
            }}
          />
        ) : (
          <>
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              style={[
                styles.input,
                {
                  justifyContent: "center",
                  backgroundColor: theme.inputBackground,
                  borderColor: theme.border,
                },
              ]}
            >
              <Text style={{ color: theme.text }}>
                📅 Fecha: {fechaLimite.toLocaleDateString()}
              </Text>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={fechaLimite}
                mode="date"
                display="default"
                minimumDate={today}
                onChange={onChangeDate}
              />
            )}
          </>
        )}

        {/* HORAS */}
        <TextInput
          style={[
            styles.input,
            {
              color: theme.text,
              backgroundColor: theme.inputBackground,
              borderColor: theme.border,
            },
          ]}
          placeholder="Horas"
          placeholderTextColor={theme.textSecondary}
          keyboardType="numeric"
          value={horas}
          onChangeText={setHoras}
        />

        {/* NIVEL */}
        <TextInput
          style={[
            styles.input,
            {
              color: theme.text,
              backgroundColor: theme.inputBackground,
              borderColor: theme.border,
            },
          ]}
          placeholder="Nivel (1-10)"
          placeholderTextColor={theme.textSecondary}
          keyboardType="numeric"
          value={nivel}
          onChangeText={setNivel}
        />

        {/* BOTÓN CÁMARA */}
        <TouchableOpacity
          style={styles.cameraBtn}
          onPress={() => navigation.navigate("CamaraEvidencia")}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
            📸 Tomar evidencia
          </Text>
        </TouchableOpacity>

        {/* PREVIEW DE FOTO */}
        {foto && (
          <View style={{ marginBottom: 15, alignItems: "center" }}>
            <Image
              source={{ uri: foto }}
              style={{ width: 200, height: 200, borderRadius: 15 }}
            />
            <Text style={{ color: theme.text, marginTop: 5 }}>
              📸 Evidencia agregada
            </Text>
          </View>
        )}

        {/* BOTÓN SIMULAR */}
        <Button title="Calcular Escenario" onPress={handleSimular} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "stretch",
  },
  card: {
    padding: 25,
    borderRadius: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    padding: 14,
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 15,
  },
  cameraBtn: {
    backgroundColor: "#000",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 15,
  },
});
