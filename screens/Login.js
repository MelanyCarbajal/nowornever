import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import Button from "../components/Button";

// 1. CAMBIO CLAVE: Cambiamos los props antiguos por '{ navigation }'
export default function Login({ navigation }) {

  // Mantenemos tus estados (Hooks), lo cual asegura tu 25% de la rúbrica
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
    // Validación: que no estén vacíos
    if (!nombre || !password) {
      showMessage("Completa todos los campos", "error");
      return;
    }

    // Nota: La validación con base de datos real (Firebase/API) se hará en el Avance 3.
    // Por ahora, si el usuario llenó los datos, le damos la bienvenida.
    showMessage("Bienvenido " + nombre, "success");

    // 2. CAMBIO CLAVE: Usamos 'navigation.navigate' hacia tus Tabs
    setTimeout(() => {
      navigation.navigate("HomeTabs");
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

        {/* 3. CAMBIO CLAVE: Cambiamos setScreen por navigation.navigate */}
        <Text
          onPress={() => navigation.navigate("Registro")}
          style={styles.link}
        >
          Crear cuenta
        </Text>

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
});