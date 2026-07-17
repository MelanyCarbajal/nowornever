export const calcularPuntoNoRetorno = ({
  fechaLimite,
  horasNecesarias,
  horasDiarias,
}) => {


  const fechaFinal = new Date(fechaLimite);

  // Cuántos días necesitas realmente
  const diasNecesarios = Math.ceil(
    horasNecesarias / horasDiarias
  );

  // Fecha donde deberías empezar
  const fechaCritica = new Date(fechaFinal);
  fechaCritica.setDate(
    fechaCritica.getDate() - diasNecesarios
  );

  const ahora = new Date();
  const diferencia =
    fechaCritica - ahora;


  const horasRestantes = Math.floor(
    diferencia /
    (1000 * 60 * 60)
  );


  let nivel;


  if(horasRestantes <= 0){

    nivel = "critico";

  }
  else if(horasRestantes <= 24){

    nivel = "alto";

  }
  else if(horasRestantes <= 72){

    nivel = "moderado";

  }
  else{

    nivel = "seguro";

  }



  return {

    fechaCritica,

    horasRestantes,

    nivel

  };


};