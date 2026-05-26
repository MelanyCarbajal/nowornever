import React, { useState } from "react";
import {  View, Text, TextInput, TouchableOpacity, StyleSheet,} from "react-native";
import Button from "../components/Button";

export default function Registro({ navigation }) {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const validateEmail = (emailText) => {
    return /\S+@\S+\.\S+/.test(emailText);
  };



  const showMessage = (text, type = "error") => {
    setMessage(text);

    setMessageType(type);

    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 2000);
  };



  const handleRegister = () => {
    if (!username.trim() || !email.trim() || !password.trim()) {
      showMessage("Completa todos los campos", "error");

      return;
    }

    if (!validateEmail(email)) {
      showMessage("Correo electrónico inválido", "error");

      return;
    }

    if (password.length < 6) {
      showMessage("La contraseña debe tener mínimo 6 caracteres", "error");

      return;
    }

    showMessage("Cuenta creada correctamente", "success");

    setTimeout(() => {
      navigation.navigate("Login");
    }, 1200);
  };

  return (
    <View style={styles.container}>
     
      {message !== "" && (
        <View
          style={[
            styles.toast,

            messageType === "error" ? styles.errorToast : styles.successToast,
          ]}
        >
          <Text style={styles.toastText}>{message}</Text>
        </View>
      )}


      <View style={styles.card}>
        <Text style={styles.title}>Crear Cuenta</Text>

        <TextInput
          placeholder="Usuario"
          placeholderTextColor="#9CA3AF"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />

        <TextInput
          placeholder="Correo electrónico"
          placeholderTextColor="#9CA3AF"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />

        <TextInput
          placeholder="Contraseña"
          placeholderTextColor="#9CA3AF"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />
        <Button title="Crear cuenta" onPress={handleRegister} />

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.link}>Ya tengo una cuenta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#F3F4F6",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    paddingVertical: 28,
    paddingHorizontal: 24,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#111827",
    textAlign: "center",
    marginBottom: 24,
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 14,
    color: "#111827",
    fontSize: 16,
  },

  link: {
    marginTop: 18,
    textAlign: "center",
    color: "#2563EB",
    fontWeight: "600",
  },

  toast: {
    position: "absolute",
    top: 55,
    left: 20,
    right: 20,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    zIndex: 999,
  },

  errorToast: {
    backgroundColor: "#EF4444",
  },

  successToast: {
    backgroundColor: "#10B981",
  },

  toastText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
