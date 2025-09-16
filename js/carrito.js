document.addEventListener("DOMContentLoaded", () => {
  const lista = document.getElementById("carrito-lista");
  const totalElem = document.getElementById("total");
  const vaciarBtn = document.getElementById("vaciar");
  const cartCount = document.getElementById("cart-count"); // usar el span correcto

  // Recuperar carrito
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  // Función para renderizar los productos en la página del carrito
  function renderCarrito() {
    lista.innerHTML = "";
    let total = 0;

    // Agrupar productos por nombre para mostrar la cantidad total
    const productosAgrupados = carrito.reduce((acumulador, producto) => {
      const key = producto.nombre;
      if (!acumulador[key]) {
        acumulador[key] = { ...producto, cantidad: 0 };
      }
      acumulador[key].cantidad += 1;
      return acumulador;
    }, {});

    // Renderizar cada producto agrupado
    Object.values(productosAgrupados).forEach((prod) => {
      const item = document.createElement("div");
      item.classList.add("item-carrito");

      // Usar imagen_principal en vez de imagen
      let imagenSrc = "img/default.png"; // imagen por defecto si no existe
      if (prod.imagen_principal) {
        imagenSrc = prod.imagen_principal.startsWith("http")
          ? prod.imagen_principal
          : "img/" + prod.imagen_principal.split("/").pop();
      }

      item.innerHTML = `
        <img src="${imagenSrc}" alt="${prod.nombre}" class="img-carrito">
        <p><strong>${prod.nombre}</strong> - $${prod.precio.toLocaleString("es-CL")} x ${prod.cantidad}</p>
        <button class="eliminar" data-nombre="${prod.nombre}">Eliminar</button>
      `;
      lista.appendChild(item);

      total += prod.precio * prod.cantidad;
    });

    // Actualizar el total y el contador del header
    totalElem.innerText = `Total: $${total.toLocaleString("es-CL")}`;
    cartCount.innerText = carrito.length; // ✅ ahora sí actualiza el <span>

    // Añadir listeners a los botones de eliminar
    document.querySelectorAll(".eliminar").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const nombreEliminar = e.target.getAttribute("data-nombre");
        // Eliminar solo una instancia del producto
        const indexParaEliminar = carrito.findIndex((p) => p.nombre === nombreEliminar);
        if (indexParaEliminar !== -1) {
          carrito.splice(indexParaEliminar, 1);
        }
        localStorage.setItem("carrito", JSON.stringify(carrito));
        renderCarrito();
      });
    });
  }
  
  // Vaciar carrito
  vaciarBtn.addEventListener("click", () => {
    carrito = [];
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderCarrito();
  });

  // Renderizar el carrito al cargar la página
  renderCarrito();
});
