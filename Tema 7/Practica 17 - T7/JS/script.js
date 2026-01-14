

document.addEventListener('click',(e)=>{

    // Creamos la pelota para añadirla al body
    let pelota = document.createElement('div');
    let body = document.getElementsByTagName('body')[0];
    pelota.classList.add('pelota');

    // Posiciones del raton del usuario
    let posX = e.clientX;
    let posY = e.clientY;
    // Estilos random de la pelota
    let colorRand1 = Math.floor(Math.random() * 255) + 1;
    let colorRand2 = Math.floor(Math.random() * 255) + 1;
    let colorRand3 = Math.floor(Math.random() * 255) + 1;
    let tamaño = Math.floor(Math.random() * 200) + 1;
    let color = `rgb(${colorRand1},${colorRand2},${colorRand3})`;
    // Le asignamos los estilos
    pelota.style.backgroundColor = color;
    pelota.style.top = posY + "px";
    pelota.style.left = posX +"px";
    pelota.style.height = tamaño +"px";
    pelota.style.width = tamaño +"px";
    // Por ultimo creamos la pelota
    body.appendChild(pelota);
})