const USE_CUSTOM_NAVBAR = true;

import React, { useContext, useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { Ionicons as Icon } from "@expo/vector-icons";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";

import { ThemeProvider, ThemeContext } from "./context/ThemeContext";

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
import Configuracion from "./screens/Configuracion";
import Calendario from "./screens/Calendario";
import AcercaDe from "./screens/AcercaDe";
import CamaraEvidencia from "./screens/CamaraEvidencia";
import CustomTabBar from "./components/CustomTabBar";
import TestProcrastinacion from "./screens/TestProcrastinacion";
import ResultadoTest from "./screens/ResultadoTest";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

/* =========================
   HOME STACK
========================= */
function HomeStack() {
  const { theme } = useContext(ThemeContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={Home} />
      <Stack.Screen name="Resultado" component={Resultado} />
      <Stack.Screen name="Historial" component={Historial} />
      <Stack.Screen name="Estadisticas" component={Estadisticas} />
      <Stack.Screen name="Calendario" component={Calendario} />
    </Stack.Navigator>
  );
}

/* =========================
   PERFIL STACK
========================= */
function PerfilStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PerfilMain" component={Perfil} />
      <Stack.Screen name="Configuracion" component={Configuracion} />
      <Stack.Screen name="AcercaDe" component={AcercaDe} />
      <Stack.Screen name="Estadisticas" component={Estadisticas} />
      <Stack.Screen name="Historial" component={Historial} />
    </Stack.Navigator>
  );
}

/* =========================
   TABS
========================= */
function PrivateTabs() {
  const { theme } = useContext(ThemeContext);

  return (
    <Tab.Navigator
      tabBar={
        USE_CUSTOM_NAVBAR
          ? (props) => <CustomTabBar {...props} />
          : undefined
      }
      screenOptions={({ route }) => ({
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{ tabBarLabel: "Inicio" }}
      />

      <Tab.Screen
        name="NuevaSimulacion"
        component={NuevaSimulacion}
        options={{ tabBarLabel: "Simular" }}
      />

      <Tab.Screen
        name="Recomendaciones"
        component={Recomendaciones}
        options={{ tabBarLabel: "Consejos" }}
      />

      <Tab.Screen
        name="Perfil"
        component={PerfilStack}
        options={{ tabBarLabel: "Perfil" }}
      />
      <Tab.Screen
        name="Test"
        component={TestProcrastinacion}
        options={{
          tabBarLabel: "Test",
          tabBarIcon: ({ color, size }) => (
            <Icon name="clipboard-outline" size={size} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  );
}

/* =========================
   AUTH STACK
========================= */
function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Inicio" component={Inicio} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Registro" component={Registro} />
    </Stack.Navigator>
  );
}

/* =========================
   APP STACK (🔥 CORREGIDO)
========================= */
function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>

      {/* TABS PRINCIPALES */}
      <Stack.Screen name="Tabs" component={PrivateTabs} />

      {/* PANTALLAS GLOBALES (IMPORTANTE) */}
      <Stack.Screen name="NuevaSimulacion" component={NuevaSimulacion} />
      <Stack.Screen name="Resultado" component={Resultado} />
      <Stack.Screen name="CamaraEvidencia" component={CamaraEvidencia} />
      <Stack.Screen name="TestProcrastinacion" component={TestProcrastinacion} />
      <Stack.Screen name="ResultadoTest" component={ResultadoTest} />

    </Stack.Navigator>
  );
}

/* =========================
   MAIN
========================= */
function MainNavigation() {
  const { isDarkMode } = useContext(ThemeContext);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) return null;

  return (
    <NavigationContainer>
      <StatusBar style={isDarkMode ? "light" : "dark"} />
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

/* =========================
   APP
========================= */
export default function App() {
  return (
    <ThemeProvider>
      <MainNavigation />
    </ThemeProvider>
  );
}