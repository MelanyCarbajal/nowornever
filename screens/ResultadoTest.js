import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function ResultadoTest({ route, navigation }) {
    const { tipo, total } = route.params;

    const guardarYSalir = () => {
        navigation.navigate("Tabs", {
            screen: "Perfil"
        });
    };
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 22 }}>Tu perfil:</Text>

            <Text style={{ fontSize: 28, marginVertical: 20 }}>
                {tipo}
            </Text>

            <Text>Puntaje: {total}/40</Text>

            <TouchableOpacity
                onPress={guardarYSalir}
                style={{ marginTop: 20, backgroundColor: "black", padding: 15 }}
            >
                <Text style={{ color: "white" }}>Guardar y ver perfil</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.replace("TestProcrastinacion")}
                style={{ marginTop: 10 }}
            >
                <Text>Hacer test otra vez</Text>
            </TouchableOpacity>
        </View>
    );
}