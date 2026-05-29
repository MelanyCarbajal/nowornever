import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Button from "../components/Button";

export default function Login({ navigation, route }) {
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

        params: {
          username: username,
        },
      });
    }, 1200);
  };

  return (
    <View style={styles.container}>
      {message !== "" && (
        <View
          style={[
            styles.toast,
            {
              backgroundColor: messageType === "error" ? "#EF4444" : "#10B981",
            },
          ]}
        >
          <Text style={styles.toastText}>{message}</Text>
        </View>
      )}

      <View style={styles.card}>
        <Text style={styles.title}>Iniciar Sesión</Text>

        <TextInput
          placeholder="Usuario"
          placeholderTextColor="#9CA3AF"
          value={username}
          onChangeText={setUsername}
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

        <Button title="Entrar" onPress={handleLogin} />

        <TouchableOpacity onPress={() => navigation.navigate("Registro")}>
          <Text style={styles.link}>Crear cuenta</Text>
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
    padding: 24,
    borderRadius: 20,
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

  toastText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
