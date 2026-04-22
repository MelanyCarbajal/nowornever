import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import Button from "../components/Button";

export default function Registro({ setScreen, users, setUsers }) {

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  const [mensaje, setMensaje] = useState("");
  const [tipo, setTipo] = useState("");

  const validarEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const showMessage = (text, type = "error") => {
    setMensaje(text);
    setTipo(type);

    setTimeout(() => {
      setMensaje("");
      setTipo("");
    }, 2000);
  };

  const handleRegister = () => {

    if (!nombre || !correo || !password) {
      showMessage("Completa todos los campos", "error");
      return;
    }

    if (!validarEmail(correo)) {
      showMessage("Correo inválido", "error");
      return;
    }

    if (password.length < 6) {
      showMessage("La contraseña debe tener mínimo 6 caracteres", "error");
      return;
    }

    const nuevoUsuario = {
      nombre,
      correo,
      password
    };

    setUsers([...users, nuevoUsuario]);

    showMessage("Cuenta creada correctamente", "success");

    setTimeout(() => {
      setScreen("login");
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

        <Text style={styles.title}>Crear cuenta</Text>

        <TextInput
          placeholder="Usuario"
          value={nombre}
          onChangeText={setNombre}
          style={styles.input}
          placeholderTextColor="#9CA3AF"
        />

        <TextInput
          placeholder="Correo"
          value={correo}
          onChangeText={setCorreo}
          style={styles.input}
          placeholderTextColor="#9CA3AF"
          keyboardType="email-address"
        />

        <TextInput
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          placeholderTextColor="#9CA3AF"
        />

        <Button title="Crear cuenta" onPress={handleRegister} />

        <Text
          onPress={() => setScreen("login")}
          style={styles.link}
        >
          Ya tengo cuenta
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