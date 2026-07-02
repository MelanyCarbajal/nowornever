import React, { useState, useEffect, useContext } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import Button from "../components/Button";
import { ThemeContext } from "../context/ThemeContext";

export default function Login({ navigation, route }) {
  const { theme } = useContext(ThemeContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  useEffect(() => {
    if (route.params?.registeredUser) {
      setUsername(route.params.registeredUser);
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

  const handleLogin = () => {
    if (!username.trim() || !password.trim()) {
      showMessage("Completa todos los campos", "error");
      return;
    }

    showMessage(`¡Bienvenid@, ${username}!`, "success");

    setTimeout(() => {
      navigation.navigate("PrivateTabs", {
        screen: "Home",
        params: { username: username },
      });
    }, 1200);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {message !== "" && (
        <View style={[styles.toast, { backgroundColor: messageType === "error" ? theme.danger : theme.success }]}>
          <Text style={styles.toastText}>{message}</Text>
        </View>
      )}

      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Text style={[styles.title, { color: theme.text }]}>Iniciar Sesión</Text>

        <TextInput
          placeholder="Usuario"
          placeholderTextColor={theme.textSecondary}
          value={username}
          onChangeText={setUsername}
          style={[styles.input, { backgroundColor: theme.inputBackground, color: theme.text, borderColor: theme.border }]}
        />

        <TextInput
          placeholder="Contraseña"
          placeholderTextColor={theme.textSecondary}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={[styles.input, { backgroundColor: theme.inputBackground, color: theme.text, borderColor: theme.border }]}
        />

        <Button title="Entrar" onPress={handleLogin} />

        <TouchableOpacity onPress={() => navigation.navigate("Registro")}>
          <Text style={[styles.link, { color: theme.primary }]}>Crear cuenta</Text>
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
