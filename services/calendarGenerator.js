export const generarCalendarioLocal = async (simulaciones) => {
  const eventosGenerados = [];
  const fechaActual = new Date();
  fechaActual.setHours(0, 0, 0, 0);

  simulaciones.forEach((sim, index) => {
    // Estimamos bloques de 2 horas
    const bloquesNecesarios = Math.ceil(sim.horasEfectivas / 2); 
    
    // Distribuir los bloques en los días restantes
    for (let i = 0; i < bloquesNecesarios; i++) {
      const fechaBloque = new Date(fechaActual);
      // Espaciar los bloques
      const diaDesplazamiento = sim.diasRestantes > 0 ? (i % sim.diasRestantes) : 0;
      fechaBloque.setDate(fechaBloque.getDate() + diaDesplazamiento);

      let tipoRiesgo = "seguro";
      if (sim.riesgo >= 80) tipoRiesgo = "crítico";
      else if (sim.riesgo >= 50) tipoRiesgo = "moderado";

      eventosGenerados.push({
        id: `local_evt_${index}_${i}_${Date.now()}`,
        titulo: `Avanzar: ${sim.objetivo}`,
        fecha: fechaBloque.toISOString().split("T")[0] + " 10:00 AM",
        fechaObj: fechaBloque.getTime(), // Para ordenar
        tipo: tipoRiesgo,
        completado: false
      });
    }
  });

  // Ordenar cronológicamente
  eventosGenerados.sort((a, b) => a.fechaObj - b.fechaObj);

  return eventosGenerados;
};
