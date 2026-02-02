/**
 * Añadir el input file al cargar el DOM
 */
document.addEventListener('DOMContentLoaded',() => {
    // Creamos el file para seleccionar documentos
    let fileSeleccionDocumentos = document.createElement('input');
    fileSeleccionDocumentos.type = 'file';
    fileSeleccionDocumentos.id = 'fileSeleccionDocumentos';
    fileSeleccionDocumentos.multiple = true;
    document.body.appendChild(fileSeleccionDocumentos);

    // Añadimos el evento para cuando se vaya a cargar el archivo
    document.getElementById('fileSeleccionDocumentos').addEventListener('change', leerArchivo);
});

/**
 * Comprobar los archivos seleccionados y leemos su contenido
 * @param {Event} evento - El evento de cambio del input
 */
function leerArchivo(evento){

    let archivos = evento.target.files;
    let permitidos = ['.txt','.lst','.csv'];

    archivos = Array.from(archivos); // Convertimos a array para poder usar forEach
    archivos.forEach(archivo => { // Analizamos la extension de cada archivo, por si no esta permitido
        let extension = archivo.name.split('.').pop();
        if(!permitidos.includes('.' + extension)){
            return; // Si no esta permitido, salimos
        }

        // Leemos el contenido de los archivos permitidos
        let lector = new FileReader();
        lector.onload = (eventoCarga) => {
            let saltoFila = document.createElement('br');
            document.body.appendChild(saltoFila);
            // Para que pueda filtrar por comas, puntos y comas, espacios e intros y quite los doble espacios
            let contenido = eventoCarga.target.result.split(/[\s,;]+/).filter(p => p.trim() !== ""); 

            // Creamos el input de las letras por palabra y lo cargamos al dom
            let textoLetras = document.createElement('p');
            textoLetras.innerText = "¿Letras por palabra?:";
            document.body.appendChild(textoLetras);
            let formularioLetrasPalabra = document.createElement('input');
            formularioLetrasPalabra.type = 'number';
            formularioLetrasPalabra.id = 'formularioLetrasPalabra' + archivo.name; // Creamos el id unico para cada archivo
            document.body.appendChild(formularioLetrasPalabra);

            // Creamos el input de las columnas por fila y lo cargamos al dom
            let textoFilas = document.createElement('p');
            textoFilas.innerText = "¿Columnas por fila?:";
            document.body.appendChild(textoFilas);
            let letrasPorFila = document.createElement('input');
            letrasPorFila.type = 'number';
            letrasPorFila.id = 'letrasPorFila' + archivo.name;
            document.body.appendChild(letrasPorFila);

            // Creamos el boton para crear la tabla para generar las palabras
            let botonGenerarTabla = document.createElement('button');
            botonGenerarTabla.textContent = 'Genera palabras';
            botonGenerarTabla.id = 'botonGenerarTabla' + archivo.name;
            document.body.appendChild(botonGenerarTabla);

            // Obtenemos los 2 inputs generados anteriormente para añadirle el evento al boton
            botonGenerarTabla.addEventListener('click', () => {
                // Validación de números positivos y no vacíos
                let valLetras = parseInt(formularioLetrasPalabra.value);
                let valColumnas = parseInt(letrasPorFila.value);

                if (isNaN(valLetras) || valLetras <= 0 || isNaN(valColumnas) || valColumnas <= 0) {
                    alert("Por favor, introduce números válidos y mayores a 0");
                    return;
                }

                cargarDocumentoDOM(contenido, valColumnas, valLetras);
                botonGenerarTabla.disabled = true;
            });

            // Hacemos lo mismo con el otro boton
            let bottonGenerarCSV = document.createElement('button');
            bottonGenerarCSV.textContent = 'Generar CSV';
            bottonGenerarCSV.id = 'bottonGenerarCSV' + archivo.name;
            document.body.appendChild(bottonGenerarCSV);
            bottonGenerarCSV.addEventListener('click', () => {
                let valLetras = parseInt(formularioLetrasPalabra.value);
                let valColumnas = parseInt(letrasPorFila.value); // Obtenemos las columnas también para el CSV
                if (isNaN(valLetras) || valLetras <= 0 || isNaN(valColumnas) || valColumnas <= 0) {
                    alert("Por favor, rellena ambos campos con valores válidos");
                    return;
                };
                generarCsv(contenido, valLetras, valColumnas);
                bottonGenerarCSV.disabled = true;
            });
            document.body.appendChild(saltoFila);
        };
        lector.readAsText(archivo);
    });
};

/**
 * Simplemente creamos la tabla
 * @param {Array} array - Contenido a procesar
 * @param {number} columnasPorFila - Columnas deseadas
 * @param {number} letraPorPalabra - Longitud de las palabras
 */
function cargarDocumentoDOM(array, columnasPorFila, letraPorPalabra) {
    let nodoTabla = document.createElement('table');
    let contenidoTabla = "<tr>";
    let contadorFilas = 0;
    let cantidadFilas = parseInt(columnasPorFila);

    // Filtramos el array para que solo contenga palabras con la longitud del usuario
    let palabrasFiltradas = array.filter(palabra => palabra.trim().length === parseInt(letraPorPalabra));
    
    palabrasFiltradas.forEach(palabra => {
        contadorFilas++;
        if(contadorFilas === cantidadFilas){
            contenidoTabla += `<td>${palabra}</td></tr><tr>`;
            contadorFilas = 0;
        }else{
            contenidoTabla += `<td>${palabra}</td>`;
        }
    })
    
    contenidoTabla += "</tr>";
    nodoTabla.innerHTML = contenidoTabla;
    document.body.appendChild(nodoTabla);
}

/**
 * Generar el archivo CSV respetando la estructura de columnas
 * @param {Array} arrayContenido - Datos para el CSV
 * @param {number} letraPorPalabra - Longitud de las palabras
 * @param {number} columnasPorFila - Estructura de columnas
 */
function generarCsv( arrayContenido, letraPorPalabra, columnasPorFila){
    let palabrasFiltradas = arrayContenido.filter(palabra => palabra.trim().length === parseInt(letraPorPalabra));
    let filas = [];
    let cantidadColumnas = parseInt(columnasPorFila);

    // Separamos por las columnas que nos han dicho
    for (let i = 0; i < palabrasFiltradas.length; i += cantidadColumnas) {
        let unaFila = palabrasFiltradas.slice(i, i + cantidadColumnas);
        filas.push(unaFila.join(";")); 
    }
    
    // Unimos todas las filas con un salto de línea
    let contenidoCsv = filas.join("\r\n");

    // Creamos el link para descargar de forma automatica el documento
    let blob = new Blob([contenidoCsv], { type: 'text/csv;charset=utf-8;' });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "palabras_" + letraPorPalabra + ".csv";
    link.click();
    document.body.removeChild(link);
}