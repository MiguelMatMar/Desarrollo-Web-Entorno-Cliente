function aceptarCookies(){
    crearCookieSesion("sesion", "true");
    document.getElementById("cerrarSesion").style.display = "block";
    document.getElementById("preguntaCookie").style.display = "none";
    contarVisita();
}

function rechazarCookies() {
    borrarCookie("visitas");
    borrarCookie("sesion");
    document.getElementById("preguntaCookie").style.display = "none";
    document.getElementById("textoInformativo").textContent = "No se han aceptado cookies.";
    document.getElementById("contadorVisitas").textContent = "";
}

function contarVisita() {
    let visitas = obtenerCookie("visitas");
    if (visitas === null) {
        visitas = 1;
    } else {
        visitas = parseInt(visitas) + 1;
    }
    crearCookie("visitas", visitas, 60*60*24*365);
    document.getElementById("textoInformativo").textContent = "Cookies aceptadas.";
    document.getElementById("contadorVisitas").textContent = "Número de visitas: " + visitas;
}

function crearCookie(nombre, valor, segundos) {
    document.cookie = nombre + "=" + valor + "; max-age=" + segundos + "; path=/";
}

function crearCookieSesion(nombre, valor) {
    document.cookie = nombre + "=" + valor + "; path=/";
}

function obtenerCookie(nombre) {
    let cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
        let partes = cookies[i].split("=");
        if (partes[0] === nombre) return partes[1];
    }
    return null;
}

function borrarCookie(nombre) {
    document.cookie = nombre + "=; max-age=0; path=/";
}

function existeCookie(nombre) {
    return obtenerCookie(nombre) !== null;
}

function cerrarSesion(){
    borrarCookie("sesion");
    borrarCookie("visitas");
    location.reload();
}

if (existeCookie("sesion")) {
    document.getElementById("cerrarSesion").style.display = "block";
    document.getElementById("preguntaCookie").style.display = "none";
    contarVisita();
}

document.getElementById("aceptar").addEventListener("click", aceptarCookies);
document.getElementById("rechazar").addEventListener("click", rechazarCookies);
document.getElementById("cerrarSesion").addEventListener("click", cerrarSesion);

export { 
    aceptarCookies, 
    rechazarCookies, 
    cerrarSesion };