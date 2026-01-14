let fondo = document.getElementById('cuerpoDocumento');

document.addEventListener('keydown', (e) => {
    if (e.key === "F12" && e.shiftKey) {
        fondo.style.backgroundImage = 'url("https://picsum.photos/800/600")';
        document.getElementsByTagName('h1')[0].style.display = "none";
    }
});
