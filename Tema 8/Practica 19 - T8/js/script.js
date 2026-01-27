let cancelarPromesa; 
let idTemporizador;

function temporizador(segundos) {
    let milisegundos = segundos * 1000;

    return new Promise((resolve, reject) => {
        cancelarPromesa = reject;
        
        idTemporizador = setTimeout(() => {
            resolve("Tiempo concluido");
        }, milisegundos);
    });
}

let display = document.getElementById('resultado');


document.getElementById('btnIniciar').addEventListener('click', () => {
    let tiempo = document.getElementById('segundos').value;
    display.textContent = "Esperando...";

    temporizador(tiempo)
        .then(mensaje => { // Si la promesa se resuelve correctamente
            display.textContent = mensaje;
        })
        .catch(error => { // Si la promesa es rechazada
            display.textContent = error;
        });
});


document.getElementById('btnAbortar').addEventListener('click', () => {
    if (cancelarPromesa) {
        clearTimeout(idTemporizador); // Detener el temporizador
        cancelarPromesa("Acción interrumpida por el usuario"); // Rechazar la promesa
    }
});