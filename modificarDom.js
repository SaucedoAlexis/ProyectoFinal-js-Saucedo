//Id de la dificultad para apuntar a la celda determinada
let id = 0;
//elementos del documento
const celdas = document.getElementsByClassName("fila");
const sudoku = document.getElementById("sudoku");
const dificultad = document.getElementById("dificultad");
const numeros = document.getElementsByClassName("numeros");
const borrar = document.getElementById("borrar");
const reiniciar = document.getElementById("reiniciar")
//declaración del toast para usar como error
const toastError = (type) => {
    let text = type == "num" ? "Número erroneo" : "No se puede modificar" ? "Celda no seleccionada" : undefined

    Toastify({
        text: text,
        duration: 400,

        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: false, // Prevents dismissing of toast on hover
        className: "alerta"

    }).showToast();
}

//sweetAlert para la vicotoria
const sweetVictory = () => {
    
    const usuario = JSON.parse(localStorage.getItem('usuario'))
    usuario.SudokusRealizados += 1
    usuario.tiempo = contador.innerText
    
    localStorage.setItem("usuario",JSON.stringify(usuario))
    Swal.fire({
        title: '<b>¡¡Has ganado!!</b>',
        icon: 'success',
        html:
        `<p>Has obtenido la victoria ${usuario.nombre}</p>`+
        `<p>Este es tu sudoku n°${usuario.SudokusRealizados}</p>`+
        `<p>Su tiempo fue de ${usuario.tiempo}</p>`
            ,
        confirmButtonText: "Jugar otra partida",
        confirmButtonAriaLabel: 'Comienzo de partida',
        allowOutsideClick: false,
        allowEscapeKey: false,

    })
    .then(() => {
        reiniciarReloj()
        comenzarPartida(false)
    })
}
// función para reiniciar el reloj
const reiniciarReloj = () =>{
    contador.innerText = '0:00'; //Reinicia el contador
    reloj = [0, 0]; //reinicia el reloj
}




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

//generar una matriz aleatoria en base a la dificultad

const matrizDificultad = () => { //Devuelve una matriz aleatoria con respecto a la dificultad

    let matriz;
    const dificultad = document.getElementById("dificultad").value;
    const random = Math.round(Math.random() * 4);

    switch (parseInt(dificultad)) {
        case 1:
            matriz = matrices_facil[random];
            break;
        case 2:
            matriz = matrices_medio[random];
            break;
        case 3:
            matriz = matrices_dificil[random];
            break;
        default:
            throw new Error("Dificultad no válida");
    }

    return matriz;
};
const limpiarMatrizDom = () => { //Limpia las clases de las celdas para que no haya stack de la clase original
    for (const celda of celdas) {
        const limpiarCelda = celda.className.replace(" original", "")
        celda.className = limpiarCelda;
    }
}

function insertarMatriz(matriz) {
    //Inserta una matriz en la matriz dom

    limpiarMatrizDom()
    for (let i = 0; i != 4; i++) {
        for (let j = 0; j != 4; j++) {
            if (matriz[i][j] != 0) {
                const elemento = document.getElementById(`${i + 1}${j + 1}`)
                elemento.innerText = matriz[i][j];
                elemento.className += " original"

            } else {
                document.getElementById(`${i + 1}${j + 1}`).innerText = "";
            }

        }
    }
}
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
        }})
        
    

};

//sección para ingresar los números seleccionables


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
//Chequear si el juego está terminado
const juegoTerminado = () => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    
    compararMatrices(matrizResuelta, obtenerMatrizElementos()) ? sweetVictory() : undefined;
}

// borrar y deshacer

borrar.onclick = () => {
    const elemento = document.getElementById(id)
    if (elemento.className.includes("original")) {
        toastError("invalid")

    } else {
        document.getElementById(id).innerText = "";
    }
};

reiniciar.onclick = () =>{
    insertarMatriz(matrizPartida)
    reiniciarReloj()
}









