let minutos = 0
let tiempo = 0
let temporizador;
let reloj = [0, 0]




const contador = document.getElementById("contador");
const accionTiempo = document.getElementById("accionTiempo");





const actualizarReloj = () => {
    if (reloj[1] < 10) {

        contador.innerText = `${reloj[0]}:0${reloj[1]}`;
    }
    else if (reloj[1] >= 10 && reloj[1] < 60) {

        contador.innerText = `${reloj[0]}:${reloj[1]}`;
    }
    else if (reloj[1] >= 59) {
        reloj[0]++;
        reloj[1] = 0
        contador.innerText = `${reloj[0]}:0${reloj[1]}`;
    }


}


accionTiempo.onclick = () => {

    if (accionTiempo.src.includes("pause")) {
        accionTiempo.src = "./imagenes/play-circle.svg"
        accionTiempo.alt = "boton de play"
        // Detenemos el temporizador
        clearInterval(temporizador);



    }
    else if (accionTiempo.src.includes("play")) {
        accionTiempo.src = "./imagenes/pause-circle.svg"
        accionTiempo.alt = "boton de pausa"
        

        // Iniciamos el temporizador
        temporizador = setInterval(() => {
            reloj[1]++;
            actualizarReloj();
        }, 1000);


    }
}