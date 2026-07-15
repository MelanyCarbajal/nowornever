import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
import Button from "../components/Button";
import { ThemeContext } from "../context/ThemeContext";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Registro({ navigation }) {
  const { theme } = useContext(ThemeContext);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const showMessage = (text, type = "error") => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 2000);
  };

  const handleRegister = async () => {
    if (!username.trim() || !email.trim() || !password.trim()) {
      showMessage("Completa todos los campos", "error");
      return;
    }

    if (username.trim().length < 3) {
      showMessage("El usuario debe tener al menos 3 caracteres", "error");
      return;
    }

    try {

      await AsyncStorage.setItem("pending_username", username.trim());

      showMessage("Usuario creado", "success");

      await new Promise(resolve => setTimeout(resolve, 800));

      const userCred = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );


      await updateProfile(userCred.user, { displayName: username.trim() });

      await setDoc(doc(db, "users", userCred.user.uid), {
        username: username.trim(),
        email: email.trim(),
        createdAt: new Date().toISOString()
      }, { merge: true });

    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          showMessage("Usuario ya registrado", "error");
          break;

        case "auth/invalid-email":
          showMessage("Correo electrónico inválido", "error");
          break;

        case "auth/weak-password":
          showMessage("La contraseña debe tener al menos 6 caracteres", "error");
          break;

        default:
          Alert.alert("Error", error.message);
      }
    }
  };
  return (
    <View style={styles.container}>
      {message ? (
        <View style={[styles.toast, { backgroundColor: messageType === "error" ? theme.danger : theme.success }]}>
          <Text style={styles.toastText}>{message}</Text>
        </View>
      ) : null}
      
      <ScrollView contentContainerStyle={styles.scrollContent} style={{ backgroundColor: theme.background }}>
        <View style={[styles.card, { backgroundColor: theme.card }]}>

          <Text style={[styles.title, { color: theme.text }]}>Crear Cuenta</Text>

        <TextInput
          placeholder="Usuario"
          placeholderTextColor={theme.textSecondary}
          value={username}
          onChangeText={setUsername}
          style={[
            styles.input,
            {
              backgroundColor: theme.inputBackground,
              color: theme.text,
              borderColor: theme.border,
            },
          ]}
        />

        <TextInput
          placeholder="Correo"
          placeholderTextColor={theme.textSecondary}
          autoCapitalize="none"
          keyboardType="email-address"
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
        <Button title="Crear cuenta" onPress={handleRegister} />

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={{ color: theme.primary, textAlign: "center", marginTop: 15 }}>
            Ya tengo cuenta
          </Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
    </View>
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
