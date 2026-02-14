/**
 * Manejador del evento de carga del DOM.
 * Configura los eventos iniciales para los botones de dificultad.
 */
document.addEventListener('DOMContentLoaded', () => {
    let seleccionDificultad = document.getElementsByClassName('dificultadJuego');
    
    Array.from(seleccionDificultad).forEach(boton => {
        boton.addEventListener('click', (e) => {
            let contenedorDificultad = document.getElementById('selectorDificultad');
            contenedorDificultad.classList.add('ocultar');
            
            // Inicialización de estados en el DOM mediante dataset
            document.body.dataset.juegoActivo = "true";
            document.body.dataset.intentos = "0";
            document.body.dataset.primeraPiezaId = ""; 
            
            empezarJuego(e.target.value);
        });
    });
});
// Evento para capturar las teclas ALT + F12
document.addEventListener('keydown',(tecla)=>{
    if(tecla.key === "F12" && tecla.altKey){
        solucionarJuego();
    }
})

/**
 * Configura los parámetros iniciales del juego según la dificultad seleccionada.
 * @param {string} dificultad - Nivel de dificultad ('facil', 'normal', 'dificil').
 */
function empezarJuego(dificultad) {
    let numImagenes;
    let tiempo;
    let intentos;

    if (dificultad === 'normal') {
        numImagenes = 5;
        tiempo = 60;
        intentos = 50;
    } else if (dificultad === 'dificil') {
        numImagenes = 6;
        tiempo = 45;
        intentos = 40;
    } else {
        numImagenes = 4;
        tiempo = 90;
        intentos = 60;
    }

    gestionarInterfaz(tiempo,intentos);
    crearTableroRandom(numImagenes);
}

/**
 * Crea y actualiza los elementos visuales de información (tiempo e intentos).
 * @param {number} segundos - Tiempo inicial para la cuenta atrás.
 */
function gestionarInterfaz(segundos,intentos) {
    let infoJuego = document.getElementById('infoJuego');
    if (!infoJuego) { // Si no existe entonces lo crea
        infoJuego = document.createElement('div');
        infoJuego.id = 'infoJuego';
        document.body.insertBefore(infoJuego, document.getElementById('tableroPuzle'));
    }
    infoJuego.innerHTML = `<p id="timer">Tiempo: ${segundos}s</p><p id="contador">Intentos: 0</p> <p id="restantes">Intenos Maximos: ${intentos} </p>`;

    let intervalo = setInterval(() => {
        if (document.body.dataset.juegoActivo === "false") { // Si el juego no esta activado entonces limpiamos el intervalo
            clearInterval(intervalo);
            return;
        }

        segundos--;
        document.getElementById('timer').innerText = "Tiempo: " + segundos + "s";

        if (segundos <= 0 || document.body.dataset.intentos > intentos) {
            clearInterval(intervalo);
            finalizarJuego(false);
        }
    }, 1000);
}

/**
 * Genera el tablero de juego, las piezas y asigna sus eventos correspondientes.
 * @param {number} numImagenes - Número de piezas por lado (grid nxn).
 */
