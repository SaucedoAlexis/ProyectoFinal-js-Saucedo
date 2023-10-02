
//Funciones que manipula la matriz del dom
function obtenerArrayElementosSudokuDom(values = true) { //devuelve un array con los elementos html [div#11.col.fila,div#12.col.fila,...,div#nn.col.fila]
    let array = []
    let listaElementos = document.getElementsByClassName("fila");
    if (values) { // true devuelve los números de los elementos
        for (const elemento of listaElementos) {

            array.push(parseInt(elemento.innerText))
        }
    }else{
        array = listaElementos //false devuelve los elementos de html
    }
    return array
}



function obtenerMatrizElementos(values = true) { //devuelve una matriz de elementos o valores
    matriz = []
    if (values) {//valors == true devuelve una matriz de los valores de los elementos


        for (let i = 0; i < 16; i += 1) {

            for (let j = 0; j < 4; j++) {
                let array = []
                obtenerArrayElementosSudokuDom()
            }
            matriz.push(fila)
        }


    } else {

        for (let i = 0; i < 16; i += 4) {
            const fila = obtenerArrayElementosSudokuDom().slice(i, i + 4)

            matriz.push(fila)

        }

    }
    return matriz
}





function obtenerArrayElementos(fila) { // devuelve un array de los valores actuales de los inputs de la tabla [0,1,2,3]
    let array = []
    for (let i = 0; i != 4; i++) {
        array.push(parseInt(obtenerFilasDeInputs()[i].innerText))

    }
    return array
}

function sudokuResuelto() {//devuelve la solución del sudoku si es posible o un null
    const sudoku = new Sudoku4x4(obtenerMatrizInputs());

    return sudoku.resolver();
}


