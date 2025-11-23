let filas = 5;      
let columnas = 5;
let numMinas = 5;

let tablero = []; // Tablero principal
let tableroRevelado = [];  // Nuevo tablero para revelar todas las celdas

// Inicializa el tablero y el tableroRevelado, son 2 tableros diferentes, uno para el juego (con las minas etc) y otro para mostrar las celdas reveladas al usuario 
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

function actualizarTablero(fila, columna) { // Función para actualizar el tablero al revelar una celda
    tableroRevelado[fila][columna] = true; // Marca la celda como revelada
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
