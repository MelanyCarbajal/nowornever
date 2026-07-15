import React, { createContext, useState, useEffect } from "react";
import { enviarNotificacionLocal } from "../services/notificationService";

export const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [activeTimerId, setActiveTimerId] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    let interval;
    if (activeTimerId !== null && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (activeTimerId !== null && timeLeft === 0) {
      // El tiempo se agoto
      enviarNotificacionLocal(
        "¡El tiempo se ha agotado! ⏳", 
        "Es momento de tomar un descanso o finalizar la tarea. ¡Buen esfuerzo!",
        1
      );
      setActiveTimerId(null);
    }
    return () => clearInterval(interval);
  }, [activeTimerId, timeLeft]);

  const iniciarTimerReal = (id, minutos) => {
    setActiveTimerId(id);
    setTimeLeft(minutos * 60);
  };

  const detenerTimerGlobal = () => {
    setActiveTimerId(null);
    setTimeLeft(0);
  };

  return (
    <TimerContext.Provider value={{ activeTimerId, timeLeft, iniciarTimerReal, detenerTimerGlobal }}>
      {children}
    </TimerContext.Provider>
  );
};
