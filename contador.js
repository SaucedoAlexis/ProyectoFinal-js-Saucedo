let minutos = 0
let tiempo = 0




const contador = document.getElementById("contador");
const accionTiempo = document.getElementById("accionTiempo");



let temporizador;

let reloj = [0, 0, 0]

const actualizarReloj = () => {
    if (reloj[2] == 10) {
        reloj[1]++;
        reloj[2] = 0;
    }
    else if (!(reloj[1] < 6)) {
        reloj[1] = 0;
        reloj[2] = 0;
        reloj[0]++;
        
    }

    contador.innerText = `${reloj[0]}:${reloj[1]}${reloj[2]}`;
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
        
        if (temporizador) {
            clearInterval(temporizador);
        }

        // Iniciamos el temporizador
        temporizador = setInterval(() => {
            reloj[2]++;
            actualizarReloj();
        }, 200);


    }
}