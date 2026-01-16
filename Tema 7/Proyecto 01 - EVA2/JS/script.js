// Pagina de informacion https://developer.mozilla.org/en-US/docs/Web/API/FileReader


/**
 * Inicializa los listeners del input de archivos.
 * Se ejecuta al cargar la página para preparar el input file.
 */
function iniciaListeners() {
    let inputFile = document.getElementById('myfile');
    inputFile.addEventListener('change', manejarArchivo);
}


/**
 * Maneja los archivos seleccionados en el input file.
 */
function manejarArchivo(event) {
    let archivos = event.target.files; // Obtenemos los archivos seleccionados
    if (!archivos || archivos.length === 0) return;

    for (let i = 0; i < archivos.length; i++) {
        let archivo = archivos[i];
        let nombre = archivo.name.toLowerCase();
        let acceptados = ['.csv', '.txt', '.lst'];
        let extension = nombre.substring(nombre.lastIndexOf('.'));

        // Solo aceptar csv, txt y lst
       
            if(acceptados.includes(extension)) {
                let lector = new FileReader();
                
                lector.onload = function(e) { // Cuando cargue el archivo vamos a mostrar su contenido
                    let contenido = e.target.result;

                    // Crear un elemento para mostrar el contenido
                    let pre = document.createElement('pre');
                    pre.textContent = "Nombre: " + archivo.name + "\nContenido:\n" + contenido;
                    document.body.appendChild(pre);
                };
                
                lector.readAsText(archivo); // Leer el archivo como texto, metodo de FileReader
            } else {
                console.log(`Archivo ${nombre} no es aceptado.`);
            }
    }
}

// Iniciar listeners al cargar el script
document.addEventListener('DOMContentLoaded', iniciaListeners);
