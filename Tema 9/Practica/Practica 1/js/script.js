fetch("./js/datos.json")
  .then(response => response.json())
  .then(datos => {
    
    let registro = Array.isArray(datos) ? datos[0] : datos; // Comprueba si el json viene con corchetes y si si, selecciona el primero, sino selecciona tal cual
    let formulario = document.getElementById("formulario");

    for (let clave in registro) {

      // Crear label
      let label = document.createElement("label");
      label.textContent = clave;
      formulario.appendChild(label);

      // Si el valor es un array como el Email por ejemplo
      if (Array.isArray(registro[clave])) {
        // Creamos para que se vea en vertical
        let contenedorEmails = document.createElement("div");
        contenedorEmails.classList.add("contenedor-vertical");

        registro[clave].forEach(email => {
          let inputEmail = document.createElement("input");
          inputEmail.type = "email";
          inputEmail.value = email;
          contenedorEmails.appendChild(inputEmail);
        });

        formulario.appendChild(contenedorEmails);

      } else {
        // Crear input normal
        let input = document.createElement("input");
        input.type = "text";
        input.value = registro[clave];
        formulario.appendChild(input);
      }
    }
  })
  .catch(error => console.error("Error al cargar el JSON:", error));