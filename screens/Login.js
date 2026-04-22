import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import Button from "../components/Button";

export default function Login({ setScreen, setUser, users }) {

  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");

  const [mensaje, setMensaje] = useState("");
  const [tipo, setTipo] = useState("");

  const showMessage = (text, type = "error") => {
    setMensaje(text);
    setTipo(type);

    setTimeout(() => {
      setMensaje("");
      setTipo("");
    }, 2000);
  };

  const handleLogin = () => {

    if (!nombre || !password) {
      showMessage("Completa todos los campos", "error");
      return;
    }

    const userFound = users.find(
      u => u.nombre === nombre && u.password === password
    );

    if (!userFound) {
      showMessage("Credenciales incorrectas", "error");
      return;
    }

    setUser(userFound);

    showMessage("Bienvenido " + userFound.nombre, "success");

    setTimeout(() => {
      setScreen("home");
    }, 1200);
  };

  return (
    <View style={styles.container}>

      {mensaje !== "" && (
        <View style={[
          styles.toast,
          { backgroundColor: tipo === "error" ? "#EF4444" : "#10B981" }
        ]}>
          <Text style={styles.toastText}>
            {mensaje}
          </Text>
        </View>
      )}

      <View style={styles.card}>

        <Text style={styles.title}>Iniciar sesión</Text>

        <TextInput
          placeholder="Usuario"
          value={nombre}
          onChangeText={setNombre}
          style={styles.input}
          placeholderTextColor="#9CA3AF"
        />

        <TextInput
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          placeholderTextColor="#9CA3AF"
        />

        <Button title="Entrar" onPress={handleLogin} />

        <Text
          onPress={() => setScreen("registro")}
          style={styles.link}
        >
          Crear cuenta
        </Text>

      </View>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB", 
    justifyContent: "center",
    padding: 20
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 24,
    borderRadius: 20,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827", 
    marginBottom: 20,
    textAlign: "center"
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB", 
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    color: "#111827"
  },

  link: {
    marginTop: 15,
    textAlign: "center",
    color: "#2563EB", 
    fontWeight: "500"
  },

  toast: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    zIndex: 999
  },

  toastText: {
    color: "white",
    fontWeight: "bold"
  }
};