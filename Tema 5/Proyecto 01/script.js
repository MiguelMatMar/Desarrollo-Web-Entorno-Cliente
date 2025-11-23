let filas = 5;      
let columnas = 10;
let numMinas = 5;

let tablero = []; // Tablero principal
let tableroRevelado = [];  // Nuevo tablero para revelar todas las celdas

// Inicializa el tableroRevelado (con la configuracion del tablero del usuario), son 2 tableros diferentes, uno para el juego (con las minas etc) y otro para mostrar las celdas reveladas al usuario, inicialmente todas las celdas son falsas (no reveladas)
for (let i = 0; i < filas; i++) {
    tableroRevelado[i] = [];
    for (let j = 0; j < columnas; j++) {
        tableroRevelado[i][j] = false; // Inicializa todas las celdas como no reveladas
    }
}

function generarTablero(filas, columnas, numMinas) {
    // i es filas, j es columnas
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
        if (tablero[fila][columna] !== 'M') { // Si no hay mina ya colocada
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
// Esta función se llama cuando el usuario hace clic en una celda para revelarla, es la función principal del juego
function actualizarTablero(fila, columna) { 
    tableroRevelado[fila][columna] = true; // Marca la celda como revelada
    if (tablero[fila][columna] === 'M') { // Si la celda es una mina
        alert("¡Has perdido! Has encontrado una mina.");
        revelarTablero(tablero); // Revela todo el tablero al perder
        return;
    }
    if (tablero[fila][columna] === 0) { // Encargado de revelar las celdas adyacentes si la celda es 0
        // Revela las celdas adyacentes si la celda es 0
        for (let x = -1; x <= 1; x++) { // Recorre las filas adyacentes
            for (let y = -1; y <= 1; y++) { // Recorre las columnas adyacentes
                let nuevaFila = fila + x; // Calcula la nueva fila
                let  nuevaColumna = columna + y; // Calcula la nueva columna
                if (nuevaFila >= 0 && nuevaFila < filas && nuevaColumna >= 0 && nuevaColumna < columnas && !tableroRevelado[nuevaFila][nuevaColumna]) { // Verifica los límites y si la celda no está revelada
                    actualizarTablero(nuevaFila, nuevaColumna); // Llama recursivamente para revelar la celda adyacente, hasta que no haya más celdas 0 adyacentes
                }
            }
        }
    }
    if(tableroRevelado.flat().filter(celda => celda).length === filas * columnas - numMinas) {
        alert("¡Felicidades! ¡Has ganado!");
        revelarTablero(tablero);
        return;
    }
    mostrarTablero();
}

function mostrarTablero() { 
    let tableroSalida = "<table border='1' cellpadding='5' cellspacing='0'>";

    for (let i = 0; i < filas; i++) {
        tableroSalida += "<tr>";
        for (let j = 0; j < columnas; j++) {
            if (tableroRevelado[i][j]) {
                tableroSalida += `<td>${tablero[i][j]}</td>`; // Muestra el valor si está revelado
            } else {
                tableroSalida += `<td><button onclick="actualizarTablero(${i}, ${j})">?</button></td>`; // Botón para revelar la celda que se selecciona
            }
        }
        tableroSalida += "</tr>";
    }

    tableroSalida += "</table>";
    document.getElementById("tableroBuscaMinas").innerHTML = tableroSalida;
}

function revelarTablero(tablero) { // Función para revelar todo el tablero, ya sea al ganar o perder
    let salida = ""; // Variable local para la salida
    salida += "<table border='1' cellpadding='5' cellspacing='0'>";
    for (let i = 0; i < tablero.length; i++) {
        salida += "<tr>";
        for (let j = 0; j < tablero[i].length; j++) {
            salida += "<td>" + tablero[i][j] + "</td>";
        }
        salida += "</tr>";
    }
    salida += "</table>";
    document.getElementById("tableroBuscaMinas").innerHTML = salida;
}

// Genera y muestra el tablero inicial
generarTablero(filas, columnas, numMinas);
mostrarTablero();
