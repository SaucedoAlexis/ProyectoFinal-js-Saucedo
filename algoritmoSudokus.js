class Sudoku4x4 {
    constructor(matriz) {
        this.matriz = matriz;
    }

    mostrarFila(fila) {
        return this.matriz[fila];
    }

    mostrarColumna(columna) {
        return this.matriz.map(row => row[columna]);
    }



    mostrarCuadrante(columna, fila) {
        let filas = this.definirFilas(fila);
        let filasReducidas = columna <= 1 ? filas.map(fila => fila.slice(0, 2)) : filas.map(fila => fila.slice(2, 4))
        let cuadrante = []
        for (let i = 0; i < filasReducidas.length; i++) {//bucle para unir la reducción de filas
            cuadrante.push(filasReducidas[i][0])
            cuadrante.push(filasReducidas[i][1])

        }
        return cuadrante

    }

    definirFilas(fila) {

        return fila <= 1 ? this.matriz.slice(0, 2) : this.matriz.slice(2, 4);//Corta las filas que pertenezcan al número
    }

    quedanCeros(matriz = this.matriz) {//ver si quedan 0 en el sudoku
        return matriz.map(fila => fila.includes(0)).includes(true) ? true : false
    }
    esPosibleResolver(matriz = this.matriz) {
        for (let i = 0; i != 4; i++) {
            for (let j = 0; j != 4; j++) {
                if (matriz[i][j] < 0 || matriz[i][j] > 4 || isNaN(matriz[i][j])) {
                    return false
                }
            }

        }
        return true
    }
    resolver(matriz = this.matriz) {
        let vueltas = 0;
        if (this.esPosibleResolver(matriz)) {
            while (this.quedanCeros(this.matriz)) { //bucle que se reproduce hasta que se generan 10 vueltas al sudoku o no quedan más 0
                vueltas += 1;
                if (vueltas > 10) {
                    matriz = null;
                    break;
                }
                for (let fila = 0; fila < 4; fila++) {

                    for (let columna = 0; columna < 4; columna++) {//dos bucles, uno para fila y otro para columna, de esta manera se recorrerá cada ocurrencia de la matriz - sudoku y podrá ser evaluado según el algoritmo
                        if (this.matriz[fila][columna] == 0) {

                            let numsPosibles = [];
                            let ponerNum = [1, 2, 3, 4];

                            const filtroNumeros = [this.mostrarFila(fila), this.mostrarColumna(columna), this.mostrarCuadrante(columna, fila)]
                            //crea una lista con listas de los números correspondientes a la columna fila y cuadrante de un número
                            filtroNumeros.map(lista => lista.forEach(num => {
                                num != 0 & !numsPosibles.includes(num) ? numsPosibles.push(num) : -1
                            }))
                            //se le aplica una función a cada lista la cual observará los números y los agregará a numsposibles siempre y cuando sean diferentes de 0 o no se encuientren en la lista


                            ponerNum = ponerNum.filter(elemento => !numsPosibles.includes(elemento))//es la operación de confundo "diferencia" la cual deja la diferencia entre numsposibles y poner num

                            //cuando solo haya un número en ponerNum, se modificará la matriz cambiando el 0 por el número de la lista.
                            if (ponerNum.length == 1) {
                                this.matriz[fila][columna] = ponerNum[0]
                            }

                        }

                    }

                }
            }

        } else {
            matriz = 'invalida'
        }
        return matriz
    }



}

function compararMatrices(matriz, secondMatriz) {
    for (let i = 0; i != 4; i++) {
        for (let j = 0; j != 4; j++) {
            if (matriz[i][j] != secondMatriz[i][j]) {
                return false;
            }
        }

    }
    return true;
}