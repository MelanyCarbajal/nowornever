import React, { useContext } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Button from "../components/Button";
import { ThemeContext } from "../context/ThemeContext";

export default function Inicio({ navigation }) {
  const { theme } = useContext(ThemeContext);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Image
          source={require("../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={[styles.title, { color: theme.text }]}>Bienvenido a NOWORNEVER</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          Actúa ahora y evita llegar al punto de no retorno.
        </Text>

        <Button title="Empezar" onPress={() => navigation.navigate("Login")} />
        <View style={styles.spacing} />
        <Button
          title="Crear cuenta"
          variant="outline"
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
  },
  card: {
    width: "100%",
    maxWidth: 360,
    paddingVertical: 32,
    paddingHorizontal: 24,
    borderRadius: 24,
    shadowColor: "#000",
    shadowOpacity: 0.05,
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
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 28,
  },
  spacing: {
    height: 12,
  },
});
