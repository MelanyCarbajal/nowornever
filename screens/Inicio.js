import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Button from "../components/Button";

// 1. CAMBIO CLAVE: Cambiamos '{ setScreen }' por '{ navigation }'
export default function Inicio({ navigation }) {
  return (
    <View style={styles.container}>

      <View style={styles.card}>

        <Text style={styles.title}>
          Bienvenido a NOWORNEVER
        </Text>

        <Text style={styles.subtitle}>
          Actúa ahora, alcanza tus metas.
        </Text>

        {/* 2. CAMBIO CLAVE: Usamos navigation.navigate("Login") */}
        <Button
          title="Empezar"
          onPress={() => navigation.navigate("Login")}
        />

        <View style={{ height: 10 }} />

        {/* 3. CAMBIO CLAVE: Usamos navigation.navigate("Registro") */}
        <Button
          title="Crear cuenta"
          onPress={() => navigation.navigate("Registro")}
        />

      </View>

    </View>
  );
}

// 4. BUENA PRÁCTICA: Envolvemos tus estilos en StyleSheet.create()
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
    textAlign: "center"
  }
});