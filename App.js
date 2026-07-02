import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { Ionicons as Icon } from "@expo/vector-icons";

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
import CustomTabBar from "./components/CustomTabBar";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// [SUPERVISOR MODE]: Cambia a 'false' si el jefe no aprueba el menú flotante
const USE_CUSTOM_NAVBAR = true;

/* =========================
   STACKS ANIDADOS (Para mantener el Navbar visible)
========================= */
function HomeStack() {
  const { theme } = useContext(ThemeContext);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: theme.background } }}>
      <Stack.Screen name="HomeMain" component={Home} />
      <Stack.Screen name="Resultado" component={Resultado} />
      <Stack.Screen name="Historial" component={Historial} />
      <Stack.Screen name="Estadisticas" component={Estadisticas} />
      <Stack.Screen name="Calendario" component={Calendario} />
    </Stack.Navigator>
  );
}

function PerfilStack() {
  const { theme } = useContext(ThemeContext);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: theme.background } }}>
      <Stack.Screen name="PerfilMain" component={Perfil} />
      <Stack.Screen name="Configuracion" component={Configuracion} />
      <Stack.Screen name="AcercaDe" component={AcercaDe} />
      <Stack.Screen name="Estadisticas" component={Estadisticas} />
      <Stack.Screen name="Historial" component={Historial} />
    </Stack.Navigator>
  );
}

/* =========================
   NAVEGACIÓN PRIVADA (TABS)
========================= */
function PrivateTabs() {
  const { theme } = useContext(ThemeContext);

  return (
    <Tab.Navigator
      tabBar={USE_CUSTOM_NAVBAR ? (props) => <CustomTabBar {...props} /> : undefined}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: USE_CUSTOM_NAVBAR ? { display: "none" } : {
          height: 65,
          paddingBottom: 8,
          paddingTop: 8,
          backgroundColor: theme.card,
          borderTopColor: theme.border,
          borderTopWidth: 1,
        },
        tabBarLabelStyle: { fontSize: 12, fontWeight: "600" },
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textSecondary,
        tabBarIcon: ({ color }) => {
          let iconName;
          if (route.name === "Home") iconName = "home";
          else if (route.name === "NuevaSimulacion") iconName = "add-circle";
          else if (route.name === "Recomendaciones") iconName = "bulb";
          else if (route.name === "Perfil") iconName = "person";
          return <Icon name={iconName} size={24} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} options={{ tabBarLabel: "Inicio" }} />
      <Tab.Screen name="NuevaSimulacion" component={NuevaSimulacion} options={{ tabBarLabel: "Simular" }} />
      <Tab.Screen name="Recomendaciones" component={Recomendaciones} options={{ tabBarLabel: "Consejos" }} />
      <Tab.Screen name="Perfil" component={PerfilStack} options={{ tabBarLabel: "Perfil" }} />
    </Tab.Navigator>
  );
}

function MainNavigation() {
  const { theme, isDarkMode } = useContext(ThemeContext);

  return (
    <NavigationContainer>
      <StatusBar style={isDarkMode ? "light" : "dark"} />
      <Stack.Navigator
        initialRouteName="Inicio"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.background },
        }}
      >
        <Stack.Screen name="Inicio" component={Inicio} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registro" component={Registro} />
        <Stack.Screen name="PrivateTabs" component={PrivateTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainNavigation />
    </ThemeProvider>
  );
}

