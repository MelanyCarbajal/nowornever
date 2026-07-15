import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Alert, TextInput, Modal, Platform } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { Ionicons as Icon } from "@expo/vector-icons";
import { auth, db } from "../config/firebase";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { generarCalendarioLocal } from "../services/calendarGenerator";
import { enviarNotificacionLocal } from "../services/notificationService";
import { TimerContext } from "../context/TimerContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Calendario({ navigation }) {
  const { theme, isDarkMode } = useContext(ThemeContext);
  
  const [eventos, setEventos] = useState([]);
  const [loadingIA, setLoadingIA] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [editandoId, setEditandoId] = useState(null);
  const [tituloEdit, setTituloEdit] = useState("");

  useEffect(() => {
    cargarCalendarioGuardado();
  }, []);

  const cargarCalendarioGuardado = async () => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      const cached = await AsyncStorage.getItem(`calendario_${user.uid}`);
      if (cached) {
        setEventos(JSON.parse(cached));
        setInitialLoading(false);
      }

      //datos de firebase
      const docRef = doc(db, "users", user.uid, "datos_ia", "calendario");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists() && docSnap.data().eventos) {
        setEventos(docSnap.data().eventos);
        AsyncStorage.setItem(`calendario_${user.uid}`, JSON.stringify(docSnap.data().eventos));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setInitialLoading(false);
    }
  };

  const guardarCalendarioLocalYFirebase = async (nuevosEventos) => {
    setEventos(nuevosEventos);
    const user = auth.currentUser;
    if (user) {
      AsyncStorage.setItem(`calendario_${user.uid}`, JSON.stringify(nuevosEventos));
      await setDoc(doc(db, "users", user.uid, "datos_ia", "calendario"), { eventos: nuevosEventos }, { merge: true });
    }
  };

  const generarPlanLocal = async () => {
    const user = auth.currentUser;
    if (!user) return;

    setLoadingIA(true);
    try {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const userData = userDoc.exists() ? userDoc.data() : {};
      const simulaciones = userData.simulaciones || [];

      if (simulaciones.length === 0) {
        Alert.alert("Sin datos", "Crea al menos una simulación de escenario primero para que el sistema sepa qué objetivos tienes.");
        setLoadingIA(false);
        return;
      }
      const nuevosEventos = await generarCalendarioLocal(simulaciones);
      
      await guardarCalendarioLocalYFirebase(nuevosEventos);
      Alert.alert("¡Plan Generado!", "Tu horario ha sido estructurado automáticamente con base en tus simulaciones.");

    } catch (error) {
      Alert.alert("Error al generar", "Hubo un problema procesando tu calendario.");
    } finally {
      setLoadingIA(false);
    }
  };

  const iniciarEdicion = (evento) => {
    setEditandoId(evento.id);
    setTituloEdit(evento.titulo);
  };

  const guardarEdicion = (id) => {
    const nuevosEventos = eventos.map(e => e.id === id ? { ...e, titulo: tituloEdit } : e);
    guardarCalendarioLocalYFirebase(nuevosEventos);
    setEditandoId(null);
  };

  const eliminarEvento = (id) => {
    Alert.alert("Eliminar", "¿Seguro que quieres eliminar esta tarea?", [
      { text: "Cancelar", style: "cancel" },
      { 
        text: "Sí, eliminar", 
        style: "destructive",
        onPress: () => {
          const nuevosEventos = eventos.filter(e => e.id !== id);
          guardarCalendarioLocalYFirebase(nuevosEventos);
        }
      }
    ]);
  };

  const toggleCompletado = (id, completadoActualmente) => {
    const nuevosEventos = eventos.map(e => e.id === id ? { ...e, completado: !completadoActualmente } : e);
    guardarCalendarioLocalYFirebase(nuevosEventos);
    
    if (!completadoActualmente) {
      enviarNotificacionLocal(
        "¡Excelente trabajo! 🎯", 
        "Has completado una tarea de tu agenda. Cada paso te acerca a tu meta final.",
        1
      );

      // funcionalidad para agregar la camara para las evidencias 
    }
  };


  const { activeTimerId, timeLeft, iniciarTimerReal, detenerTimerGlobal } = useContext(TimerContext);
  const [timerModalVisible, setTimerModalVisible] = useState(false);
  const [timerMinutes, setTimerMinutes] = useState("25");
  const [pendingTimerId, setPendingTimerId] = useState(null);

  const abrirTimerModal = (id) => {
    setPendingTimerId(id);
    setTimerMinutes("25");
    setTimerModalVisible(true);
  };

  const iniciarTimerLocal = () => {
    const mins = parseInt(timerMinutes);
    if (isNaN(mins) || mins <= 0) {
      Alert.alert("Error", "Ingresa un número válido de minutos.");
      return;
    }
    iniciarTimerReal(pendingTimerId, mins);
    setTimerModalVisible(false);
    setPendingTimerId(null);
  };

  const confirmarDetenerTimer = () => {
    if (Platform.OS === 'web') {
      const confirmacion = window.confirm("¡Atención! ¿Seguro que quieres detener el cronómetro antes de tiempo? Estás rompiendo tu ciclo de concentración.\n\nPresiona OK para rendirte, o Cancelar para seguir trabajando.");
      if (confirmacion) {
        enviarNotificacionLocal("Ciclo interrumpido", "Detuviste el cronómetro antes de tiempo. ¡Intenta enfocarte más en la próxima!", 1);
        detenerTimerGlobal();
        
        // TODO (Gamificación): Reducir puntos de disciplina en Firebase aquí porque se rindió.
      }
      return;
    }

    Alert.alert(
      "¡Atención!", 
      "¿Seguro que quieres detener el cronómetro antes de tiempo? Estás rompiendo tu ciclo de concentración.",
      [
        { text: "Me rindo (Detener)", style: "destructive", onPress: () => {
            enviarNotificacionLocal("Ciclo interrumpido", "Detuviste el cronómetro antes de tiempo. ¡Intenta enfocarte más en la próxima!", 1);
            detenerTimerGlobal();
            
            // TODO (Gamificación): Reducir puntos de disciplina en Firebase aquí porque se rindió.
        }},
        { text: "Seguir trabajando", style: "cancel" }
      ]
    );
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const getEventColor = (tipo) => {
    if (tipo === "crítico") return theme.danger;
    if (tipo === "moderado") return theme.warning;
    return theme.success;
  };

  if (initialLoading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background, justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]} showsVerticalScrollIndicator={false}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={[styles.backBtn, { backgroundColor: theme.primary }]}
        activeOpacity={0.8}>
        <Icon name="arrow-back" size={20} color="#FFFFFF" style={{ marginRight: 6 }} />
        <Text style={styles.backText}>Volver</Text>
      </TouchableOpacity>

      <Text style={[styles.title, { color: theme.text }]}>Mi Calendario</Text>
      
      <View style={[styles.card, { backgroundColor: theme.primary }]}>
        <View style={styles.cardHeader}>
          <Icon name="calendar-outline" size={32} color="#FFFFFF" />
          <Text style={styles.mesTexto}>Planificador Automático</Text>
        </View>
        <Text style={styles.resumenTexto}>Genera un plan de acción organizado automáticamente en base a todas tus simulaciones actuales.</Text>
        
        <TouchableOpacity 
          style={styles.iaButton}
          activeOpacity={0.8}
          onPress={generarPlanLocal}
          disabled={loadingIA}
        >
          {loadingIA ? (
            <ActivityIndicator size="small" color={theme.primary} />
          ) : (
            <>
              <Icon name="flash-outline" size={20} color={theme.primary} style={{ marginRight: 8 }} />
              <Text style={[styles.iaButtonText, { color: theme.primary }]}>Generar Plan Automático</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      <Text style={[styles.sectionTitle, { color: theme.text }]}>Tu Plan de Acción</Text>

      {eventos.length === 0 && !loadingIA && (
        <Text style={{ color: theme.textSecondary, textAlign: 'center', marginTop: 20 }}>
          Aún no tienes tareas programadas. Presiona el botón superior para crear tu plan de acción.
        </Text>
      )}

      {eventos.map((evento) => (
        <View 
          key={evento.id} 
          style={[
            styles.eventoItem, 
            { backgroundColor: theme.card, opacity: evento.completado ? 0.6 : 1 }
          ]}
        >
          {/* CHECKBOX */}
          <TouchableOpacity 
            style={styles.checkbox} 
            onPress={() => toggleCompletado(evento.id, evento.completado)}
          >
            <Icon 
              name={evento.completado ? "checkmark-circle" : "ellipse-outline"} 
              size={28} 
              color={evento.completado ? theme.success : theme.textSecondary} 
            />
          </TouchableOpacity>

          <View style={[styles.fechaBox, { backgroundColor: theme.inputBackground }]}>
            <Text style={[styles.fechaDia, { color: theme.text, fontSize: 16 }]}>{evento.fecha.split(" ")[0]}</Text>
            <Text style={[styles.fechaMes, { color: theme.textSecondary, fontSize: 11 }]}>{evento.fecha.split(" ")[1]}</Text>
          </View>
          
          <View style={styles.eventoDetalle}>
            {editandoId === evento.id ? (
              <TextInput 
                style={[styles.editInput, { color: theme.text, borderColor: theme.primary }]}
                value={tituloEdit}
                onChangeText={setTituloEdit}
                autoFocus
              />
            ) : (
              <Text 
                style={[
                  styles.eventoTitulo, 
                  { 
                    color: theme.text, 
                    textDecorationLine: evento.completado ? 'line-through' : 'none' 
                  }
                ]}
              >
                {evento.titulo}
              </Text>
            )}
            
            <View style={styles.tipoRow}>
              <View style={[styles.dot, { backgroundColor: getEventColor(evento.tipo) }]} />
              <Text style={[styles.eventoTipo, { color: theme.textSecondary }]}>{evento.tipo}</Text>
            </View>
          </View>

          {/* TIMER / ACCIONES SECUNDARIAS */}
          {activeTimerId === evento.id ? (
            <TouchableOpacity onPress={confirmarDetenerTimer} style={styles.timerBtnActive}>
              <Text style={styles.timerTextActive}>{formatTime(timeLeft)}</Text>
              <Icon name="stop" size={16} color="#FFFFFF" style={{ marginLeft: 4 }} />
            </TouchableOpacity>
          ) : !evento.completado && (
            <TouchableOpacity onPress={() => abrirTimerModal(evento.id)} style={styles.timerBtn}>
              <Icon name="play" size={18} color={theme.primary} />
            </TouchableOpacity>
          )}

          <View style={styles.actionButtons}>
            {editandoId === evento.id ? (
              <TouchableOpacity onPress={() => guardarEdicion(evento.id)} style={styles.iconBtn}>
                <Icon name="checkmark" size={22} color={theme.success} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => iniciarEdicion(evento)} style={styles.iconBtn}>
                <Icon name="pencil" size={20} color={theme.textSecondary} />
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={() => eliminarEvento(evento.id)} style={styles.iconBtn}>
              <Icon name="trash" size={20} color={theme.danger} />
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <View style={{ height: 40 }} />
      
      {/* MODAL DE TIEMPO DEL POMODORO */}
      <Modal visible={timerModalVisible} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>¿Cuánto tiempo te enfocarás?</Text>
            
            <TextInput
              style={[styles.modalInput, { backgroundColor: theme.inputBackground, color: theme.text, borderColor: theme.border, textAlign: 'center', fontSize: 28, fontWeight: 'bold' }]}
              value={timerMinutes}
              onChangeText={setTimerMinutes}
              keyboardType="numeric"
              maxLength={3}
            />
            <Text style={{textAlign: 'center', color: theme.textSecondary, marginBottom: 24}}>Minutos</Text>

            <View style={styles.modalActions}>
              <TouchableOpacity style={[styles.modalBtn, { backgroundColor: theme.border }]} onPress={() => setTimerModalVisible(false)}>
                <Text style={{ color: theme.text, fontWeight: 'bold' }}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalBtn, { backgroundColor: theme.primary }]} onPress={iniciarTimerLocal}>
                <Text style={{ color: '#FFF', fontWeight: 'bold' }}>¡Empezar!</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  backBtn: { flexDirection: "row", alignItems: "center", alignSelf: "flex-start", paddingVertical: 10, paddingHorizontal: 14, borderRadius: 14, marginBottom: 16, shadowColor: "#000", shadowOpacity: 0.15, shadowRadius: 6, elevation: 5 },
  backText: { color: "#FFFFFF", fontWeight: "700", fontSize: 14 },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 20 },
  card: { padding: 24, borderRadius: 24, marginBottom: 24, shadowOpacity: 0.2, shadowRadius: 10, elevation: 5 },
  cardHeader: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  mesTexto: { fontSize: 22, fontWeight: "bold", color: "#FFFFFF", marginLeft: 10 },
  resumenTexto: { color: "#DBEAFE", fontSize: 14, lineHeight: 20, marginBottom: 20 },
  iaButton: { backgroundColor: "#FFFFFF", flexDirection: "row", justifyContent: "center", alignItems: "center", padding: 14, borderRadius: 16, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  iaButtonText: { fontSize: 16, fontWeight: "bold" },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 16 },
  eventoItem: { flexDirection: "row", padding: 16, borderRadius: 18, marginBottom: 12, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 8, elevation: 3, alignItems: "center" },
  fechaBox: { width: 55, height: 55, borderRadius: 14, justifyContent: "center", alignItems: "center", marginRight: 16 },
  fechaDia: { fontWeight: "bold" },
  fechaMes: { textTransform: "uppercase", marginTop: 2 },
  eventoDetalle: { flex: 1, marginRight: 10 },
  eventoTitulo: { fontSize: 15, fontWeight: "bold", marginBottom: 6 },
  editInput: { borderWidth: 1, borderRadius: 8, padding: 4, fontSize: 15, marginBottom: 6 },
  tipoRow: { flexDirection: "row", alignItems: "center" },
  dot: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
  eventoTipo: { fontSize: 12, textTransform: "capitalize" },
  actionButtons: { flexDirection: "row", alignItems: "center" },
  iconBtn: { padding: 6, marginLeft: 2 },
  checkbox: { marginRight: 12, justifyContent: "center", alignItems: "center" },
  timerBtn: { padding: 8, backgroundColor: "rgba(0,0,0,0.05)", borderRadius: 12, marginRight: 8 },
  timerBtnActive: { flexDirection: "row", paddingHorizontal: 12, paddingVertical: 8, backgroundColor: "#E11D48", borderRadius: 12, marginRight: 8, alignItems: "center" },
  timerTextActive: { color: "#FFFFFF", fontWeight: "bold", fontSize: 14 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalContent: { width: '100%', maxWidth: 350, padding: 24, borderRadius: 20, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 10, elevation: 10 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  modalInput: { padding: 12, borderWidth: 1, borderRadius: 10, marginBottom: 5 },
  modalActions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  modalBtn: { flex: 1, padding: 14, borderRadius: 12, alignItems: 'center', marginHorizontal: 5 }
});
