document.addEventListener('DOMContentLoaded', () => {
    formularioLogin();
});

function formularioLogin() {
    let form = document.getElementById('login-form');
    let emailInput = document.getElementById('email');
    let passInput = document.getElementById('pass');
    let errorMsg = document.getElementById('error-msg');

    // Si se equivoca y selecciona la casilla se oculta el error y se selecciona todo el texto
    [emailInput, passInput].forEach(input => {
        input.addEventListener('click', () => {
            errorMsg.classList.add('hidden');
            input.select(); 
        });
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validamos la contraseña para que tenga 8 caracteres, Mayúscula, Minúscula, Número y No Alfanumérico
        let passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        
        if (!passRegex.test(passInput.value)) {
            alert("La contraseña debe tener: 8+ caracteres, Mayúscula, Minúscula, Número y Símbolo.");
            return;
        }

        let formData = new FormData(form);
        
        try {
            // Se le envia el contenido al php
            let response = await fetch('recibe.php', {
                method: 'POST',
                body: formData
            }); 
            
            if (!response.ok) { // Si no devuelve nada error
                throw new Error("Archivo PHP no encontrado");
            }
            
            let result = await response.json(); // Si devuelve algo lo guardamos
            controladorRespuesta(result);
        } catch (error) {
            console.error("Error en la comunicación:", error);
            alert("Error: Asegúrate de estar ejecutando esto en un servidor (localhost)");
        }
    });
}

function controladorRespuesta(result) {
    let container = document.getElementById('app-container');

    if (result.status === 'admin') {
        renderAdmin(container);
    } else if (result.status === 'standard') {
        renderStandard(container, result.data);
    } else {
        document.getElementById('error-msg').classList.remove('hidden'); // Si el usuario es desconocido mostramos error
    }
}

function renderAdmin(container) {
    container.innerHTML = ''; // Limpiamos el contenedor

    let divDashboard = document.createElement('div');
    divDashboard.className = 'dashboard';

    let h2 = document.createElement('h2');
    h2.textContent = 'Panel Administrativo';
    divDashboard.appendChild(h2);

    let divGrid = document.createElement('div');
    divGrid.className = 'grid-buttons';

    // Creamos los 4 botones requeridos
    let botones = ['Altas', 'Bajas', 'Consultas', 'Modificaciones'];
    botones.forEach(label => {
        let btn = document.createElement('button');
        btn.textContent = label;
        btn.addEventListener('click', () => {
            console.log(`Ha pulsado el botón ${label}`);
        });
        divGrid.appendChild(btn);
    });

    divDashboard.appendChild(divGrid);

    // Botón Inicio
    let btnInicio = document.createElement('button');
    btnInicio.className = 'btn-inicio';
    btnInicio.textContent = 'Inicio';
    btnInicio.addEventListener('click', () => location.reload());
    
    divDashboard.appendChild(btnInicio);
    container.appendChild(divDashboard);
}

function renderStandard(container, data) {
    container.innerHTML = ''; // Limpiamos el contenedor

    let divDashboard = document.createElement('div');
    divDashboard.className = 'dashboard';

    let h2 = document.createElement('h2');
    h2.textContent = 'Datos de Usuario (JSON)';
    divDashboard.appendChild(h2);

    // Renderizar datos del usuario
    let divUserData = document.createElement('div');
    divUserData.className = 'user-data';

    let campos = [
        { label: 'Nombre', valor: data.nombre },
        { label: 'Apellidos', valor: data.apellidos },
        { label: 'DNI', valor: data.dni }
    ];

    campos.forEach(item => {
        let p = document.createElement('p');
        let strong = document.createElement('strong');
        strong.textContent = `${item.label}: `;
        p.appendChild(strong);
        p.appendChild(document.createTextNode(item.valor));
        divUserData.appendChild(p);
    });
    divDashboard.appendChild(divUserData);

    // Sección de Petición
    let divField = document.createElement('div');
    divField.className = 'field';
    
    let label = document.createElement('label');
    label.textContent = 'Introduzca petición:';
    
    let inputPeticion = document.createElement('input');
    inputPeticion.type = 'text';
    inputPeticion.id = 'peticion-input';
    inputPeticion.placeholder = 'Escriba algo...';

    divField.appendChild(label);
    divField.appendChild(inputPeticion);
    divDashboard.appendChild(divField);

    // Botones finales
    let divButtons = document.createElement('div');
    divButtons.className = 'buttons';

    let btnConsultar = document.createElement('button');
    btnConsultar.textContent = 'Consultar';
    btnConsultar.addEventListener('click', () => {
        console.log('Contenido petición:', inputPeticion.value);
    });

    let btnInicio = document.createElement('button');
    btnInicio.textContent = 'Inicio';
    btnInicio.addEventListener('click', () => location.reload());

    divButtons.appendChild(btnConsultar);
    divButtons.appendChild(btnInicio);
    divDashboard.appendChild(divButtons);

    container.appendChild(divDashboard);
}