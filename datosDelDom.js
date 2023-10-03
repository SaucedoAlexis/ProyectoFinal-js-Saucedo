
//Funciones que manipula la matriz del dom
function obtenerArrayElementosSudokuDom() { //devuelve un array con los elementos html [div#11.col.fila,div#12.col.fila,...,div#nn.col.fila]
    let array = []
    let listaElementos = document.getElementsByClassName("fila");
    // true devuelve los números de los elementos
    for (const elemento of listaElementos) {
        let elementoText = elemento.innerText;

        elementoText == "" ? array.push(0) : array.push(parseInt(elementoText));

    }

    return array
}
function obtenerMatrizElementos() { //devuelve una matriz de elementos o valores
    matriz = []

    for (let i = 0; i < 16; i += 4) {
        matriz.push(obtenerArrayElementosSudokuDom().slice(i, i + 4))

    }
    return matriz
}




