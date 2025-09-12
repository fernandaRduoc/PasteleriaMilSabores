class Producto {
    constructor(id, codigo, nombre, descripcion, precio, stock, stockCritico, categoria, imagen) {
        this.id = id;
        this.codigo = codigo;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.stock = stock;
        this.stockCritico = stockCritico;
        this.categoria = categoria;
        this.imagen = imagen;
    }
}

let productos = JSON.parse(localStorage.getItem("productos")) || [];

function generarId() {
    return productos.length > 0 ? productos[productos.length - 1].id + 1 : 1;
}

function guardarProducto(e) {
    e.preventDefault(); // ahora no es crítico, pero no molesta

    var form = document.querySelector(".formulario-usuario");

    var codigo = document.getElementById("txtCodigo").value.trim();
    var nombre = document.getElementById("txtNombre").value.trim();
    var descripcion = document.getElementById("txtDescripcion").value.trim();
    var precio = parseFloat(document.getElementById("txtPrecio").value.trim());
    var stock = parseInt(document.getElementById("txtStock").value.trim());
    var stockCritico = document.getElementById("txtStockCritico").value.trim();
    stockCritico = stockCritico ? parseInt(stockCritico) : null;
    var categoria = document.getElementById("categoria").value;
    var imagen = document.getElementById("txtImagen").value.trim();

    // === Validaciones ===
    if (!codigo || codigo.length < 3) {
        Swal.fire("Error", "El código debe tener al menos 3 caracteres", "error");
        return;
    }
    if (!nombre) {
        Swal.fire("Error", "El nombre es obligatorio", "error");
        return;
    }
    if (nombre.length > 100) {
        Swal.fire("Error", "El nombre no puede superar los 100 caracteres", "error");
        return;
    }
    if (descripcion.length > 500) {
        Swal.fire("Error", "La descripción no puede superar los 500 caracteres", "error");
        return;
    }
    if (isNaN(precio) || precio < 0) {
        Swal.fire("Error", "El precio debe ser un número mayor o igual a 0", "error");
        return;
    }
    if (isNaN(stock) || stock < 0) {
        Swal.fire("Error", "El stock es obligatorio y debe ser un número entero mayor o igual a 0", "error");
        return;
    }
    if (stockCritico !== null && (isNaN(stockCritico) || stockCritico < 0)) {
        Swal.fire("Error", "El stock crítico debe ser un número entero mayor o igual a 0", "error");
        return;
    }
    if (!categoria) {
        Swal.fire("Error", "Debes seleccionar una categoría", "error");
        return;
    }

    // === Crear y guardar producto ===
    var nuevoProducto = new Producto(
        generarId(),
        codigo,
        nombre,
        descripcion,
        precio,
        stock,
        stockCritico,
        categoria,
        imagen || null
    );

    productos.push(nuevoProducto);
    localStorage.setItem("productos", JSON.stringify(productos));

    Swal.fire({
        icon: "success",
        title: "¡Producto guardado!",
        text: `ID asignado: ${nuevoProducto.id}`
    });

    // Alerta stock crítico
    if (stockCritico !== null && stock <= stockCritico) {
        Swal.fire({
            icon: "warning",
            title: "Atención",
            text: `El stock (${stock}) es igual o menor al stock crítico (${stockCritico}).`
        });
    }

    form.reset();
    document.getElementById("txtImagen").value = "";
}

document.querySelector(".btn-guardar").addEventListener("click", guardarProducto);
