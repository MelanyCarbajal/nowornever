import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import Button from "../components/Button";
import { ThemeContext } from "../context/ThemeContext";

export default function Registro({ navigation, route }) {
  const { theme } = useContext(ThemeContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const validateEmail = (emailText) => /\S+@\S+\.\S+/.test(emailText);
  const emailValido = email.length > 0 && validateEmail(email);
  const passwordValida = password.length >= 6;

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
    if (username.length < 3) {
      showMessage("El usuario debe tener mínimo 3 caracteres", "error");
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
      navigation.navigate("Login", { registeredUser: username });
    }, 1200);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContent} style={[styles.container, { backgroundColor: theme.background }]}>
      {message !== "" && (
        <View style={[styles.toast, { backgroundColor: messageType === "error" ? theme.danger : theme.success }]}>
          <Text style={styles.toastText}>{message}</Text>
        </View>
      )}

      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Text style={[styles.title, { color: theme.text }]}>Crear Cuenta</Text>

        <TextInput
          placeholder="Usuario"
          placeholderTextColor={theme.textSecondary}
          value={username}
          onChangeText={setUsername}
          style={[styles.input, { backgroundColor: theme.inputBackground, color: theme.text, borderColor: theme.border }]}
        />

        <TextInput
          placeholder="Correo electrónico"
          placeholderTextColor={theme.textSecondary}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          style={[
            styles.input,
            { backgroundColor: theme.inputBackground, color: theme.text, borderColor: theme.border },
            email.length > 0 && { borderColor: emailValido ? theme.success : theme.danger }
          ]}
        />
        {email.length > 0 && (
          <Text style={[styles.helperText, { color: emailValido ? theme.success : theme.danger }]}>
            {emailValido ? "Correo válido" : "Formato de correo incorrecto"}
          </Text>
        )}

        <TextInput
          placeholder="Contraseña"
          placeholderTextColor={theme.textSecondary}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={[
            styles.input,
            { backgroundColor: theme.inputBackground, color: theme.text, borderColor: theme.border },
            password.length > 0 && { borderColor: passwordValida ? theme.success : theme.danger }
          ]}
        />
        {password.length > 0 && (
          <Text style={[styles.helperText, { color: passwordValida ? theme.success : theme.danger }]}>
            {passwordValida ? "Contraseña segura" : "Mínimo 6 caracteres"}
          </Text>
        )}

        <View style={{ height: 10 }} />
        <Button title="Crear cuenta" onPress={handleRegister} />

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={[styles.link, { color: theme.primary }]}>Ya tengo una cuenta</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  card: {
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
    borderRadius: 24,
    paddingVertical: 32,
    paddingHorizontal: 24,
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
    marginBottom: 8,
    fontSize: 16,
  },
  helperText: {
    marginBottom: 12,
    fontSize: 13,
    marginLeft: 4,
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
