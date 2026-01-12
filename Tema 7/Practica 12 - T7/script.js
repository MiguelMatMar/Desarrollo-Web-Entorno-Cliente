let img = document.getElementById('imagen');
let textoCoordenadas = document.getElementById('coordenadas');

document.addEventListener('mousemove', (x) => {
    img.style.left= x.pageX + "px";
    img.style.top = x.pageY + "px";
    textoCoordenadas.innerText = `X: ${x.pageX}  Y: ${x.pageY}`;
})