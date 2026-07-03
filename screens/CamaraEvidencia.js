import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

export default function CamaraEvidencia({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);

  const [photo, setPhoto] = useState(null);

  // permisos cargando
  if (!permission) {
    return (
      <View style={styles.center}>
        <Text>Cargando cámara...</Text>
      </View>
    );
  }

  // sin permisos
  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={{ marginBottom: 10 }}>
          Necesitamos acceso a la cámara
        </Text>

        <TouchableOpacity style={styles.captureBtn} onPress={requestPermission}>
          <Text style={{ color: "white" }}>Permitir cámara</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // TOMAR FOTO
  const takePhoto = async () => {
    if (!cameraRef.current) return;

    try {
      const picture = await cameraRef.current.takePictureAsync();

      if (!picture?.uri) return;

      setPhoto(picture.uri);
    } catch (error) {
      console.log("Error tomando foto:", error);
    }
  };

  // CONTINUAR FLUJO (CORREGIDO)
  const continueFlow = () => {
    if (!photo) return;

    navigation.navigate("NuevaSimulacion", {
      foto: photo,
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>

      {/* CAMARA O MENSAJE WEB */}
      {!photo ? (
        Platform.OS !== "web" ? (
          <CameraView ref={cameraRef} style={{ flex: 1 }} />
        ) : (
          <View style={styles.center}>
            <Text style={{ color: "white", marginBottom: 10 }}>
              📸 Cámara no disponible en web
            </Text>

            <Text style={{ color: "gray", textAlign: "center" }}>
              Usa un dispositivo móvil o Expo Go
            </Text>
          </View>
        )
      ) : (
        <View style={styles.previewContainer}>
          <Text style={{ color: "white", marginBottom: 20 }}>
            Foto lista 📸
          </Text>

          {/* BOTÓN VOLVER A TOMAR */}
          <TouchableOpacity
            style={[styles.captureBtn, { marginBottom: 10 }]}
            onPress={() => setPhoto(null)}
          >
            <Text style={{ color: "white" }}>
              🔄 Volver a tomar
            </Text>
          </TouchableOpacity>

          {/* BOTÓN CONTINUAR */}
          <TouchableOpacity
            style={[styles.captureBtn, { backgroundColor: "green" }]}
            onPress={continueFlow}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              ▶ Continuar
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* BOTÓN CAPTURAR */}
      {!photo && Platform.OS !== "web" && (
        <View style={styles.controls}>
          <TouchableOpacity style={styles.captureBtn} onPress={takePhoto}>
            <Text style={{ color: "white" }}>
              ● Capturar evidencia
            </Text>
          </TouchableOpacity>
        </View>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  controls: {
    position: "absolute",
    bottom: 50,
    width: "100%",
    alignItems: "center",
  },

  captureBtn: {
    backgroundColor: "#1f1f1f",
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#fff",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  previewContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});