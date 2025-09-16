function filtrarProductos(tipo) {
  const productos = document.querySelectorAll(".card");
  productos.forEach(producto => {
    if (tipo === "all") {
      producto.style.display = "block";
    } else {
      if (producto.dataset.tipo.includes(tipo)) {
        producto.style.display = "block";
      } else {
        producto.style.display = "none";
      }
    }
  });
}
