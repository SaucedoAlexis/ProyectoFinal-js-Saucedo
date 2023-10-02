//Obtener la dificultad del sudoku
const dificultad = (document.getElementById("dificultad").onchange = //Obtiene el elemento dificultad del form select
    () => {
        insertarMatriz(matrizDificultad());
        resaltarCeldas(id,false)
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
            document.getElementById(`${i + 1}${j + 1}`).innerText = matriz[i][j];
        }
    }
}
//Variable global para eventos o modificaciones de celdas
let id = 0;
const celdas = document.getElementsByClassName("fila");
//Seción donde declaramos la función para pintar y despintar celdas

const clickearCelda = () => {
    for (const celda of celdas) {
        celda.onclick = () => {
            if (id != 0) {
                // const elementoAnterior = document.getElementById(`${id}`);
                // const claseModificada = elementoAnterior.className.replace(" fondoFocus", "");
                // elementoAnterior.className = claseModificada;
                // pintarCuadrante(id)
                resaltarCeldas(id,false)
                id = celda.id;
                resaltarCeldas(id,true)
            } else if (!celda.className.includes("fondoFocus")) {
                id = celda.id;
                // pintarCuadrante(id)
                resaltarCeldas(id,true)
            }
        };
    }
};

//sección para ingresar los números seleccionables
const numeros = document.getElementsByClassName("numeros");

const ingresarNumeros = () => {
    for (const elemento of numeros) {
        elemento.onclick = () => {
            if (id != 0) {
                document.getElementById(id).innerText = elemento.innerText;
            }
        };
    }
};

// borrar y deshacer
const borrar = document.getElementById("borrar");
borrar.onclick = () => {
    document.getElementById(id).innerText = 0;
};
// Pintar la columna, fila y cuadrante.



