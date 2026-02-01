// Añadir el input file al cargar el DOM
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

function leerArchivo(evento){

    // Comprobar los archivos seleccionados y leemos su contenido
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
            // Guardamos todo el contenido en un array separado por ,
            let contenido = eventoCarga.target.result.split(','); 

            // Creamos el input de las letras por palabra y lo cargamos al dom
            let textoLetras = document.createElement('p');
            textoLetras.innerText = "¿Letras por palabra?:";
            document.body.appendChild(textoLetras);
            let formularioLetrasPalabra = document.createElement('input');
            formularioLetrasPalabra.type = 'text';
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

            if (!letrasPorFila.value) { letrasPorFila.value = 5; } // Por si acaso
            // Obtenemos los 2 inputs generados anteriormente para añadirle el evento al boton
            botonGenerarTabla.addEventListener('click', () => {
                cargarDocumentoDOM(contenido, letrasPorFila.value, formularioLetrasPalabra.value);
            });

            // Hacemos lo mismo con el otro boton
            let bottonGenerarCSV = document.createElement('button');
            bottonGenerarCSV.textContent = 'Generar CSV';
            bottonGenerarCSV.id = 'bottonGenerarCSV' + archivo.name;
            document.body.appendChild(bottonGenerarCSV);
            bottonGenerarCSV.addEventListener('click', () => {
                generarCsv(archivo.name, [contenido]);
            });
            document.body.appendChild(saltoFila);
        };
        lector.readAsText(archivo);
    });
};

function cargarDocumentoDOM(array,columnasPorFila,letraPorPalabra) {
    // Simplemente creamos la tabla
    let nodoTabla = document.createElement('table');
    let contenidoTabla = "<tr>";
    let contadorFilas = 0;
    let cantidadFilas = parseInt(columnasPorFila);
    
    array.forEach(palabra => {
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

function generarCsv(nombreArchivo,arrayContenido){
    // Cambiamos las , por enters
    let contenidoCsv = arrayContenido.map(fila => fila.join(",")).join("\n");
    // Creamos el archivo con el contenido previo
    let blob = new Blob([contenidoCsv], { type: 'text/csv;charset=utf-8;' });

    // Creamos el link para descargar de forma automatica el documento
    let link = document.createElement("a");
    let url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", nombreArchivo.endsWith(".csv") ? nombreArchivo : nombreArchivo + ".csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}