function crearTableroRandom(numImagenes) {
    let tablero = document.getElementById('tableroPuzle');
    tablero.classList.remove('ocultar'); // Mostramos el tablero por si estaba oculto
    tablero.innerHTML = ''; // Limpiamos el tablero de partidas anteriores
    tablero.style.gap = "5px"; // Ponemos un espacio de 5px entre las piezas

    let tamañoPieza = 150; // Cada pieza mide 150x150 píxeles, tambien esta definido en el css
    let tamañoTotal = tamañoPieza * numImagenes; // Tamaño total de la imagen según la dificultad
    tablero.style.gridTemplateColumns = `repeat(${numImagenes}, ${tamañoPieza}px)`; // Creamos las columnas del puzle

    let totalCeldas = numImagenes * numImagenes; // Calculamos el total de piezas
    let indices = [...Array(totalCeldas).keys()]; // Creamos una lista de números del 0 al total
    indices.sort(() => Math.random() - 0.5); // Desordenamos los números para que el puzle sea aleatorio
    let intentos = parseInt(document.getElementById('restantes').innerText);

    indices.forEach((valorReal) => {
        let caja = document.createElement('div'); // Creamos el elemento para la pieza
        caja.id = 'num' + (valorReal + 1); // Le asignamos su ID original para saber dónde debe ir
        caja.style.backgroundImage = "url('imagen.png')"; // Le ponemos la imagen de fondo
        caja.style.backgroundSize = `${tamañoTotal}px ${tamañoTotal}px`; // Ajustamos el tamaño de la imagen total
        caja.draggable = true; // Permitimos que la pieza se pueda arrastrar

        // Calculamos qué trozo de la imagen le toca mostrar a esta pieza
        let filaOriginal = Math.floor(valorReal / numImagenes);
        let colOriginal = valorReal % numImagenes;
        caja.style.backgroundPosition = `-${colOriginal * tamañoPieza}px -${filaOriginal * tamañoPieza}px`;

        // Evento para seleccionar la pieza al hacer clic
        caja.addEventListener('click', () => { 
            if(document.body.dataset.juegoActivo === "true") gestionarSeleccion(caja, numImagenes); 
        });

        // Evento cuando empezamos a arrastrar la pieza
        caja.addEventListener('dragstart', (e) => {
            if(document.body.dataset.juegoActivo === "true" && caja.dataset.colocada !== "true") {
                window.piezaArrastrada = caja; // Guardamos la pieza que estamos moviendo
                setTimeout(() => caja.style.opacity = "0", 0); // La hacemos invisible en su sitio original
            } else { e.preventDefault(); } // Si está colocada o el juego acabó, no dejamos moverla
        });

        caja.addEventListener('dragend', () => caja.style.opacity = "1"); // Al soltarla, recupera su opacidad

        caja.addEventListener('dragover', (e) => {
            e.preventDefault(); // Permitimos que se pueda soltar otra pieza encima
            if(caja.dataset.colocada !== "true") caja.style.border = "4px dashed gray"; // Feedback visual al pasar por encima
        });

        caja.addEventListener('dragleave', () => actualizarBordes(numImagenes)); // Al salir de encima, quitamos el borde gris

        caja.addEventListener('drop', (e) => {
            // Si soltamos una pieza sobre otra, hacemos el intercambio
            if(document.body.dataset.juegoActivo === "true") {
                gestionarIntercambio(window.piezaArrastrada, caja, numImagenes);
                intentos--;
            }
        });

        tablero.appendChild(caja); // Metemos la pieza en el tablero
    });
    actualizarBordes(numImagenes); // Pintamos los bordes (verde, naranja o gris) al terminar de crear todo
}

/**
 * Evalúa la posición de cada pieza y aplica los estilos visuales (verde, naranja, gris).
 * @param {number} numImagenes - Número de piezas por lado.
 */
function actualizarBordes(numImagenes) {
    let piezas = document.querySelectorAll('#tableroPuzle div'); // Pillamos todas las piezas del tablero
    let todasCorrectas = true; // Variable para saber si el usuario ya ha ganado

    piezas.forEach((pieza, index) => {
        // Sacamos el número del ID de la pieza (ej: de "num5" sacamos el 4) para saber su posición ideal
        let idValor = parseInt(pieza.id.replace('num', '')) - 1;
        
        // Calculamos en qué fila y columna está la pieza ahora mismo según su orden en el HTML
        let filaActual = Math.floor(index / numImagenes);
        let colActual = index % numImagenes;
        
        // Calculamos en qué fila y columna debería estar según su ID
        let filaDestino = Math.floor(idValor / numImagenes);
        let colDestino = idValor % numImagenes;

        if (filaActual === filaDestino && colActual === colDestino) { 
            // Si la posición actual y la del ID coinciden, la ponemos en verde y la bloqueamos
            pieza.style.border = "4px solid green";
            pieza.draggable = false;
            pieza.dataset.colocada = "true";
        } else { 
            // Si no coincide, marcamos que todavía no ha terminado el puzle
            todasCorrectas = false;
            pieza.dataset.colocada = "false";
            pieza.draggable = true;
            
            // Si está en la fila o columna correcta pero no en el sitio exacto, borde naranja
            if (filaActual === filaDestino || colActual === colDestino) { 
                pieza.style.border = "4px solid orange";
            } else {
                // Si está totalmente fuera de su sitio, borde gris
                pieza.style.border = "4px solid gray";
            }
        }
    });

    // Si después de revisar todas, ninguna estaba mal y el juego sigue vivo, ganamos
    if (todasCorrectas && document.body.dataset.juegoActivo === "true") {
        finalizarJuego(true);
    }
}

/**
 * Realiza el intercambio de IDs y posiciones de fondo entre dos piezas.
 * @param {HTMLElement} pieza1 - Primera pieza (arrastrada o seleccionada).
 * @param {HTMLElement} pieza2 - Segunda pieza (destino).
 * @param {number} numImagenes - Número de piezas por lado.
 */
