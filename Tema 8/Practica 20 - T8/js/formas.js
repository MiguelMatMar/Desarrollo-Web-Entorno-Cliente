/**
 * Genera un color RGB aleatorio.
 * @returns {string} Color en formato rgb(r,g,b).
 */
export const generarColorAleatorio = () => {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
};

/**
 * Crea un elemento div configurado pero sin añadirlo aún al DOM.
 * @param {MouseEvent} e - Evento del ratón.
 * @param {number} tamaño - Tamaño aleatorio de la figura.
 * @returns {HTMLDivElement} El div configurado.
 */
export const configurarFigura = (e, tamaño) => {
    let div = document.createElement('div');
    let color = generarColorAleatorio();

    // Estilos base y posicionamiento centrado
    div.style.position = "absolute";
    div.style.backgroundColor = color;
    div.style.width = `${tamaño}px`;
    div.style.height = `${tamaño}px`;
    
    // Cursor en el medio de la figura
    div.style.top = `${e.clientY - tamaño / 2}px`;
    div.style.left = `${e.clientX - tamaño / 2}px`;

    return div;
};