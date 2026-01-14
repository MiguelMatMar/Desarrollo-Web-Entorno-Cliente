let contenedor = document.getElementsByTagName('div')[0];
let creado = false;

contenedor.addEventListener('scroll', () => {
    if (contenedor.scrollTop + contenedor.clientHeight >= contenedor.scrollHeight - 1 && !creado) { // Si ha llegado al fondo y el boton no se ha creado
        let boton = document.createElement('button');
        boton.textContent = "Aceptar";
        document.body.appendChild(boton);
        creado = true;
    }
});
