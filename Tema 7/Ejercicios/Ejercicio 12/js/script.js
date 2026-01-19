    
    
    let formulario = document.forms.formularioPrincipal;
    console.log(formulario);

    formulario.addEventListener("submit", (env) => {

        // Obtenemos los inputs del formulario
        let nombreUsr = document.getElementById('nombreUsr');
        let correoUsr = document.getElementById('correoUsr');
        let passwdUsr1 = document.getElementById('passwdUsr1');
        let passwdUsr2 = document.getElementById('passwdUsr2');

        // Creamos el elemento error que luego modificaremos el texto para cada apartado
        let error = document.appendChild('p');
        error.classList.add("error");

        let validacionNombreUsr = /^[a-zA-Z]{6,}$/;
        let validacionCorreoUsr = "";

        if(passwdUsr1 != passwdUsr2){
            env.preventDefault();
            error.innerText = "Las contraseñas no coinciden";
            passwdUsr2.insertBefore(error);
        }
    })