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
    const entrenador = JSON.parse(sessionStorage.getItem('entrenador'))
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
        `<p>Su tiempo fue de ${usuario.tiempo}</p>`+
        `<p>${entrenador.victorias > 5 ? "¡¡Ya tienes tu equipo completo!!" : "Has capturado un nuevo pokemon 😎"}</p>`
            ,
        confirmButtonText: "Jugar otra partida",
        confirmButtonAriaLabel: 'Comienzo de partida',
        allowOutsideClick: false,
        allowEscapeKey: false,
        showCancelButton:true,
        cancelButtonText: "Reiniciar capturas",
        confirmButtonAriaLabel: 'reinicio de pokémons',
        
    })
    .then((res) => {
        
        if(!(res.isConfirmed)){
            
            entrenador.pokemons = []
            entrenador.victorias = 0
            sessionStorage.setItem('entrenador', JSON.stringify(entrenador))
        }else{
            entrenador.victorias += 1;
        }
        
        
        sessionStorage.setItem('entrenador',JSON.stringify(entrenador))
        insertarPokeballs();
        clickearPokeballs()
        reiniciarReloj();
        comenzarPartida(tiempo = false);
    })
}
// función para reiniciar el reloj
const reiniciarReloj = () =>{
    contador.innerText = '0:00'; //Reinicia el contador
    reloj = [0, 0]; //reinicia el reloj
}

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

const insertarMatriz = (matriz) => {
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
//Chequear si el juego está terminado
const juegoTerminado = () => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    
    compararMatrices(matrizResuelta, obtenerMatrizElementos()) ? sweetVictory() : undefined;
}

//Función para insertar pokeballs en el dom 
const insertarPokeballs = () =>{
    const entrenador = JSON.parse(sessionStorage.getItem('entrenador'))
    document.getElementById('pokeballs').innerText = ""
    for (let i = 1; i <= entrenador.victorias; i++) {
        const contenedor = document.createElement('div')
        contenedor.className = "d-flex flex-column"
        document.getElementById('pokeballs').appendChild(contenedor)
        const pokeball = document.createElement('img');
        pokeball.src = './imagenes/pokeball.svg';
        pokeball.id = `pokemon0${i}`;
        pokeball.className = "pokeball"
        pokeball.alt = "pokebola clickeable"
        const text = document.createElement('p')
        text.id = `textpokemon0${i}`;
        
        contenedor.appendChild(pokeball);      
        contenedor.appendChild(text);  
        if (i > 5){
            break;
        }  
    }
}

const traerPokemon = async (id) =>{
    
    await fetch(`https://pokeapi.co/api/v2/pokemon-form/${id}/`)
    .then((res) => res.json())
    .then((pokemon) =>{
        if (JSON.parse(sessionStorage.getItem('entrenador')).pokemons.length != 6){
        const pokemonData = {'id':id,'nombre':pokemon.name,'srcImg':pokemon.sprites.front_default};
        const entrenador = JSON.parse(sessionStorage.getItem('entrenador'));
        entrenador.pokemons.push(pokemonData);
        sessionStorage.setItem('entrenador',JSON.stringify(entrenador))
        }
    })
    
    
}












