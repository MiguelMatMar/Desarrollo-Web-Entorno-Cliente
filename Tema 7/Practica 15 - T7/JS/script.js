let contenedor = document.getElementsByTagName('div')[0];
let creado = false;
let boton = document.createElement('button');

contenedor.addEventListener('scroll', () => {
    if (contenedor.scrollTop + contenedor.clientHeight >= contenedor.scrollHeight - 1 && !creado) { // Si ha llegado al fondo y el boton no se ha creado
        boton.textContent = "Aceptar";
        document.body.appendChild(boton);
        creado = true;
    }
});

boton.addEventListener('click', ()=>{
    contenedor.style.display = "none";
    boton.style.display = "none";
})