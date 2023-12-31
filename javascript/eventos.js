//Evento para el cambio de dificultad
dificultad.onchange =
    () => {

        const matrizInicial = matrizDificultad()
        insertarMatriz(matrizInicial)
        matrizPartida = matrizInicial;
        matrizResuelta = new Sudoku4x4(obtenerMatrizElementos(true)).resolver() //ingresa una nueva matriz aleatoria

        id != 0 ? resaltarCeldas(id, false) : null;//limpia el resaltamiento de celdas

        if (accionTiempo.src.includes("play")) {

            accionTiempo.src = "./imagenes/pause-circle.svg"
            accionTiempo.alt = "boton de pausa"
            temporizador = setInterval(() => {
                reloj[1]++;
                actualizarReloj();
            }, 1000);
        }
        reiniciarReloj()


    };

//for para generar eventos al clickear cualquier celda

const clickearCelda = () => {
    let celdaActual;
    for (const celda of celdas) {

        celda.onclick = () => {
            celdaActual = celda;
            if (id != 0) {

                resaltarCeldas(id, false)

                id = celda.id;
                resaltarCeldas(id, true)
            } else {
                id = celda.id;

                resaltarCeldas(id, true)
            }
        };



    }


    document.addEventListener('keydown', (event) => {


        try {
            if (!celdaActual.className.includes("original") && (event.key > 0 && event.key < 5)) {
                celdaActual.innerText = event.key;
                juegoTerminado()
            } else {
                event.key > 0 && event.key < 5 ? toastError("invalid") : toastError("num");
            }
        }
        catch (e) {
            toastError()
        }
    })



};
//evento para ingresar los números seleccionables


const ingresarNumeros = () => {
    for (const elemento of numeros) {
        elemento.onclick = () => {
            if (id != 0) {
                if (document.getElementById(id).className.includes("original")) {
                    toastError("invalid")
                } else
                    document.getElementById(id).innerText = elemento.innerText;
            }
            juegoTerminado()
        };
    }
};
// evento borrar y reiniciar

borrar.onclick = () => {
    const elemento = document.getElementById(id)
    if (elemento.className.includes("original")) {
        toastError("invalid")

    } else {
        document.getElementById(id).innerText = "";
    }
};

reiniciar.onclick = () => {
    insertarMatriz(matrizPartida)
    reiniciarReloj()
}

//evento para clickear pokeballs


const clickearPokeballs = () => {
    const pokeballs = document.getElementsByClassName("pokeball")
    for (const ball of pokeballs) {
        //reingreso del pokemon a la pokeball
        ball.onclick = () => {

            ball.className += " animacionSalir"
            if (ball.className.includes('pokemon')) {
                setTimeout(() => {
                    ball.src = './imagenes/pokeball.svg'
                    ball.className = 'pokeball'
                    const id = ball.id[ball.id.length - 1]
                    const ballText = document.getElementById(`textpokemon0${id}`)
                    ballText.className = ""
                    ballText.innerText = ``
                }, 1000)
            }
            //Dejar salir pokemon
            else {
                //variables para usar en la salida del pokemon
                const ballId = ball.id[ball.id.length - 1];
                let poke = JSON.parse(sessionStorage.getItem('entrenador')).pokemons[ballId - 1];
                //insertar animación a la ball
                ball.className += " animacionSalir"
                //insertar pokemon con un intervalo de tiempo
                setTimeout(() => {
                    inertarPokemon(ballId, ball, poke)
                }, 1000)
            }
        }
    }
}

