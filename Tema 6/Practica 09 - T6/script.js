function otraFila() {
    let texto = document.getElementById("texto").value.trim();

    if (texto === "") {
        alert("El campo no puede estar vacío.");
        return;
    }

    let tabla = document.getElementById("bodyTabla");

    // Crear fila y celdas
    let tr = document.createElement("tr");

    let tdTexto = document.createElement("td");
    let tdMayus = document.createElement("td");
    let tdChachi = document.createElement("td");

    tdTexto.textContent = texto;
    tdTexto.classList.add("contenido");

    // Para poner los botones de las mayusculas en las celdas
    let btnMayus = document.createElement("button");
    btnMayus.textContent = "Mayúsculas";
    btnMayus.setAttribute("onclick", "alternarMayusculas(this)");

    // Para poner los botones del cambio de estilo en las celdas
    let btnChachi = document.createElement("button");
    btnChachi.textContent = "Formato chachi";
    btnChachi.setAttribute("onclick", "alternarChachi(this)");

    // Ponemos los 2 botones en los filas
    tdMayus.appendChild(btnMayus);
    tdChachi.appendChild(btnChachi);

    // Añadimos las cosas a las celdas
    tr.appendChild(tdTexto);
    tr.appendChild(tdMayus);
    tr.appendChild(tdChachi);

    // Insertamos la fila en la tabla
    tabla.appendChild(tr);

    // Quitamos el texo escrito y lo ponemos vacio
    document.getElementById("texto").value = "";
}

function alternarMayusculas(boton) {
    let celda = boton.parentNode.parentNode.children[0];
    let textomayus = celda.textContent.toUpperCase();
    if(textomayus === celda.textContent){ // Si la celda esta en mayus se vuelve minus
        celda.textContent = celda.textContent.toLowerCase();
    }else{ // Si no se vuelve a mayus
        celda.textContent = textomayus;
    }
}

function alternarChachi(boton) {
    let celda = boton.parentNode.parentNode.children[0];
    celda.classList.toggle("chachi");
}
