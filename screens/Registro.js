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

    if (!correo.includes("@")) {
      showMessage("El correo debe contener @", "error");
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
          { backgroundColor: tipo === "error" ? "#EF4444" : "#22C55E" }
        ]}>
          <Text style={{ color: "white", fontWeight: "bold" }}>
            {mensaje}
          </Text>
        </View>
      )}

      <View style={styles.card}>

        <Text style={styles.title}>Registro</Text>

        <TextInput
          placeholder="Usuario"
          value={nombre}
          onChangeText={setNombre}
          style={styles.input}
        />

        <TextInput
          placeholder="Correo"
          value={correo}
          onChangeText={setCorreo}
          style={styles.input}
        />

        <TextInput
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
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
    backgroundColor: "#F5F3FF",
    justifyContent: "center",
    padding: 20
  },

  card: {
    backgroundColor: "white",
    padding: 24,
    borderRadius: 20
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#6D28D9",
    marginBottom: 10
  },

  input: {
    backgroundColor: "#F5F3FF",
    padding: 14,
    borderRadius: 12,
    marginBottom: 12
  },

  link: {
    marginTop: 15,
    textAlign: "center",
    color: "#6D28D9"
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
  }
};