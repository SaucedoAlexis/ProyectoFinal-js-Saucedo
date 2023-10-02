const pintarColumna = (id, pintar = true) => {
    const columna = id[1];
    if (pintar) {
        for (let i = 1; i < 5; i++) {
            if (`${i}${columna}` == id) {
                continue;
            }
            document.getElementById(`${i}${columna}`).className += " resaltarCeldas";
        }
    } else {
        for (let i = 1; i < 5; i++) {
            if (`${i}${columna}` == id) {
                continue;
            }
            const elementoAnterior = document.getElementById(`${i}${columna}`);
            const claseModificada = elementoAnterior.className.replace(
                " resaltarCeldas",
                ""
            );
            elementoAnterior.className = claseModificada;
        }
    }
};

const pintarFila = (id, pintar = true) => {
    const fila = id[0];
    if (pintar) {
        for (let i = 1; i < 5; i++) {
            if (`${fila}${i}` == id) {
                continue;
            }
            document.getElementById(`${fila}${i}`).className += " resaltarCeldas";
        }
    } else {
        for (let i = 1; i < 5; i++) {
            if (`${fila}${i}` == id) {
                continue;
            }
            const elementoAnterior = document.getElementById(`${fila}${i}`);
            const claseModificada = elementoAnterior.className.replace(
                " resaltarCeldas",
                ""
            );
            elementoAnterior.className = claseModificada;
        }
    }
};

const pintarCruzado = (id, pintar = true) => {
    
    id = String(id);
    
    if (parseInt(id) % 2 == 0) {
        
        id = (id[0] == 2 || id[0] == 4) ? parseInt(id) -11  :parseInt(id) + 9;
        
    } else {
        
        id = (id[0] == 1 || id[0] == 3) ? parseInt(id) + 11  :parseInt(id) - 9;
    }
    id = parseInt(id);
    
    if (pintar) {

        document.getElementById(id).className += " resaltarCeldas";
    } else {

        const elemento = document.getElementById(id);
        const claseModificada = elemento.className.replace(
            " resaltarCeldas",
            ""
        );
        elemento.className = claseModificada;
    }
    
};

const resaltarCeldas = (id, pintar = true) =>{
    
        pintarCruzado(id,pintar)
        pintarColumna(id,pintar)
        pintarFila(id,pintar)
    
        
}