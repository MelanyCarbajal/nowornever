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
import { auth, db } from "../config/firebase";
import { doc, setDoc, arrayUnion } from "firebase/firestore";

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
  const [guardando, setGuardando] = useState(false);


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

  const handleSimular = async () => {
    if (!objetivo.trim() || !horas.trim() || !nivel.trim()) {
      Alert.alert("Campos incompletos", "Por favor, completa todos los campos.");
      return;
    }

    const horasNumero = Number(horas);
    const nivelNumero = Number(nivel);

    if (isNaN(horasNumero) || isNaN(nivelNumero) || horasNumero <= 0 || nivelNumero <= 0) {
      Alert.alert("Datos inválidos", "Las horas y el nivel de distracción deben ser números mayores a 0.");
      return;
    }

    setGuardando(true);

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
      estado = "✅ Vas excelente";
      mensaje = "Tus horas efectivas son más que suficientes. Tienes margen de sobra para cumplir tu objetivo, ¡incluso si te tomas un descanso!";
    } else if (riesgo <= 60) {
      estado = "⚠️ Vas justo";
      mensaje = "Estás a tiempo, pero no te confíes. Si procrastinas un poco más o te distraes, empezarás a estar en peligro de no terminar.";
    } else if (riesgo <= 80) {
      estado = "🟠 Alto riesgo";
      mensaje = "Alerta roja. El tiempo se te agota y tus distracciones te están pasando factura. Tienes que empezar HOY mismo o no llegarás.";
    } else {
      estado = "🔴 Punto Crítico";
      mensaje = "¡Peligro inminente! Matemáticamente, el tiempo ya no te da si sigues a este ritmo. Tienes que eliminar toda distracción de inmediato.";
    }

    const simulacionData = {
      objetivo,
      diasRestantes,
      horasEfectivas,
      riesgo,
      estado,
      mensaje,
      fechaRegistro: new Date().toISOString()
    };

    navigation.navigate("Resultado", simulacionData);

    // TODO (Notificaciones Autónomas):
    // 1. Aquí se debe calcular matemáticamente el "Punto de No Retorno" (ej. restando las horasEfectivas a la fechaLimite).
    // 2. Utilizaricaciones para programar una notificación push local a esa hora y fecha exacta.
    // 3. El mensaje debe ser: "¡ÚLTIMA OPORTUNIDAD! Empieza ahora o amanecerás."

    setObjetivo("");
    setHoras("");
    setNivel("");
    setFechaLimite(hoy);
    setFechaTexto(hoy.toISOString().split("T")[0]);


    try {
      const user = auth.currentUser;
      if (user) {
        simulacionData.id = Date.now().toString(); 
        await setDoc(doc(db, "users", user.uid), {
          simulaciones: arrayUnion(simulacionData)
        }, { merge: true });
      }
    } catch (error) {
      console.error("Error silencioso guardando simulación", error);
    }
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

        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          Calcula matemáticamente si estás a tiempo de cumplir tu objetivo o si te acercas a una crisis.
        </Text>

        {/* OBJETIVO */}
        <Text style={[styles.label, { color: theme.text }]}>¿Qué necesitas terminar?</Text>
        <TextInput
          style={[
            styles.input,
            {
              color: theme.text,
              backgroundColor: theme.inputBackground,
              borderColor: theme.border,
            },
          ]}
          placeholder="Ej. Proyecto final, Informe de historia..."
          placeholderTextColor={theme.textSecondary}
          value={objetivo}
          onChangeText={setObjetivo}
        />

        {/* FECHA LÍMITE */}
        <Text style={[styles.label, { color: theme.text, marginTop: 5 }]}>¿Para cuándo es?</Text>
        {Platform.OS === "web" ? (
          React.createElement('input', {
            type: 'date',
            style: {
              padding: '14px',
              borderRadius: '12px',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: theme.border,
              backgroundColor: theme.inputBackground,
              color: theme.text,
              marginBottom: '15px',
              fontSize: '16px',
              fontFamily: 'inherit',
              outline: 'none'
            },
            value: fechaTexto,
            min: new Date().toISOString().split("T")[0],
            onChange: (e) => {
              const text = e.target.value;
              setFechaTexto(text);
              if (text) {

                const parsed = new Date(text + "T00:00:00");
                setFechaLimite(parsed);
              }
            }
          })
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
        <Text style={[styles.label, { color: theme.text, marginTop: 5 }]}>¿Cuántas horas diarias le vas a dedicar?</Text>
        <TextInput
          style={[
            styles.input,
            {
              color: theme.text,
              backgroundColor: theme.inputBackground,
              borderColor: theme.border,
            },
          ]}
          placeholder="Ej. 2"
          placeholderTextColor={theme.textSecondary}
          keyboardType="numeric"
          value={horas}
          onChangeText={setHoras}
        />

        {/* NIVEL */}
        <Text style={[styles.label, { color: theme.text, marginTop: 5 }]}>Del 1 al 10, ¿qué tanto te distraes? (Celular, redes)</Text>
        <TextInput
          style={[
            styles.input,
            {
              color: theme.text,
              backgroundColor: theme.inputBackground,
              borderColor: theme.border,
            },
          ]}
          placeholder="1 = Muy poco, 10 = Demasiado"
          placeholderTextColor={theme.textSecondary}
          keyboardType="numeric"
          value={nivel}
          onChangeText={setNivel}
        />

        {/* EXPLICACIÓN PUNTO DE NO RETORNO */}
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>⚠️ Punto de No Retorno</Text>
          <Text style={[styles.infoText, { color: theme.textSecondary }]}>
            Es el momento matemático exacto donde, si no empiezas a trabajar de inmediato, será físicamente imposible terminar tu tarea a tiempo (obligándote a amanecerte).
          </Text>
        </View>

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
        <Button 
          title="Calcular Escenario" 
          onPress={handleSimular} 
          disabled={guardando}
        />
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
  subtitle: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: "center",
    lineHeight: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
    marginLeft: 4,
  },
  infoBox: {
    backgroundColor: "rgba(255, 165, 0, 0.15)",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: "orange",
  },
  infoTitle: {
    fontWeight: "bold",
    color: "orange",
    fontSize: 15,
    marginBottom: 6,
  },
  infoText: {
    fontSize: 13,
    lineHeight: 18,
  },
});
