import React, { useState } from "react";
import { View, Text } from "react-native";

// Screens
import Login from "./screens/Login";
import Registro from "./screens/Registro";
import Home from "./screens/Home";
import Inicio from "./screens/Inicio";
import Perfil from "./screens/Perfil";

// Header
import Header from "./components/Header";

export default function App() {

  const [screen, setScreen] = useState("inicio");
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  const renderScreen = () => {

    console.log("SCREEN ACTUAL:", screen);

    switch (screen) {

      case "inicio":
        return <Inicio setScreen={setScreen} />;

      case "login":
        return (
          <Login
            setScreen={setScreen}
            setUser={setUser}
            users={users}
          />
        );

      case "registro":
        return (
          <Registro
            setScreen={setScreen}
            users={users}
            setUsers={setUsers}
          />
        );

      case "home":
        return (
          <Home
            setScreen={setScreen}
            user={user}
          />
        );

      case "perfil":
        return (
          <Perfil
            setScreen={setScreen}
            user={user}
          />
        );

      default:
        return (
          <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#F3E8FF"
          }}>
            <Text style={{ color: "red", fontWeight: "bold" }}>
              ❌ Screen no existe: {screen}
            </Text>
          </View>
        );
    }
  };

  return (
    <View style={{ flex: 1 }}>

      {/* Muestra header en todas las pantallas excepto inicio, login y registro */ }
      {screen !== "inicio" &&
       screen !== "login" &&
       screen !== "registro" && (
        <Header setScreen={setScreen} />
      )}

      {renderScreen()}

    </View>
  );
}