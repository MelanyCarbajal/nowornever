import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Button from "../components/Button";

export default function Inicio({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={require("../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>Bienvenido a NOWORNEVER</Text>

        <Text style={styles.subtitle}>
          Actúa ahora y evita llegar al punto de no retorno.
        </Text>

        <Button title="Empezar" onPress={() => navigation.navigate("Login")} />

        <View style={styles.spacing} />

        <Button
          title="Crear cuenta"
          onPress={() => navigation.navigate("Registro")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",

    paddingHorizontal: 20,

    backgroundColor: "#F3F4F6",
  },

  card: {
    width: "100%",
    maxWidth: 360,

    backgroundColor: "#FFFFFF",

    paddingVertical: 32,
    paddingHorizontal: 24,

    borderRadius: 24,

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,

    elevation: 4,
  },

  logo: {
    width: 90,
    height: 90,

    alignSelf: "center",

    marginBottom: 18,
  },

  title: {
    fontSize: 26,

    fontWeight: "bold",

    color: "#111827",

    textAlign: "center",

    marginBottom: 10,
  },

  subtitle: {
    fontSize: 15,

    color: "#6B7280",

    textAlign: "center",

    lineHeight: 22,

    marginBottom: 28,
  },

  spacing: {
    height: 12,
  },
});
