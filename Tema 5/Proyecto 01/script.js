let filas = 5;
let columnas = 5;
let numMinas = 5;
let tablero = generarTablero(filas, columnas, numMinas);
mostrarTablero();



function generarTablero(filas, columnas, numMinas) {
    const tablero = [];
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



function mostrarTablero() {
    let tableroSalida = "<table border='1' cellpadding='5' cellspacing='0'>";

    for (let i = 0; i < tablero.length; i++) {
        tableroSalida += "<tr>";
        for (let j = 0; j < tablero[i].length; j++) { 
            tableroSalida += `<td><button onclick="actualizarTablero(${i}, ${j})">?</button></td>`; // Botón para revelar la celda que se selecciona
        }
        tableroSalida += "</tr>";
    }

    tableroSalida += "</table>";
    document.getElementById("tableroBuscaMinas").innerHTML = tableroSalida;
}

function actualizarTablero(fila, columna) {
    let tableroActualizado = "<table border='1' cellpadding='5' cellspacing='0'>";

    for (let i = 0; i < tablero.length; i++) {
        tableroActualizado += "<tr>";
        for (let j = 0; j < tablero[i].length; j++) {
            if (i === fila && j === columna) {
                tableroActualizado += "<td>" + tablero[i][j] + "</td>";
            } else {
                tableroActualizado += `<td><button onclick="actualizarTablero(${i}, ${j})">?</button></td>`; // Mantiene los botones en las celdas no seleccionadas
            }
        }
        tableroActualizado += "</tr>";
    }

    tableroActualizado += "</table>";
    document.getElementById("tableroBuscaMinas").innerHTML = tableroActualizado;
}
function revelarTablero(tablero) { // Función para revelar todo el tablero, ya sea al ganar o perder
    let tableroRevelado = "";
    tableroRevelado += "<table border='1' cellpadding='5' cellspacing='0'>";
    for (let i = 0; i < tablero.length; i++) {
        tableroRevelado += "<tr>";
        for (let j = 0; j < tablero[i].length; j++) {
            tableroRevelado += "<td>" + tablero[i][j] + "</td>";
        }
        tableroRevelado += "</tr>";
    }
    tableroRevelado += "</table>";
    document.getElementById("tableroBuscaMinas").innerHTML = tableroRevelado;
}



