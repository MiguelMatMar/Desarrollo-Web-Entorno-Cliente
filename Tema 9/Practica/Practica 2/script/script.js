fetch('https://dummyjson.com/posts') // He escogido esta pagina porque la otra no funcionaba
.then(respuesta => respuesta.json())
.then(datos => {
    // Primero organizamos todos los datos en un array para manejarlo
    let arrayPost = datos.posts;
    let pagUsr = 1;

    // Ahora vamos a paginar los datos
    let userIdInput = document.getElementById('userId');
    let idInput = document.getElementById('id');
    let titleInput = document.getElementById('title');
    let bodyInput = document.getElementById('body');

    // Creamos esta funcion para que se actualice la pagina porque sino los botones no van
    let cargarPagina = () => {
        let post = arrayPost[pagUsr - 1]; // Para que empiece desde la key 0 
        
        userIdInput.value = post.userId;
        idInput.value = post.id;
        titleInput.value = post.title;
        bodyInput.value = post.body;
    };

    // Creamos los botones para pasar pagina o avanzar
    let paginaPosterior = document.getElementById("btnSiguiente");
    paginaPosterior.addEventListener('click', () => {
        if (pagUsr < arrayPost.length) {
            pagUsr++;
        } else {
            // Si la pagina llega al maximo volvemos a la pag 1
            pagUsr = 1;
        }
        cargarPagina();
    });

    let paginaAnterior = document.getElementById("btnAnterior");
    paginaAnterior.addEventListener('click', () => {
        if (pagUsr > 1) {
            pagUsr--;
        } else {
            // Si la pagina llega a 0 volvemos a la utlima pagina
            pagUsr = arrayPost.length;
        }
        cargarPagina();
    });

    cargarPagina();

}).catch(error => {
    console.log("Error al conectarse con el servidor: " + error)
});