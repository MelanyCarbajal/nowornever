import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

// Configurar cómo se comportan las notificaciones cuando la app está en primer plano
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function registrarForPushNotificationsAsync() {
  if (Platform.OS === 'web') {
    if (window.Notification && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
    return;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    console.log('Fallo al obtener los permisos para notificaciones push.');
    return;
  }
}

export async function enviarNotificacionLocal(titulo, cuerpo, segundos = 1) {
  if (Platform.OS === 'web') {
    setTimeout(() => {
      if (window.Notification && Notification.permission === "granted") {
        new Notification(titulo, { body: cuerpo });
      } else {
        window.alert(`🔔 Notificación: ${titulo}\n\n${cuerpo}`);
      }
    }, segundos * 1000);
    return;
  }

  await Notifications.scheduleNotificationAsync({
    content: {
      title: titulo,
      body: cuerpo,
      sound: true,
    },
    trigger: { seconds: Math.max(1, segundos) },
  });
}
