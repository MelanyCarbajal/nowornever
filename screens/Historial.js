import React, { useContext, useEffect, useState, memo, useCallback } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, Modal, TextInput, Platform, Alert } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { Ionicons as Icon } from "@expo/vector-icons";
import { auth, db } from "../config/firebase";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SimulacionCard = memo(({ item, index, total, theme, isDarkMode, onEdit }) => {
  const color = item.riesgo < 60 ? theme.success : item.riesgo < 85 ? theme.warning : theme.danger;
  const bgBadge = isDarkMode ? color + "30" : color;
  const textBadge = isDarkMode ? color : "#FFFFFF";

  return (
    <TouchableOpacity activeOpacity={0.9} style={[styles.card, { backgroundColor: theme.card }]}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={[styles.iconBox, { backgroundColor: theme.inputBackground }]}>
          <Icon name="flag" size={24} color={theme.primary} />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={[styles.objetivo, { color: theme.text }]} numberOfLines={1}>
            {item.objetivo}
          </Text>
          <Text style={[styles.fecha, { color: theme.textSecondary }]}>Simulación #{total - index}</Text>
        </View>

        <View style={[styles.badge, { backgroundColor: bgBadge, marginRight: 10 }]}>
          <Text style={[styles.badgeText, { color: textBadge }]}>{item.riesgo.toFixed(0)}%</Text>
        </View>

        <TouchableOpacity onPress={() => onEdit(item)} style={styles.editBtn}>
          <Icon name="pencil" size={20} color={theme.textSecondary} />
        </TouchableOpacity>
      </View>

      {/* DIVIDER */}
      <View style={[styles.divider, { backgroundColor: theme.border }]} />

      {/* INFO */}
      <View style={styles.infoContainer}>
        <View style={styles.infoBox}>
          <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>Estado</Text>
          <Text style={[styles.estado, { color: theme.text }]} numberOfLines={1}>{item.estado}</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>Riesgo</Text>
          <Text style={[styles.riesgoTexto, { color }]}>
            {item.riesgo < 40 ? "Bajo" : item.riesgo < 70 ? "Moderado" : "Alto"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
});

export default function Historial({ navigation }) {
  const { theme, isDarkMode } = useContext(ThemeContext);
  const [simulaciones, setSimulaciones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [editObjetivo, setEditObjetivo] = useState("");
  const [editFecha, setEditFecha] = useState("");

  const abrirModalEdicion = (item) => {
    setEditItem(item);
    setEditObjetivo(item.objetivo);
    setEditFecha(item.fechaRegistro ? item.fechaRegistro.split("T")[0] : "");
    setModalVisible(true);
  };

  const guardarEdicion = async () => {
    if (!editObjetivo.trim() || !editFecha.trim()) {
      Alert.alert("Error", "Los campos no pueden estar vacíos.");
      return;
    }

    const user = auth.currentUser;
    if (!user) return;

    try {
      const nuevasSimulaciones = simulaciones.map(s => {
        if (s.id === editItem.id) {
          const parsedDate = new Date(editFecha + "T00:00:00");
          return {
            ...s,
            objetivo: editObjetivo,
            fechaRegistro: isNaN(parsedDate.getTime()) ? s.fechaRegistro : parsedDate.toISOString()
          };
        }
        return s;
      });
      setSimulaciones(nuevasSimulaciones);
      setModalVisible(false);

      await setDoc(doc(db, "users", user.uid), {
        simulaciones: nuevasSimulaciones
      }, { merge: true });

    } catch (error) {
      console.error("Error guardando edición:", error);
      Alert.alert("Error", "No se pudo guardar la edición.");
    }
  };

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      setCargando(false);
      return;
    }

    AsyncStorage.getItem(`historial_${user.uid}`).then(cached => {
      if (cached) {
        setSimulaciones(JSON.parse(cached));
        setCargando(false);
      }
    });

    const unsubscribe = onSnapshot(doc(db, "users", user.uid), (docSnap) => {
      if (docSnap.exists() && docSnap.data().simulaciones) {
        let data = docSnap.data().simulaciones;
        data.sort((a, b) => new Date(b.fechaRegistro) - new Date(a.fechaRegistro));
        setSimulaciones(data);
        AsyncStorage.setItem(`historial_${user.uid}`, JSON.stringify(data));
      } else {
        setSimulaciones([]);
      }
      setCargando(false);
    }, (error) => {
      console.error("Error obteniendo historial:", error);
      setCargando(false);
    });

    return () => unsubscribe();
  }, []);

  const goBack = useCallback(() => navigation.goBack(), [navigation]);

  const renderItem = useCallback(({ item, index }) => (
    <SimulacionCard item={item} index={index} total={simulaciones.length} theme={theme} isDarkMode={isDarkMode} onEdit={abrirModalEdicion} />
  ), [simulaciones.length, theme, isDarkMode]);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <TouchableOpacity
        onPress={goBack}
        style={[styles.backBtn, { backgroundColor: theme.primary }]}
        activeOpacity={0.8}>
        <Icon name="arrow-back" size={20} color="#FFFFFF" style={{ marginRight: 6 }} />
        <Text style={styles.backText}>Volver</Text>
      </TouchableOpacity>

      <Text style={[styles.title, { color: theme.text }]}>Historial</Text>

      {cargando ? (
        <ActivityIndicator size="large" color={theme.primary} style={{ marginTop: 50 }} />
      ) : simulaciones.length === 0 ? (
        <Text style={{ color: theme.textSecondary, textAlign: 'center', marginTop: 50 }}>
          No tienes simulaciones guardadas todavía.
        </Text>
      ) : (
        <FlatList
          data={simulaciones}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
          renderItem={renderItem}
        />
      )}

      {/* MODAL DE EDICIÓN */}
      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>Editar Simulación</Text>
            
            <Text style={[styles.modalLabel, { color: theme.text }]}>Objetivo:</Text>
            <TextInput
              style={[styles.modalInput, { backgroundColor: theme.inputBackground, color: theme.text, borderColor: theme.border }]}
              value={editObjetivo}
              onChangeText={setEditObjetivo}
            />

            <Text style={[styles.modalLabel, { color: theme.text }]}>Fecha de Registro / Envío:</Text>
            {Platform.OS === "web" ? (
              React.createElement('input', {
                type: 'date',
                style: {
                  padding: '12px', borderRadius: '10px', borderWidth: '1px', borderStyle: 'solid',
                  borderColor: theme.border, backgroundColor: theme.inputBackground, color: theme.text,
                  marginBottom: '20px', fontSize: '15px', outline: 'none', width: '100%', boxSizing: 'border-box'
                },
                value: editFecha,
                onChange: (e) => setEditFecha(e.target.value)
              })
            ) : (
              <TextInput
                style={[styles.modalInput, { backgroundColor: theme.inputBackground, color: theme.text, borderColor: theme.border }]}
                value={editFecha}
                onChangeText={setEditFecha}
                placeholder="AAAA-MM-DD"
                placeholderTextColor={theme.textSecondary}
              />
            )}

            <View style={styles.modalActions}>
              <TouchableOpacity style={[styles.modalBtn, { backgroundColor: theme.border }]} onPress={() => setModalVisible(false)}>
                <Text style={{ color: theme.text, fontWeight: 'bold' }}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalBtn, { backgroundColor: theme.primary }]} onPress={guardarEdicion}>
                <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 18 },
  card: { borderRadius: 22, padding: 18, marginBottom: 16, shadowColor: "#000", shadowOpacity: 0.07, shadowRadius: 8, elevation: 4 },
  header: { flexDirection: "row", alignItems: "center" },
  iconBox: { width: 52, height: 52, borderRadius: 16, justifyContent: "center", alignItems: "center", marginRight: 14 },
  objetivo: { fontSize: 17, fontWeight: "bold" },
  fecha: { fontSize: 13, marginTop: 4 },
  badge: { paddingHorizontal: 12, paddingVertical: 7, borderRadius: 999 },
  badgeText: { fontWeight: "bold", fontSize: 13 },
  divider: { height: 1, marginVertical: 16 },
  infoContainer: { flexDirection: "row", justifyContent: "space-between" },
  infoBox: { flex: 1 },
  infoLabel: { fontSize: 12, marginBottom: 5 },
  estado: { fontSize: 15, fontWeight: "600" },
  riesgoTexto: { fontSize: 15, fontWeight: "bold" },
  backBtn: { flexDirection: "row", alignItems: "center", alignSelf: "flex-start", paddingVertical: 10, paddingHorizontal: 14, borderRadius: 14, marginBottom: 12, shadowColor: "#000", shadowOpacity: 0.15, shadowRadius: 6, elevation: 5 },
  backText: { color: "#FFFFFF", fontWeight: "700", fontSize: 14 },
  editBtn: { padding: 6 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalContent: { width: '100%', padding: 24, borderRadius: 20, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 10, elevation: 10 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  modalLabel: { fontSize: 14, fontWeight: 'bold', marginBottom: 6 },
  modalInput: { padding: 12, borderWidth: 1, borderRadius: 10, fontSize: 15, marginBottom: 16 },
  modalActions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  modalBtn: { flex: 1, padding: 14, borderRadius: 12, alignItems: 'center', marginHorizontal: 5 }
});
