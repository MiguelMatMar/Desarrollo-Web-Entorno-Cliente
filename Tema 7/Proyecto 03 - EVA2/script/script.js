let body = document.getElementsByTagName("body")[0];
let boton = document.createElement("button");
boton.innerText = "Genera fichero HTML";

boton.addEventListener("click", function() {
    // Obtenemos el documento HTML completo en texto
    let contenidoHtml = document.documentElement.outerHTML;
    // Mostramos debugger 
    console.log(contenidoHtml);

    // Creamos un Blob con el contenido HTML
    let blob = new Blob([contenidoHtml], { type: "text/html" });
    // Creamos un enlace de descarga
    let url = URL.createObjectURL(blob);
    let enlace = document.createElement("a");

    // Asignamos las propiedades para la descarga
    enlace.href = url;
    enlace.download = "miPágina.html";

    // Forzamos el click para descargar el archivo
    enlace.click();
    // Librerar el objeto URL después de la descarga
    URL.revokeObjectURL(url);
});
body.appendChild(boton);