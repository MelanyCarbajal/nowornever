import React from "react";
import { View, Text } from "react-native";
import Button from "../components/Button";

export default function Inicio({ setScreen }) {
  return (
    <View style={styles.container}>

      <View style={styles.card}>

        <Text style={styles.title}>
          Bienvenido a NOWORNEVER
        </Text>

        <Text style={styles.subtitle}>
          Actúa ahora, alcanza tus metas.
        </Text>

        <Button
          title="Empezar"
          onPress={() => setScreen("login")}
        />

        <View style={{ height: 10 }} />

        <Button
          title="Crear cuenta"
          onPress={() => setScreen("registro")}
        />

      </View>

    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#F3E8FF", 
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

    shadowColor: "#6D28D9",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5
  },

  title: {
    fontSize: 22,
    color: "#6D28D9",
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center"
  },

  subtitle: {
    color: "#6B7280",
    marginBottom: 20,
    textAlign: "center"
  }
};