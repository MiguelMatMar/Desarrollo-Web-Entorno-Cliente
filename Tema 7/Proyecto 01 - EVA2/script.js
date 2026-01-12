// script.js
function iniciaListeners() {
    let inputFile = document.getElementById('myfile');
    inputFile.addEventListener('change', manejarArchivo);
}

function manejarArchivo(event) {
    let archivos = event.target.files; // Obtenemos los archivos seleccionados
    if (!archivos || archivos.length === 0) return;

    for (let i = 0; i < archivos.length; i++) {
        let archivo = archivos[i];
        let nombre = archivo.name.toLowerCase();
        let acceptados = ['.csv', '.txt', '.lst'];

        // Solo aceptar csv, txt y lst
        acceptados.forEach(extension => {
            if (nombre.endsWith(extension)) {
                let lector = new FileReader();
                
                lector.onload = function(e) {
                    let contenido = e.target.result;

                    // Crear un elemento para mostrar el contenido
                    let pre = document.createElement('pre');
                    pre.textContent = "Nombre: " + archivo.name + "\nContenido:\n" + contenido;
                    document.body.appendChild(pre);
                };
                
                lector.readAsText(archivo); // Leer el archivo como texto
            } else {
                console.log(`Archivo ${nombre} no es aceptado.`);
            }
        });
    }
}

// Iniciar listeners al cargar el script
document.addEventListener('DOMContentLoaded', iniciaListeners);
