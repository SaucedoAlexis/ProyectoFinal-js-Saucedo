let minutos = 0
let tiempo = 0




const contador = document.getElementById("contador");
const pausa = document.getElementById("pausa");
const play = document.getElementById("play");

const actualizarReloj = (tiempo) => {
    if (tiempo < 10){
        contador.innerText = `${minutos}:0${tiempo}`;
    }
    else if(tiempo < 60){
        contador.innerText = `0:${tiempo}`
    } 
    else if(tiempo > 60){
        tiempo -= 60
        minutos += 1
        contador.innerText = `${minutos}:0${tiempo}`
    }
} 


pausa.onclick = () => {
    pausa.style = "display:none"
    play.style = ""
    
    
    

}

play.onclick = () => {
    play.style = "display:none"
    pausa.style = ""
    const temporizador = setInterval(() => {
        tiempo += 1
        actualizarReloj(tiempo)
    }, 1000);
    


}