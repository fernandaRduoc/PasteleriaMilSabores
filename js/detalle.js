// Obtener el nombre del producto de la URL
const urlParams = new URLSearchParams(window.location.search);
const productoSeleccionado = urlParams.get('producto');

// Encontrar el producto en el objeto de datos
const producto = productos[productoSeleccionado];

// Si el producto existe, actualizar la página
if (producto) {
  document.getElementById('product-title').textContent = producto.titulo;
  document.getElementById('product-price').textContent = `$${producto.precio.toLocaleString("es-CL")}`;
  document.getElementById('product-description').textContent = producto.descripcion;
  document.getElementById('main-product-image').src = producto.imagen_principal;

  // Opcional: Generar miniaturas dinámicamente
  const thumbnailsContainer = document.getElementById('thumbnails-container');
  thumbnailsContainer.innerHTML = '';
  producto.miniaturas.forEach(miniaturaSrc => {
    const img = document.createElement('img');
    img.src = miniaturaSrc;
    img.alt = producto.titulo;
    thumbnailsContainer.appendChild(img);
  });

  // Botón de añadir al carrito en detalle
  const addBtn = document.getElementById("add-to-cart-detail");
  if (addBtn) {
    addBtn.addEventListener("click", () => {
      let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
      carrito.push({ nombre: productoSeleccionado, ...producto });
      localStorage.setItem("carrito", JSON.stringify(carrito));

      // Actualizar contador
      document.getElementById("cart-count").textContent = carrito.length;
    });
  }

} else {
  console.error("Producto no encontrado");
}