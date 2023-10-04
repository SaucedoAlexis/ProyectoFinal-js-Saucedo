let matriz = matrizDificultad()

insertarMatriz(matriz) //Insertar una matriz de dificultad 1 al abrir el sudoku
clickearCelda() // función para iniciar el clickeo de celdas, así como su pintada y despintada
ingresarNumeros()//funcion que ingresa números del sudoku en la dom

const nuevoSudokuResuelto = new Sudoku4x4(matriz).resolver();


