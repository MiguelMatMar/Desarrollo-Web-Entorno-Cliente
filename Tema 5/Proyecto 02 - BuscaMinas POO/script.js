class Buscaminas {

    // Variables globales del juego, para que sean accesibles desde todas las funciones, porque sino no funcionaria
    constructor() {
        this.filas;      
        this.columnas;
        this.numMinas;

        this.tablero = []; // Tablero principal
        this.tableroRevelado = [];  // Nuevo tablero para revelar todas las celdas
    }

    // Esta función genera el tablero del juego con las minas y los números correspondientes
    generarTablero(filas, columnas, numMinas) {
        this.tablero = []; // Reinicia el tablero cada vez que se genera uno nuevo, por si acaso
        // i es filas, j es columnas
        for (let i = 0; i < filas; i++) {
            this.tablero[i] = [];
            for (let j = 0; j < columnas; j++) {
                this.tablero[i][j] = 0; // Inicializa todas las celdas a 0
            }
        }
        let minasColocadas = 0;
        while (minasColocadas < numMinas) {
            let fila = Math.floor(Math.random() * filas);
            let columna = Math.floor(Math.random() * columnas);
            if (this.tablero[fila][columna] !== '💣') { // Si no hay mina ya colocada
                this.tablero[fila][columna] = '💣'; // Coloca una mina
                minasColocadas++;
                // Actualiza los números alrededor de la mina, es decir, cada vez que se coloca una mina, se incrementa el contador de las celdas adyacentes
                for (let x = -1; x <= 1; x++) { // Recorre las filas adyacentes
                    for (let y = -1; y <= 1; y++) { // Recorre las columnas adyacentes
                        let nuevaFila = fila + x; // Calcula la nueva fila
                        let nuevaColumna = columna + y; // Calcula la nueva columna
                        // Verifica los límites y si la celda no es una mina
                        if (nuevaFila >= 0 && nuevaFila < filas && nuevaColumna >= 0 && nuevaColumna < columnas && this.tablero[nuevaFila][nuevaColumna] !== '💣') {
                            this.tablero[nuevaFila][nuevaColumna]++; // Incrementa el contador de minas adyacentes
                        }
                    }
                }
            }
        }
        return this.tablero;
    }

    // Esta función se llama cuando el usuario hace clic en una celda para revelarla, es la función principal del juego
    actualizarTablero(fila, columna) { 
        this.tableroRevelado[fila][columna] = true; // Marca la celda como revelada
        if (this.tablero[fila][columna] === '💣') { // Si la celda es una mina
            alert("¡Has perdido! Has encontrado una mina.");
            this.revelarTablero(this.tablero); // Revela todo el tablero al perder
            return;
        }
        if (this.tablero[fila][columna] === 0) { // Encargado de revelar las celdas adyacentes si la celda es 0
            // Revela las celdas adyacentes si la celda es 0
            for (let x = -1; x <= 1; x++) { // Recorre las filas adyacentes
                for (let y = -1; y <= 1; y++) { // Recorre las columnas adyacentes
                    let nuevaFila = fila + x; // Calcula la nueva fila
                    let  nuevaColumna = columna + y; // Calcula la nueva columna
                    if (nuevaFila >= 0 && nuevaFila < this.filas && nuevaColumna >= 0 && nuevaColumna < this.columnas && !this.tableroRevelado[nuevaFila][nuevaColumna]) { // Verifica los límites y si la celda no está revelada
                        this.actualizarTablero(nuevaFila, nuevaColumna); // Llama recursivamente para revelar la celda adyacente, hasta que no haya más celdas 0 adyacentes
                    }
                }
            }
        }
        if(this.tableroRevelado.flat().filter(celda => celda).length === this.filas * this.columnas - this.numMinas) { // Verifica si todas las celdas no minadas han sido reveladas
            alert("¡Felicidades! ¡Has ganado!");
            this.revelarTablero();
            return;
        }
        this.mostrarTablero();
    }

    // Función para mostrar el tablero en HTML, mostrando solo las celdas reveladas, y es el tablero que ve el usuario e interactúa con él
    mostrarTablero() { 
        let tableroSalida = "<table border='1' cellpadding='5' cellspacing='0'>";

        for (let i = 0; i < this.filas; i++) { 
            tableroSalida += "<tr>"; // Inicia una nueva fila
            let valor = 0;
            for (let j = 0; j < this.columnas; j++) { // Recorre cada columna
                if (this.tableroRevelado[i][j]) { // Si la celda está revelada
                    valor = this.tablero[i][j]; // Obtiene el valor de la celda
                    if (valor === "💣") { // Si es una mina pues muestra la mina
                        tableroSalida += `<td class="mina">💣</td>`;
                    } 
                    else { // Si es un número, muestra el número con una clase para el color
                        tableroSalida += `<td class="num${valor}">${valor}</td>`;
                    }
                } else {
                    tableroSalida += `<td><button onclick="juego.actualizarTablero(${i}, ${j})">?</button></td>`; // Celda no revelada, muestra un botón
                }
            }
            tableroSalida += "</tr>"; // Cierra la fila
        }

        tableroSalida += "</table>";
        document.getElementById("tableroBuscaMinas").innerHTML = tableroSalida;
    }

    // Función para revelar todo el tablero, ya sea al ganar o perder
    revelarTablero() { 
        let salida = ""; // Variable local para la salida
        salida += "<table border='1' cellpadding='5' cellspacing='0'>";
        let valor = 0;
        for (let i = 0; i < this.tablero.length; i++) {
            salida += "<tr>";
            for (let j = 0; j < this.tablero[i].length; j++) {
                valor = this.tablero[i][j]; // Obtiene el valor de la celda, como en el tablero original
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
    iniciarJuego() {
        this.tableroRevelado = []; // Reinicia el tablero revelado cada vez que se inicia un nuevo juego
        this.tablero = []; // Reinicia el tablero principal cada vez que se inicia un nuevo juego

        this.filas = parseInt(prompt("Ingrese el número de filas (mínimo 5):", "5"));
        this.columnas = parseInt(prompt("Ingrese el número de columnas (mínimo 5):", "10"));
        this.numMinas = parseInt(prompt("Ingrese el número de minas (mínimo 1):", "5"));

        if(this.numMinas >= this.filas * this.columnas) { // Regla para que el numero de minas no sea mayor o igual al numero de celdas
            alert("El número de minas debe ser menor que el número total de celdas (filas x columnas). Por favor, ingrese los valores nuevamente.");
            return; // Sale de la función sin iniciar el juego
        }

        if (isNaN(this.filas) || this.filas < 5) this.filas = 5;
        if (isNaN(this.columnas) || this.columnas < 5) this.columnas = 10;
        if (isNaN(this.numMinas) || this.numMinas < 1) this.numMinas = 5;

        // Si el numero de minas es mayor al numero de filas y columnas entonces que le salga un error al usuario

        // Inicializa el tableroRevelado (con la configuracion del tablero del usuario), son 2 tableros diferentes, uno para el juego (con las minas etc) y otro para mostrar las celdas reveladas al usuario, inicialmente todas las celdas son falsas (no reveladas)
        for (let i = 0; i < this.filas; i++) {
            this.tableroRevelado[i] = [];
            for (let j = 0; j < this.columnas; j++) {
                this.tableroRevelado[i][j] = false; // Inicializa todas las celdas como no reveladas
            }
        }

        this.generarTablero(this.filas, this.columnas, this.numMinas);
        this.mostrarTablero();
    }
}

// Instancia global para que el HTML pueda acceder al juego
const juego = new Buscaminas();
