let id = 0;
const celdas = document.getElementsByClassName("fila");
const sudoku = document.getElementById("sudoku");
const toastError = (type) => {
    let text = type == "num" ? "Número erroneo" : "No se puede modificar"
    Toastify({
        text: text,
        duration: 400,

        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: false, // Prevents dismissing of toast on hover
        className : "alerta" 

    }).showToast();
}

//Obtener la dificultad del sudoku
const dificultad = (document.getElementById("dificultad").onchange = //Obtiene el elemento dificultad del form select
    () => {
        insertarMatriz(matrizDificultad());
        id != 0 ? resaltarCeldas(id, false) : null; //No funciona con el short if
    });

//generar una matriz aleatoria en base a la dificultad

const matrizDificultad = () => {
    //Devuelve una matriz aleatoria con respecto a la dificultad
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

function insertarMatriz(matriz) {
    //Inserta una matriz en la matriz dom

    for (let i = 0; i != 4; i++) {
        for (let j = 0; j != 4; j++) {
            if (matriz[i][j] == 0) {
                document.getElementById(`${i + 1}${j + 1}`).innerText = "";
                continue;
            }
            const elemento = document.getElementById(`${i + 1}${j + 1}`)
            elemento.innerText = matriz[i][j];
            elemento.className += " original"
        }
    }
}


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
        if (!celdaActual.className.includes("original") && (event.key > 0 && event.key < 5)) {
            celdaActual.innerText = event.key;
        } else {
            event.key > 0 && event.key < 5 ? toastError("invalid") : toastError("num");
        }
    })
};

//sección para ingresar los números seleccionables
const numeros = document.getElementsByClassName("numeros");

const ingresarNumeros = () => {
    for (const elemento of numeros) {
        elemento.onclick = () => {
            if (id != 0) {
                if (document.getElementById(id).className.includes("original")) {
                    console.log("no se puede modificar");
                } else
                    document.getElementById(id).innerText = elemento.innerText;
            }
        };
    }
};

// borrar y deshacer
const borrar = document.getElementById("borrar");
borrar.onclick = () => {
    const elemento = document.getElementById(id)
    if (elemento.className.includes("original")) {
        console.log("No se puede modificar");

    } else {
        document.getElementById(id).innerText = "";
    }
};








