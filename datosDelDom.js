
//Funciones que manipula la matriz del dom
function obtenerArrayElementosSudokuDom() { //devuelve un array con los valores del sudoku incrustado en el dom
    let array = []
    let listaElementos = document.getElementsByClassName("fila");
    // true devuelve los números de los elementos
    for (const elemento of listaElementos) {
        let elementoText = elemento.innerText;

        elementoText == "" ? array.push(0) : array.push(parseInt(elementoText));

    }

    return array
}
function obtenerMatrizElementos(original = true) { //transforma el array en una matriz
    matriz = []

    for (let i = 0; i < 16; i += 4) {
        matriz.push(obtenerArrayElementosSudokuDom().slice(i, i + 4))

    }

    return matriz
}