function gestionarIntercambio(pieza1, pieza2, numImagenes) {
    // Si falta una pieza, son la misma o la de destino ya está fija, refrescamos bordes y salimos
    if (!pieza1 || !pieza2 || pieza1 === pieza2 || pieza2.dataset.colocada === "true") { 
        actualizarBordes(numImagenes);
        return;
    }

    // Sumamos uno al contador de intentos guardado en el dataset del body y lo mostramos
    let intentos = parseInt(document.body.dataset.intentos) + 1;
    document.body.dataset.intentos = intentos;
    document.getElementById('contador').innerText = "Intentos: " + intentos;

    // Guardamos la imagen y el id de la pieza 1 en variables temporales para no perderlos
    let backgroundTemporal = pieza1.style.backgroundPosition;
    let idTemporal = pieza1.id;

    // Le pasamos los datos de la pieza 2 a la pieza 1
    pieza1.style.backgroundPosition = pieza2.style.backgroundPosition;
    pieza1.id = pieza2.id;

    // Le pasamos los datos temporales (los de la pieza 1) a la pieza 2 para completar el cambio
    pieza2.style.backgroundPosition = backgroundTemporal;
    pieza2.id = idTemporal;

    // Actualizamos los colores de los bordes para ver si ahora están en su sitio
    actualizarBordes(numImagenes);
}

/**
 * Finaliza la sesión de juego, bloquea interacciones y muestra el resultado.
 * @param {boolean} victoria - Indica si el juego terminó por completar el puzle.
 */
function finalizarJuego(victoria) {
    document.body.dataset.juegoActivo = "false";
    let tablero = document.getElementById('tableroPuzle');
    
    if (victoria = "solucion") {
        tablero.style.gap = "0px"; // Le quitamos el espaciado
        Array.from(tablero.children).forEach(p => p.style.border = "none"); // Le quitamos los bordes
        alert("Juego Solucionado");
        
    } else if(victoria) {
        tablero.style.gap = "0px"; // Le quitamos el espaciado
        Array.from(tablero.children).forEach(p => p.style.border = "none"); // Le quitamos los bordes
        alert("¡Felicidades! Has ganado.");
    }else{
        alert("¡Tiempo o Intentos agotados!");
    }
    
    mostrarBotonReiniciar();
}

/**
 * Crea y muestra el botón para reiniciar la partida recargando la página.
 */
function mostrarBotonReiniciar() {
    if (!document.getElementById('btnReiniciar')) {
        let btn = document.createElement('button');
        btn.id = 'btnReiniciar';
        btn.innerText = "Jugar de nuevo";
        btn.style.marginTop = "20px";
        btn.addEventListener('click', () => location.reload()); // Recarga la pagina para volver a hacer el juego
        document.body.appendChild(btn);
    }
}

/**
 * Controla la lógica de selección de piezas mediante clics.
 * @param {HTMLElement} caja - Elemento sobre el que se hizo clic.
 * @param {number} numImagenes - Número de piezas por lado.
 */
function gestionarSeleccion(caja, numImagenes) { 
    // Si la pieza ya tiene el dataset colocada en true, no hacemos nada y salimos
    if (caja.dataset.colocada === "true") return; 

    // Si el dataset del body está vacío, es la primera pieza que tocamos
    if (document.body.dataset.primeraPiezaId === "") { 
        document.body.dataset.primeraPiezaId = caja.id; // Guardamos su id en el dataset del body
        window.primeraPiezaRef = caja; // Guardamos la caja entera en una variable global
    } else {
        // Si ya había una, hacemos el intercambio entre la primera y esta
        gestionarIntercambio(window.primeraPiezaRef, caja, numImagenes);
        document.body.dataset.primeraPiezaId = ""; // Limpiamos el dataset para la próxima jugada
    }
}

/**
 * Cuando el usuario quiera solucionar el juego, esta funcion ordena las casillas y las presenta en la caja
 * @param {HTMLElement} casillas - Casillas sobre las que interactua el jugador
 * @param {Array} ordenadas - Casillas ordenadas segun el id que tienen, se presentan en pantalla
 */
function solucionarJuego() {
    let casillas = document.getElementById('tableroPuzle').children;
    casillas = Array.from(casillas);

    // Extraemos y ordenamos por el número del id (num1, num2, etc.)
    let ordenadas = casillas.sort((a, b) => {
        let idA = parseInt(a.id.replace('num', ''));
        let idB = parseInt(b.id.replace('num', ''));
        return idA - idB; // Orden ascendente
    });

    // Reordenamos el dom
    let tablero = document.getElementById('tableroPuzle');
    ordenadas.forEach(casilla => tablero.appendChild(casilla)); // Reinserta en orden

    finalizarJuego("solucion");
}   