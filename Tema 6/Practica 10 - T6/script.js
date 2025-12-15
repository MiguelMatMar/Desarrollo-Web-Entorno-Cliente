function timer(min,sec = 0){
    let suma = 0;

    if(typeof min !== "number" || min < 0 || typeof sec !== "number" || sec < 0){ // Comprobacion para numeros o positivos
        if(min < 0 || sec < 0){ // Respuesta a numeros negativos
            alert('Los argumentos introducidos son menores a 0.')
            return;
        }
        alert("Los argumentos introducidos no son numeros.")
        return; // Salimos
    }
    min = parseInt(min); // Parseamos luego la entrada por si acaso
    sec = parseInt(sec);
    if(sec != 0){ // Si se han introducido segundos, entonces el primer parametro se multiplica x 60 (minutos)
        min = min*60;
    }
    suma = min + sec; // Se hace la suma del tiempo
    let parrafo = document.createElement('p'); // Creamos un nuevo parrafo para cada vez que se ejecute esta funcion
    document.body.appendChild(parrafo) // Lo añadimos al body

    let intervalo = setInterval(()=>{ // Creamos el intervalo para cada 1 segundo se reste la suma total -1
        parrafo.textContent = suma;
        if(suma === 0){ // Cuando llegue a 0 para
            clearInterval(intervalo);
        }
        suma--;
    },1000)
}