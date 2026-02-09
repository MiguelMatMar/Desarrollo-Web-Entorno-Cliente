// Alternar Ver Contraseña u Ocultar Contraseña
document.getElementById('mostrarPasswd').addEventListener('click', () => {
    let inputPasswd = document.getElementById('passwd');
    let botonPasswd = document.getElementById('mostrarPasswd');
    if(inputPasswd.type === "password"){
        inputPasswd.type = "text";
        botonPasswd.value = "Ocultar Contraseña";
    }else{
        inputPasswd.type = "password"
        botonPasswd.value = "Mostrar Contraseña";
    }
});
document.getElementById('aleatorio').addEventListener('click', () => {
    let inputPasswd = document.getElementById('passwd');
    let inputEmail = document.getElementById('email');

    
})
