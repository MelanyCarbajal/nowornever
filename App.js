import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// 1. IMPORTACIÓN DE TODAS TUS PANTALLAS
// Asegúrate de que las rutas coincidan con la carpeta donde están tus archivos
import Inicio from "./screens/Inicio";
import Login from "./screens/Login";
import Registro from "./screens/Registro";
import Home from "./screens/Home"; 
import Perfil from "./screens/Perfil";
import NuevaSimulacion from "./screens/NuevaSimulacion";
import Recomendaciones from "./screens/Recomendaciones";

// Inicializamos los navegadores
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// 2. CREAMOS EL MENÚ INFERIOR (TAB NAVIGATOR)
// Este menú cumple con la rúbrica de combinar navegaciones.
// Solo será visible cuando el usuario haya iniciado sesión.
function HomeTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Simular" component={NuevaSimulacion} />
      <Tab.Screen name="Consejos" component={Recomendaciones} />
      <Tab.Screen name="Perfil" component={Perfil} />
    </Tab.Navigator>
  );
}

// 3. EL ENRUTADOR PRINCIPAL (STACK NAVIGATOR)
// Aquí apilamos las pantallas de entrada y conectamos el menú inferior.
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio" screenOptions={{ headerShown: false }}>
        
        {/* Pantallas iniciales (El menú inferior NO se ve aquí) */}
        <Stack.Screen name="Inicio" component={Inicio} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registro" component={Registro} />
        
        {/* 
          ¡EL TRUCO DE LA COMBINACIÓN ESTÁ AQUÍ!
          Cuando el usuario hace Login exitoso, lo enviamos a "HomeTabs".
          Esto cargará el Dashboard y habilitará las pestañas inferiores.
        */}
        <Stack.Screen name="HomeTabs" component={HomeTabs} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}