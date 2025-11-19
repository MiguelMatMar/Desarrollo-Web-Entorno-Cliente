function generarTablero(filas, columnas, numMinas) {
    const tablero = [];
    for (let i = 0; i < filas; i++) {
        tablero[i] = [];
        for (let j = 0; j < columnas; j++) {
            tablero[i][j] = 0; // Inicializa todas las celdas a 0
        }
    }
    let minasColocadas = 0;
    while (minasColocadas < numMinas) {
        const fila = Math.floor(Math.random() * filas);
        const columna = Math.floor(Math.random() * columnas);
        if (tablero[fila][columna] !== 'M') {
            tablero[fila][columna] = 'M'; // Coloca una mina
            minasColocadas++;
            // Actualiza los números alrededor de la mina
            for (let x = -1; x <= 1; x++) {
                for (let y = -1; y <= 1; y++) {
                    const nuevaFila = fila + x;
                    const nuevaColumna = columna + y;
                    if (nuevaFila >= 0 && nuevaFila < filas && nuevaColumna >= 0 && nuevaColumna < columnas && tablero[nuevaFila][nuevaColumna] !== 'M') {
                        tablero[nuevaFila][nuevaColumna]++;
                    }
                }
            }
        }
    }
    return tablero;
}
function mostrarTablero(tablero) {
    for (let i = 0; i < tablero.length; i++) {
        console.log(tablero[i].join(' '));
    }
}

mostrarTablero(generarTablero(5, 5, 5));

function buscaMinas(){

    

}