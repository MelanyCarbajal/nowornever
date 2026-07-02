import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView, Alert } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { Ionicons as Icon } from "@expo/vector-icons";

export default function Configuracion({ navigation }) {
  const { theme, isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [notifications, setNotifications] = useState(true);

  const handleExport = () => {
    Alert.alert("Exportar Datos", "Tus datos se han exportado exitosamente a un archivo CSV.");
  };

  const handleLogout = () => {
    Alert.alert("Cerrar Sesión", "¿Estás seguro que deseas cerrar sesión?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Salir", onPress: () => navigation.navigate("Inicio"), style: "destructive" }
    ]);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    scrollContent: {
      padding: 20,
      paddingBottom: 40,
    },
    title: {
      fontSize: 26,
      fontWeight: "bold",
      color: theme.text,
      marginBottom: 30,
      marginTop: 20,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: "bold",
      color: theme.textSecondary,
      marginBottom: 10,
      marginTop: 10,
    },
    card: {
      backgroundColor: theme.card,
      borderRadius: 18,
      shadowColor: "#000",
      shadowOpacity: 0.05,
      shadowRadius: 10,
      elevation: 3,
      marginBottom: 20,
      overflow: "hidden"
    },
    item: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    itemNoBorder: {
      borderBottomWidth: 0,
    },
    itemLeft: {
      flexDirection: "row",
      alignItems: "center",
    },
    itemIcon: {
      marginRight: 14,
    },
    label: {
      fontSize: 16,
      fontWeight: "500",
      color: theme.text,
    },
    labelDanger: {
      color: theme.danger,
    },
    backBtn: {
      backgroundColor: theme.primary,
      paddingVertical: 14,
      borderRadius: 14,
      alignItems: "center",
      marginTop: 20,
    },
    backText: {
      color: "#FFFFFF",
      fontWeight: "bold",
      fontSize: 16,
    },
  });

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Text style={styles.title}>Configuración</Text>

      <Text style={styles.sectionTitle}>Apariencia</Text>
      <View style={styles.card}>
        <View style={[styles.item, styles.itemNoBorder]}>
          <View style={styles.itemLeft}>
            <Icon name={isDarkMode ? "moon" : "sunny"} size={24} color={theme.primary} style={styles.itemIcon} />
            <Text style={styles.label}>Modo Oscuro</Text>
          </View>
          <Switch
            value={isDarkMode}
            onValueChange={toggleTheme}
            thumbColor={isDarkMode ? theme.primary : "#f4f3f4"}
            trackColor={{ false: "#767577", true: theme.primary + "80" }}
          />
        </View>
      </View>

      <Text style={styles.sectionTitle}>Ajustes de la App</Text>
      <View style={styles.card}>
        <View style={styles.item}>
          <View style={styles.itemLeft}>
            <Icon name="notifications" size={24} color={theme.primary} style={styles.itemIcon} />
            <Text style={styles.label}>Notificaciones</Text>
          </View>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            thumbColor={notifications ? theme.primary : "#f4f3f4"}
            trackColor={{ false: "#767577", true: theme.primary + "80" }}
          />
        </View>
        <TouchableOpacity style={[styles.item, styles.itemNoBorder]} activeOpacity={0.7} onPress={handleExport}>
          <View style={styles.itemLeft}>
            <Icon name="download" size={24} color={theme.primary} style={styles.itemIcon} />
            <Text style={styles.label}>Exportar Datos</Text>
          </View>
          <Icon name="chevron-forward" size={20} color={theme.textSecondary} />
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Cuenta</Text>
      <View style={styles.card}>
        <TouchableOpacity style={styles.item} activeOpacity={0.7} onPress={() => navigation.navigate("AcercaDe")}>
          <View style={styles.itemLeft}>
            <Icon name="information-circle" size={24} color={theme.textSecondary} style={styles.itemIcon} />
            <Text style={styles.label}>Acerca de NowOrNever</Text>
          </View>
          <Icon name="chevron-forward" size={20} color={theme.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.item, styles.itemNoBorder]} activeOpacity={0.7} onPress={handleLogout}>
          <View style={styles.itemLeft}>
            <Icon name="log-out" size={24} color={theme.danger} style={styles.itemIcon} />
            <Text style={[styles.label, styles.labelDanger]}>Cerrar Sesión</Text>
          </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
        activeOpacity={0.8}
      >
        <Text style={styles.backText}>Volver al Perfil</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

