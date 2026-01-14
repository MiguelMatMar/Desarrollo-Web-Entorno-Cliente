let cajaMovible = document.getElementById('cajaMovil');
let cajas = document.querySelectorAll('.cajas');
let idArrastrado = null;

cajaMovible.addEventListener('dragstart', (e) => {
    idArrastrado = e.target.id;
    cajaMovible.classList.add('arrastrando');
});

cajaMovible.addEventListener('dragend', (e) => {
    cajaMovible.classList.remove('arrastrando');
});

cajas.forEach(caja => {
    caja.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    caja.addEventListener('drop', (e) => {
        e.preventDefault();
        let elemento = document.getElementById(idArrastrado);
        caja.appendChild(elemento);
        caja.style.borderStyle = 'solid';
    });

    caja.addEventListener('dragenter', (e) => {
        e.preventDefault();
        if (cajaMovible.classList.contains('arrastrando')) {
            caja.style.borderStyle = 'dashed';
        }
    });

    caja.addEventListener('dragleave', (e) => {
        e.preventDefault();
        caja.style.borderStyle = 'solid';
    });
});
