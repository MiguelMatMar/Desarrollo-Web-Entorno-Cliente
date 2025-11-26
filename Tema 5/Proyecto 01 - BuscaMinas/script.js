// Variables globales del juego, para que sean accesibles desde todas las funciones, porque sino no funcionaria
let filas;      
let columnas;
let numMinas;

let tablero = []; // Tablero principal
let tableroRevelado = [];  // Nuevo tablero para revelar todas las celdas

// Esta función genera el tablero del juego con las minas y los números correspondientes
function generarTablero(filas, columnas, numMinas) {
    tablero = []; // Reinicia el tablero cada vez que se genera uno nuevo, por si acaso
    // i es filas, j es columnas
    for (let i = 0; i < filas; i++) {
        tablero[i] = [];
        for (let j = 0; j < columnas; j++) {
            tablero[i][j] = 0; // Inicializa todas las celdas a 0
        }
    }
    let minasColocadas = 0;
    while (minasColocadas < numMinas) {
        let fila = Math.floor(Math.random() * filas);
        let columna = Math.floor(Math.random() * columnas);
        if (tablero[fila][columna] !== '💣') { // Si no hay mina ya colocada
            tablero[fila][columna] = '💣'; // Coloca una mina
            minasColocadas++;
            // Actualiza los números alrededor de la mina, es decir, cada vez que se coloca una mina, se incrementa el contador de las celdas adyacentes
            for (let x = -1; x <= 1; x++) { // Recorre las filas adyacentes
                for (let y = -1; y <= 1; y++) { // Recorre las columnas adyacentes
                    let nuevaFila = fila + x; // Calcula la nueva fila
                    let nuevaColumna = columna + y; // Calcula la nueva columna
                     // Verifica los límites y si la celda no es una mina
                    if (nuevaFila >= 0 && nuevaFila < filas && nuevaColumna >= 0 && nuevaColumna < columnas && tablero[nuevaFila][nuevaColumna] !== '💣') {
                        tablero[nuevaFila][nuevaColumna]++; // Incrementa el contador de minas adyacentes
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
    if (tablero[fila][columna] === '💣') { // Si la celda es una mina
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
    if(tableroRevelado.flat().filter(celda => celda).length === filas * columnas - numMinas) { // Verifica si todas las celdas no minadas han sido reveladas
        alert("¡Felicidades! ¡Has ganado!");
        revelarTablero();
        return;
    }
    mostrarTablero();
}

// Función para mostrar el tablero en HTML, mostrando solo las celdas reveladas, y es el tablero que ve el usuario e interactúa con él
function mostrarTablero() { 
    let tableroSalida = "<table border='1' cellpadding='5' cellspacing='0'>";

    for (let i = 0; i < filas; i++) { 
        tableroSalida += "<tr>"; // Inicia una nueva fila
        let valor = 0;
        for (let j = 0; j < columnas; j++) { // Recorre cada columna
            if (tableroRevelado[i][j]) { // Si la celda está revelada
                valor = tablero[i][j]; // Obtiene el valor de la celda
                if (valor === "💣") { // Si es una mina pues muestra la mina
                    tableroSalida += `<td class="mina">💣</td>`;
                } 
                else { // Si es un número, muestra el número con una clase para el color
                    tableroSalida += `<td class="num${valor}">${valor}</td>`;
                }
            } else {
                tableroSalida += `<td><button onclick="actualizarTablero(${i}, ${j})">?</button></td>`; // Celda no revelada, muestra un botón
            }
        }
        tableroSalida += "</tr>"; // Cierra la fila
    }

    tableroSalida += "</table>";
    document.getElementById("tableroBuscaMinas").innerHTML = tableroSalida;
}

// Función para revelar todo el tablero, ya sea al ganar o perder
function revelarTablero() { 
    let salida = ""; // Variable local para la salida
    salida += "<table border='1' cellpadding='5' cellspacing='0'>";
    let valor = 0;
    for (let i = 0; i < tablero.length; i++) {
        salida += "<tr>";
        for (let j = 0; j < tablero[i].length; j++) {
            valor = tablero[i][j]; // Obtiene el valor de la celda, como en el tablero original
            if (valor === 0) { // Si el valor es 0, muestra una celda vacía
                salida += `<td class="vacio">0</td>`;
            } 
            else if (valor === "💣") { // Si es una mina pues muestra la mina
                salida += `<td class="mina">💣</td>`;
            } 
            else { // Si es un número, muestra el número con una clase para el color
                salida += `<td class="num${valor}">${valor}</td>`;
            }
        }
        salida += "</tr>";
    }
    salida += "</table>";
    document.getElementById("tableroBuscaMinas").innerHTML = salida;
}

// Cuando el jugador pulse el boton de iniciar o reiniciar, se genera el tablero y se muestra
function iniciarJuego() {
    tableroRevelado = []; // Reinicia el tablero revelado cada vez que se inicia un nuevo juego
    tablero = []; // Reinicia el tablero principal cada vez que se inicia un nuevo juego

    filas = parseInt(prompt("Ingrese el número de filas (mínimo 5):", "5"));
    columnas = parseInt(prompt("Ingrese el número de columnas (mínimo 5):", "10"));
    numMinas = parseInt(prompt("Ingrese el número de minas (mínimo 1):", "5"));

    if (isNaN(filas) || filas < 5) filas = 5;
    if (isNaN(columnas) || columnas < 5) columnas = 10;
    if (isNaN(numMinas) || numMinas < 1) numMinas = 5;


    // Inicializa el tableroRevelado (con la configuracion del tablero del usuario), son 2 tableros diferentes, uno para el juego (con las minas etc) y otro para mostrar las celdas reveladas al usuario, inicialmente todas las celdas son falsas (no reveladas)
    for (let i = 0; i < filas; i++) {
        tableroRevelado[i] = [];
        for (let j = 0; j < columnas; j++) {
            tableroRevelado[i][j] = false; // Inicializa todas las celdas como no reveladas
        }
    }

    generarTablero(filas, columnas, numMinas);
    mostrarTablero();
}