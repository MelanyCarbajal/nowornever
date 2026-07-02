import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


import Inicio from "./screens/Inicio";
import Login from "./screens/Login";
import Registro from "./screens/Registro";
import Home from "./screens/Home";
import Perfil from "./screens/Perfil";
import NuevaSimulacion from "./screens/NuevaSimulacion";
import Recomendaciones from "./screens/Recomendaciones";
import Resultado from "./screens/Resultado";
import Estadisticas from "./screens/Estadisticas";
import Historial from "./screens/Historial";

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

/* =========================
   NAVEGACIÓN PRIVADA (TABS)
========================= */

function PrivateTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,

        tabBarStyle: {
          height: 60,
          paddingBottom: 5,
        },

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Inicio",
        }}
      />

      <Tab.Screen
        name="NuevaSimulacion"
        component={NuevaSimulacion}
        options={{
          tabBarLabel: "Simular",
        }}
      />

      <Tab.Screen
        name="Recomendaciones"
        component={Recomendaciones}
        options={{
          tabBarLabel: "Consejos",
        }}
      />

      <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{
          tabBarLabel: "Perfil",
        }}
      />

    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Inicio"
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* =========================
            RUTAS PÚBLICAS
        ========================= */}

        <Stack.Screen name="Inicio" component={Inicio} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registro" component={Registro} />
        <Stack.Screen name="PrivateTabs" component={PrivateTabs} />
        <Stack.Screen name="Resultado" component={Resultado} />
        <Stack.Screen name="Historial" component={Historial} />
        <Stack.Screen name="Estadisticas" component={Estadisticas} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
