let caja = document.getElementsByTagName('div')[0];
let anterior = "transparent";

// Entrar - Salir
caja.addEventListener('mouseenter', () => {
    caja.style.backgroundColor = "green";
});
caja.addEventListener('mouseout', () => {
    caja.style.backgroundColor = "transparent";
});

// Los clicks
caja.addEventListener('mousedown', (e) => {
    anterior = caja.style.backgroundColor;

    if (e.button === 0) {
        caja.style.backgroundColor = "red";
    } else if (e.button === 2) {
        caja.style.backgroundColor = "blue";
    }
});

// Soltar los clicks
caja.addEventListener('mouseup', () => {
    caja.style.backgroundColor = anterior;
});

// Para el menu por defecto, quitarlo
caja.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});
