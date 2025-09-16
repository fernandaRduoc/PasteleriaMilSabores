document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const nombreInput = document.getElementById("nombre");
  const correoInput = document.getElementById("correo");
  const comentarioInput = document.getElementById("comentario");

  const nombreError = document.getElementById("nombreError");
  const correoError = document.getElementById("correoError");
  const comentarioError = document.getElementById("comentarioError");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let isValid = true;

    // Limpiar mensajes previos
    nombreError.textContent = "";
    correoError.textContent = "";
    comentarioError.textContent = "";

    // Validar nombre
    const nombreValue = nombreInput.value.trim();
    if (nombreValue === "") {
      nombreError.textContent = "El nombre es obligatorio.";
      isValid = false;
    } else if (nombreValue.length > 100) {
      nombreError.textContent = "El nombre no puede superar los 100 caracteres.";
      isValid = false;
    }

    // Validar correo
    const correoValue = correoInput.value.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;

    if (correoValue === "") {
      correoError.textContent = "El correo es obligatorio.";
      isValid = false;
    } else if (correoValue.length > 100) {
      correoError.textContent = "El correo no puede superar los 100 caracteres.";
      isValid = false;
    } else if (!emailRegex.test(correoValue)) {
      correoError.textContent = "El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com.";
      isValid = false;
    }

    // Validar comentario
    const comentarioValue = comentarioInput.value.trim();
    if (comentarioValue === "") {
      comentarioError.textContent = "El comentario es obligatorio.";
      isValid = false;
    } else if (comentarioValue.length > 500) {
      comentarioError.textContent = "El comentario no puede superar los 500 caracteres.";
      isValid = false;
    }

    // Si todo está correcto
    if (isValid) {
      // Mostrar en consola los datos
      console.log("Datos de contacto recibidos:");
      console.log("Nombre:", nombreValue);
      console.log("Correo:", correoValue);
      console.log("Comentario:", comentarioValue);

      alert("Formulario de contacto enviado con éxito");
      form.reset(); // limpiar campos
    }
  });
});