import React, { useState, useContext, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { Ionicons as Icon } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../config/firebase";
import Button from "../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function EditarPerfil({ navigation }) {
  const { theme } = useContext(ThemeContext);
  
  const user = auth.currentUser;
  
  const [nombre, setNombre] = useState(user?.displayName || "");
  const [foto, setFoto] = useState(user?.photoURL || null);
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert("Permiso denegado", "Necesitamos acceso a tus fotos para cambiar el perfil.");
      }
    })();
  }, []);

  const seleccionarImagen = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.2, 
      base64: true, 
    });

    if (!result.canceled) {
      const base64Str = `data:image/jpeg;base64,${result.assets[0].base64}`;
      setFoto(base64Str);
    }
  };

  const guardarPerfil = async () => {
    if (!nombre.trim()) {
      Alert.alert("Error", "El nombre de usuario no puede estar vacío");
      return;
    }

    setGuardando(true);
    
    if (foto) AsyncStorage.setItem("foto_perfil", foto);
    AsyncStorage.setItem("pending_username", nombre.trim());
    navigation.goBack();

    try {
      await setDoc(doc(db, "users", user.uid), {
        username: nombre.trim(),
        photoBase64: foto || ""
      }, { merge: true });

      await updateProfile(user, {
        displayName: nombre.trim()
      });

    } catch (error) {
      console.error("Error guardando perfil silencioso:", error);
    } finally {
      setGuardando(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Icon name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.text }]}>Editar Perfil</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        
        {/* FOTO */}
        <View style={styles.fotoContainer}>
          <Image 
            source={foto ? { uri: foto } : require("../assets/6073873.png")} 
            style={[styles.foto, { borderColor: theme.primary }]} 
          />
          <TouchableOpacity 
            style={[styles.editFotoBtn, { backgroundColor: theme.primary }]}
            onPress={seleccionarImagen}
          >
            <Icon name="camera" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* NOMBRE */}
        <Text style={[styles.label, { color: theme.textSecondary }]}>Nombre de usuario</Text>
        <View style={[styles.inputBox, { backgroundColor: theme.inputBackground, borderColor: theme.border }]}>
          <Icon name="person-outline" size={20} color={theme.textSecondary} style={{ marginRight: 10 }} />
          <TextInput
            style={[styles.input, { color: theme.text }]}
            value={nombre}
            onChangeText={setNombre}
            placeholder="Escribe tu nombre"
            placeholderTextColor={theme.textSecondary}
          />
        </View>

        {/* GUARDAR */}
        <View style={{ marginTop: 40, width: "100%" }}>
          <Button 
            title={guardando ? "Guardando..." : "Guardar Cambios"} 
            onPress={guardarPerfil} 
            disabled={guardando} 
          />
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 20, paddingTop: 40 },
  backBtn: { padding: 5 },
  title: { fontSize: 20, fontWeight: "bold" },
  content: { padding: 20, alignItems: "center", width: "100%" },
  fotoContainer: { position: "relative", marginBottom: 30 },
  foto: { width: 120, height: 120, borderRadius: 60, borderWidth: 3 },
  editFotoBtn: { position: "absolute", bottom: 0, right: 0, width: 36, height: 36, borderRadius: 18, justifyContent: "center", alignItems: "center", shadowColor: "#000", shadowOpacity: 0.2, shadowRadius: 4, elevation: 5 },
  label: { alignSelf: "flex-start", marginBottom: 8, fontWeight: "600", width: "100%" },
  inputBox: { flexDirection: "row", alignItems: "center", width: "100%", paddingHorizontal: 16, paddingVertical: 14, borderRadius: 16, borderWidth: 1 },
  input: { flex: 1, fontSize: 16 },
});
