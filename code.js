//Matriz en juego
let matrizPartida;
let matrizResuelta;
let usuario;
//función para comenzar partida
const comenzarPartida = (tiempo = false) => {
    if (tiempo) {
        temporizador = setInterval(() => {
            reloj[1]++;
            actualizarReloj();
        }, 1000);
    }
    const matrizInicial = matrizDificultad()
    insertarMatriz(matrizInicial)
    matrizPartida = matrizInicial;
    matrizResuelta = new Sudoku4x4(obtenerMatrizElementos(true)).resolver()
}
//Acciones de SweetAlert
if (localStorage.getItem('usuario') == null) {
    Swal.fire({
        title: '<b>Este es tu primer ingreso</b>',
        icon: 'question',
        html:
            'Hola extraño, este es tu primer ingreso\n' +
            'Por favor, ingresa tu nombre para poder identificarte 😎😎\n',

        input: 'text',
        inputLabel: 'Su nombre',

        inputValidator: (value) => {
            if (!value) {
                return 'Tienes que ingresar tu nombre!!'
            } else {
                usuario = { 'nombre': value, 'SudokusRealizados': 0, 'tiempo': 0 }

                localStorage.setItem('usuario', JSON.stringify(usuario));


            }
        },


        confirmButtonText: "Qué comience la partida!",
        confirmButtonAriaLabel: 'Comienzo de partida',
        allowOutsideClick: false,
        allowEscapeKey: false,

    })
        .then(() => {
            comenzarPartida(true)
        })
} else {

    const usuario = JSON.parse(localStorage.getItem('usuario'));
    Swal.fire({
        title: `<b>¿¿Nuevamente aquí ${usuario.nombre}??</b>`,
        icon: 'info',
        html:
            'Ya que estás podés jugarte una partida 😁😁',

        confirmButtonText: "Qué comience la partida!",
        confirmButtonAriaLabel: 'Comienzo de partida',
        allowOutsideClick: false,
        allowEscapeKey: false,

    })
        .then(() => {
            comenzarPartida(true)

        })
}



clickearCelda() // función para iniciar el clickeo de celdas, así como su pintada y despintada
ingresarNumeros()//funcion que ingresa números del area inferior del sudoku en el dom del sudoku al presionarlos






