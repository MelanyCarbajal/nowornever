import React, { useState, useEffect, useContext } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import Button from "../components/Button";
import { ThemeContext } from "../context/ThemeContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

export default function Login({ navigation, route }) {
  const { theme } = useContext(ThemeContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  useEffect(() => {
    if (route.params?.registeredEmail) {
      setEmail(route.params.registeredEmail);
    }
  }, [route.params]);

  const showMessage = (text, type = "error") => {
    setMessage(text);
    setMessageType(type);

    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 2000);
  };

const handleLogin = async () => {
  if (!email.trim() || !password.trim()) {
    showMessage("Completa todos los campos", "error");
    return;
  }

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    console.log("Login OK:", userCredential.user);

    showMessage("Inicio de sesión correcto", "success");

  } catch (error) {
    if (error.code === "auth/wrong-password") {
      showMessage("Contraseña mal ingresada", "error");
    } else if (error.code === "auth/user-not-found") {
      showMessage("Usuario no encontrado", "error");
    } else if (error.code === "auth/invalid-credential") {
      showMessage("Contraseña mal ingresada", "error");
    } else {
      showMessage("Error al iniciar sesión", "error");
    }
  }
};

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>

      {message ? (
        <View style={[styles.toast, { backgroundColor: messageType === "error" ? theme.danger : theme.success }]}>
          <Text style={styles.toastText}>{message}</Text>
        </View>
      ) : null}

      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Text style={[styles.title, { color: theme.text }]}>
          Iniciar Sesión
        </Text>

        {/* EMAIL */}
        <TextInput
          placeholder="Email"
          placeholderTextColor={theme.textSecondary}
          value={email}
          onChangeText={setEmail}
          style={[
            styles.input,
            {
              backgroundColor: theme.inputBackground,
              color: theme.text,
              borderColor: theme.border,
            },
          ]}
        />

        {/* PASSWORD */}
        <TextInput
          placeholder="Contraseña"
          placeholderTextColor={theme.textSecondary}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={[
            styles.input,
            {
              backgroundColor: theme.inputBackground,
              color: theme.text,
              borderColor: theme.border,
            },
          ]}
        />

        <Button title="Entrar" onPress={handleLogin} />

        <TouchableOpacity onPress={() => navigation.navigate("Registro")}>
          <Text style={[styles.link, { color: theme.primary }]}>
            Crear cuenta
          </Text>
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
  },
  card: {
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
    padding: 30,
    borderRadius: 24,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
  },
  link: {
    marginTop: 20,
    textAlign: "center",
    fontWeight: "600",
    fontSize: 15,
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
  toastText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
