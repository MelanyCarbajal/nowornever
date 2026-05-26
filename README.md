# ⏳ Sistema Móvil de Simulación de Procrastinación - NOW OR NEVER
## 📖 Propósito del Proyecto
El **Sistema Móvil de Simulación de Procrastinación** es una aplicación desarrollada en **React Native** que busca ayudar a los usuarios a comprender cómo la procrastinación afecta el cumplimiento de sus objetivos y tareas.

A diferencia de una aplicación convencional de gestión de tareas, este sistema permite:

- Analizar el impacto de la procrastinación sobre metas personales.
- Calcular el **“Punto de No Retorno”**, momento en el que una tarea se vuelve difícil o imposible de completar a tiempo.
- Brindar recomendaciones y consejos motivacionales en tiempo real.
- Visualizar simulaciones e historial de productividad.

El proyecto combina análisis predictivo, experiencia de usuario moderna y desarrollo móvil multiplataforma.

---

#  Objetivos del Avance 2 (APF2)

En este segundo avance se implementaron los siguientes requerimientos:

## Navegación Combinada
Implementación de navegación utilizando **React Navigation**:

-  Rutas públicas mediante `Stack Navigator`
-  Rutas privadas mediante `Bottom Tab Navigator`

---

## Manejo de Estados y Eventos
Uso de Hooks de React:

- `useState`
- `useEffect`

Aplicados en:

- Login
- Registro
- Nueva simulación

---

##  Consumo de API y Datos Mock
Implementación de:

- `fetch()` para obtener consejos motivacionales.
- Datos locales tipo Mock para el historial.

Incluye:

- Manejo de carga (`loading`)
- Control de errores (`try/catch`)

---

##  Interfaz de Usuario (UI/UX)
Uso de componentes reutilizables y dinámicos:

- `FlatList`
- `TouchableOpacity`
- `TextInput`

Con diseño moderno y experiencia de usuario intuitiva.

---

#  Dependencias e Instalación

Antes de comenzar, asegúrate de tener instalado:

- Node.js
- npm
- Expo CLI (opcional)

##  Instalación del Proyecto

Ejecuta los siguientes comandos en la terminal:

```bash
# Instalar dependencias del proyecto
npm install

# Instalar dependencias de Expo y React Navigation
npx expo install @react-navigation/native \
@react-navigation/native-stack \
@react-navigation/bottom-tabs \
react-native-screens \
react-native-safe-area-context


#  Instrucciones de Ejecución

Para iniciar el servidor de desarrollo de Expo:

```bash
npx expo start
```
Luego podrás ejecutar la aplicación de las siguientes maneras:

- Escaneando el código QR con la aplicación **Expo Go**
-  Presionando la tecla `w` para abrir la versión web
- Ejecutando un emulador Android/iOS a

---

# Estructura General del Proyecto

```bash
📦 proyecto
 ┣ 📂 assets
 ┣ 📂 components
 ┣ 📂 navigation
 ┣ 📂 screens
 ┣ 📂 data
 ┣ 📜 App.js
 ┣ 📜 package.json
 ┗ 📜 README.md
```

---

---

# Estado del Proyecto en proceso



