fetch("datos.json")
  .then(response => response.json())
  .then(datos => {
    const formulario = document.getElementById("formulario");

    for (let clave in datos) {

      // Crear label
      const label = document.createElement("label");
      label.textContent = clave;
      formulario.appendChild(label);

      // Si el valor es un array (Email)
      if (Array.isArray(datos[clave])) {
        const ul = document.createElement("ul");
        ul.classList.add("email-list");

        datos[clave].forEach(email => {
          const li = document.createElement("li");
          li.textContent = email;
          ul.appendChild(li);
        });

        formulario.appendChild(ul);

      } else {
        // Crear input normal
        const input = document.createElement("input");
        input.type = "text";
        input.value = datos[clave];
        formulario.appendChild(input);
      }
    }
  })
  .catch(error => console.error("Error al cargar el JSON:", error));
