import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { Ionicons as Icon } from "@expo/vector-icons";

export default function Calendario({ navigation }) {
  const { theme, isDarkMode } = useContext(ThemeContext);
  // Datos simulados de eventos o plazos
  const eventos = [
    { id: 1, fecha: "15 Oct", titulo: "Examen Final de Física", tipo: "crítico" },
    { id: 2, fecha: "20 Oct", titulo: "Entrega de Proyecto React", tipo: "moderado" },
    { id: 3, fecha: "02 Nov", titulo: "Lectura Capítulo 4", tipo: "seguro" },
  ];

  const getEventColor = (tipo) => {
    if (tipo === "crítico") return theme.danger;
    if (tipo === "moderado") return theme.warning;
    return theme.success;
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]} showsVerticalScrollIndicator={false}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={[styles.backBtn, { backgroundColor: theme.primary }]}
        activeOpacity={0.8}>
        <Icon name="arrow-back" size={20} color="#FFFFFF" style={{ marginRight: 6 }} />
        <Text style={styles.backText}>Volver</Text>
      </TouchableOpacity>

      <Text style={[styles.title, { color: theme.text }]}>Calendario de Eventos</Text>
      
      <View style={[styles.card, { backgroundColor: theme.primary }]}>
        <View style={styles.cardHeader}>
          <Icon name="calendar-outline" size={32} color="#FFFFFF" />
          <Text style={styles.mesTexto}>Octubre 2026</Text>
        </View>
        <Text style={styles.resumenTexto}>Tienes 3 plazos importantes próximos. ¡Planifica tu tiempo!</Text>
      </View>

      <Text style={[styles.sectionTitle, { color: theme.text }]}>Próximos plazos</Text>

      {eventos.map((evento) => (
        <View key={evento.id} style={[styles.eventoItem, { backgroundColor: theme.card }]}>
          <View style={[styles.fechaBox, { backgroundColor: theme.inputBackground }]}>
            <Text style={[styles.fechaDia, { color: theme.text }]}>{evento.fecha.split(" ")[0]}</Text>
            <Text style={[styles.fechaMes, { color: theme.textSecondary }]}>{evento.fecha.split(" ")[1]}</Text>
          </View>
          <View style={styles.eventoDetalle}>
            <Text style={[styles.eventoTitulo, { color: theme.text }]}>{evento.titulo}</Text>
            <View style={styles.tipoRow}>
              <View style={[styles.dot, { backgroundColor: getEventColor(evento.tipo) }]} />
              <Text style={[styles.eventoTipo, { color: theme.textSecondary }]}>Nivel de riesgo: {evento.tipo}</Text>
            </View>
          </View>
        </View>
      ))}

      <TouchableOpacity 
        style={[styles.addButton, { backgroundColor: theme.inputBackground, borderColor: theme.primary, borderWidth: 1 }]}
        activeOpacity={0.7}
        onPress={() => navigation.navigate("NuevaSimulacion")}
      >
        <Icon name="add" size={24} color={theme.primary} />
        <Text style={[styles.addText, { color: theme.primary }]}>Agregar Nueva Simulación</Text>
      </TouchableOpacity>

      <View style={{ height: 40 }} />
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
  resumenTexto: { color: "#DBEAFE", fontSize: 14, lineHeight: 20 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 16 },
  eventoItem: { flexDirection: "row", padding: 16, borderRadius: 18, marginBottom: 12, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 8, elevation: 3, alignItems: "center" },
  fechaBox: { width: 60, height: 60, borderRadius: 14, justifyContent: "center", alignItems: "center", marginRight: 16 },
  fechaDia: { fontSize: 20, fontWeight: "bold" },
  fechaMes: { fontSize: 13, textTransform: "uppercase", marginTop: 2 },
  eventoDetalle: { flex: 1 },
  eventoTitulo: { fontSize: 16, fontWeight: "bold", marginBottom: 6 },
  tipoRow: { flexDirection: "row", alignItems: "center" },
  dot: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
  eventoTipo: { fontSize: 13, textTransform: "capitalize" },
  addButton: { flexDirection: "row", alignItems: "center", justifyContent: "center", padding: 16, borderRadius: 16, marginTop: 10, borderStyle: "dashed" },
  addText: { fontWeight: "bold", fontSize: 16, marginLeft: 8 }
});
