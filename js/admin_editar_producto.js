var productos = JSON.parse(localStorage.getItem("productos")) || [];

document.addEventListener("DOMContentLoaded", function () {
    var params = new URLSearchParams(window.location.search);
    var id = parseInt(params.get("id"));  // 👈 convertir el id a número

    console.log("ID recibido:", id);
    console.log("Productos en storage:", productos);

    var producto = productos.find(function(p) { return p.id === id; });

    console.log("Producto encontrado:", producto);

    if (!producto) {
        Swal.fire("Error", "Producto no encontrado", "error").then(function () {
            window.location.href = "gestion_productos.html";
        });
        return;
    }

    // Precargar datos en el formulario
    document.getElementById("txtCodigo").value = producto.codigo;
    document.getElementById("txtNombre").value = producto.nombre;
    document.getElementById("txtDescripcion").value = producto.descripcion;
    document.getElementById("txtPrecio").value = producto.precio;
    document.getElementById("txtStock").value = producto.stock;
    document.getElementById("txtStockCritico").value = producto.stockCritico;
    document.getElementById("categoria").value = producto.categoria;
    document.getElementById("txtImagen").value = producto.imagen;
});

function actualizarProducto(e) {
    e.preventDefault();

    var params = new URLSearchParams(window.location.search);
    var id = parseInt(params.get("id")); // 👈 también aquí como número

    var index = productos.findIndex(function(p) { return p.id === id; });

    if (index === -1) {
        Swal.fire("Error", "Producto no encontrado", "error");
        return;
    }

    // Capturar valores del formulario y actualizar el producto
    productos[index].nombre = document.getElementById("txtNombre").value.trim();
    productos[index].descripcion = document.getElementById("txtDescripcion").value.trim();
    productos[index].precio = parseFloat(document.getElementById("txtPrecio").value.trim());
    productos[index].stock = parseInt(document.getElementById("txtStock").value.trim());
    productos[index].stockCritico = parseInt(document.getElementById("txtStockCritico").value.trim());
    productos[index].categoria = document.getElementById("categoria").value;
    productos[index].imagen = document.getElementById("txtImagen").value.trim();

    // Guardar en localStorage
    localStorage.setItem("productos", JSON.stringify(productos));

    Swal.fire({
        icon: "success",
        title: "Producto actualizado",
        showConfirmButton: false,
        timer: 1500
    }).then(function () {
        window.location.href = "gestion_productos.html";
    });
}

// Asociar evento al botón de guardar
document.querySelector(".btn-guardar").addEventListener("click", actualizarProducto);
