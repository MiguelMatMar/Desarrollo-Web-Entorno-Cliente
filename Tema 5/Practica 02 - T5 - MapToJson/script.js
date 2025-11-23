let miJSON = `{"idPedido":"faa-8444","pedidos":
[
{"idProducto":"info005","nombre":"Placa_Arduino_one","destPostal":"abarcable"},
{"idProducto":"info041","nombre":"Placa_Raspberry_3","destPostal":"No abarcable"},
{"idProducto":"gadget024","nombre":"usb_Multi_5puertos","destPostal":"abarcable"},
{"idProducto":"gadget331","nombre":"ventilador_usb","destPostal":"abarcable"},
{"idProducto":"kbook112","nombre":"PHP vs JS","destPostal":"No abarcable"}
]}`;



function mostrarProductosTabla(json){
    let productosAbarcables = JSON.parse(json).pedidos.filter(producto => producto.destPostal === "abarcable"); // Filtrar productos abarcables

    // Crear un nuevo array con map para reducirlo y lo ponemos con los productos abarcables
    let arrayReducido = productosAbarcables.map(producto => { 
        return {
            idProducto: producto.idProducto,
            nombre: producto.nombre,
            destPostal: producto.destPostal
        };
    });

    let numProducto = 1; // Variable para contar el numero de productos
    let tabla = // Creamos un string con la tabla HTML
        `<table>
            <tr>
                <th>Num Producto</th>
                <th>Id Producto</th>
                <th>Nombre</th>
                <th>Destino Postal</th>
            </tr>`;
        arrayReducido.forEach(producto => { // Recorremos el array de productos abarcables
        tabla += 
            `<tr>
                <td> Producto ${numProducto++}</td>
                <td>${producto.idProducto}</td>
                <td>${producto.nombre}</td>
                <td>${producto.destPostal}</td>
            </tr>`;
        });
    tabla += `</table>`; // Cerramos la tabla
    document.getElementById("productos").innerHTML = tabla; // Insertamos la tabla en el elemento con id "productos", tambien podemos hacerlo con document.write(tabla)

}

mostrarProductosTabla(miJSON); // Llamamos a la funcion para mostrar la tabla