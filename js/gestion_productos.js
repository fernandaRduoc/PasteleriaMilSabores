function cargarProductos() {
    // lee los datos del localStorage
    var productos = JSON.parse(localStorage.getItem("productos")) || [];
    var tbody = document.getElementById("tablaProductos");
    tbody.innerHTML = "";

    productos.forEach(function(producto) {
        var fila = document.createElement("tr");
        fila.id = "fila-" + producto.id; // Asignar un ID único a cada fila

        // rellena la fila con los datos del localStorage
        fila.innerHTML = `
          <td>${producto.id}</td>
          <td>${producto.nombre}</td>
          <td>${producto.descripcion}</td>
          <td>${producto.precio}</td>
          <td>${producto.stock}</td>
          <td>${producto.stockCritico}</td>
          <td>${producto.categoria}</td>
          <td><img src="${producto.imagen}" alt="${producto.nombre}" style="width:60px; height:auto; border-radius:4px;"></td>
          <td class="text-center">
            <button class="btn btn-sm btn-warning me-2" onclick="editarProducto(${producto.id})">✏️ Editar</button>
            <button class="btn btn-sm btn-danger" onclick="eliminarProducto(${producto.id})">🗑️ Eliminar</button>
          </td>
        `;

        tbody.appendChild(fila);
    });
}
// aquí borra el localStorage y vuelve a cargar la tabla
function eliminarProducto(id) {
    var productos = JSON.parse(localStorage.getItem("productos")) || [];
    var nuevosProductos = productos.filter(p => p.id !== id);
    localStorage.setItem("productos", JSON.stringify(nuevosProductos));
    cargarProductos();
}

// redirigir a la página de edición con el id del producto
function editarProducto(id) {
    window.location.href = `editar_producto.html?id=${id}`;
}

document.addEventListener("DOMContentLoaded", cargarProductos);
