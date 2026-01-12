function iniciarAplicacion() {

    document.getElementById("aceptar").addEventListener("click", aceptarCookies);
    document.getElementById("rechazar").addEventListener("click", rechazarCookies);
    document.getElementById("cerrar").addEventListener("click", cerrarSesion);

    if (existeCookie("sesion") === false) {
        preguntarCookies();
    } else {
        gestionarVisitas();
    }
}

function preguntarCookies() {

    let respuesta = confirm(
        "Esta pagina usa una cookie para almacenar el numero de visitas que hace cada usuario. Si esta conforme con ello, pulse Aceptar. En caso contrario, no se mostraran las visitas."
    );

    if (respuesta === true) {
        aceptarCookies();
    } else {
        rechazarCookies();
    }
}

function aceptarCookies() {
    crearCookieSesion("sesion", "true");
    gestionarVisitas();
}

function rechazarCookies() {

    borrarCookie("visitas");
    borrarCookie("sesion");

    document.getElementById("mensaje").textContent =
        "No se han aceptado las cookies.";
    document.getElementById("visitas").textContent = "";
}

function gestionarVisitas() {

    let visitas = obtenerCookie("visitas");

    if (visitas === null) {
        visitas = 1;
    } else {
        visitas = parseInt(visitas) + 1;
    }

    crearCookie("visitas", visitas, 60 * 60 * 24 * 365);

    document.getElementById("mensaje").textContent =
        "Cookies aceptadas.";
    document.getElementById("visitas").textContent =
        "Numero de visitas: " + visitas;
}

function cerrarSesion() {

    borrarCookie("sesion");

    document.getElementById("mensaje").textContent =
        "Sesion cerrada. Recarga la pagina.";
    document.getElementById("visitas").textContent = "";
}

function crearCookie(nombre, valor, segundos) {
    document.cookie =
        nombre + "=" + valor + "; max-age=" + segundos + "; path=/";
}

function crearCookieSesion(nombre, valor) {
    document.cookie = nombre + "=" + valor + "; path=/";
}

function obtenerCookie(nombre) {

    let cookies = document.cookie.split("; ");

    for (let i = 0; i < cookies.length; i++) {
        let partes = cookies[i].split("=");
        if (partes[0] === nombre) {
            return partes[1];
        }
    }
    return null;
}

function borrarCookie(nombre) {
    document.cookie = nombre + "=; max-age=0; path=/";
}

function existeCookie(nombre) {
    return obtenerCookie(nombre) !== null;
}
