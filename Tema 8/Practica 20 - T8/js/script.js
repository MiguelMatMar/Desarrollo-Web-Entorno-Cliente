import { configurarFigura } from './formas.js';

/**
 * Evita el menú contextual por defecto del navegador.
 * @param {MouseEvent} e - El evento de menú contextual.
 */
document.addEventListener('contextmenu', e => e.preventDefault());

/**
 * Crea y posiciona figuras aleatorias en el DOM al hacer clic.
 * @param {MouseEvent} e - El evento de ratón.
 */
document.addEventListener('mousedown', (e) => {
    // Creamos el div para añadirla al body 
    let tamaño = Math.floor(Math.random() * 200) + 1;
    let div = configurarFigura(e, tamaño);
    let body = document.body;

    // Lógica de formas
    if (e.button === 0) {
        div.classList.add('pelota'); 
    } else if (e.button === 2) {
        div.classList.add('cuadrado');
    }

    // Por ultimo creamos 
    body.appendChild(div);
});

/**
 * Gestión de excepción por doble clic.
 */
document.addEventListener('dblclick', () => {
    try {
        throw new Error("Interacción errónea");
    } catch (error) {
        console.error(error.message);
    }
});