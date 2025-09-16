document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Evitamos el envío por defecto
    let isValid = true;

    // Limpiar mensajes previos
    emailError.textContent = "";
    passwordError.textContent = "";

    // Validación correo
    const emailValue = emailInput.value.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;

    if (emailValue === "") {
      emailError.textContent = "El correo es obligatorio.";
      isValid = false;
    } else if (emailValue.length > 100) {
      emailError.textContent = "El correo no puede superar los 100 caracteres.";
      isValid = false;
    } else if (!emailRegex.test(emailValue)) {
      emailError.textContent = "El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com.";
      isValid = false;
    }

    // Validación contraseña
    const passwordValue = passwordInput.value.trim();

    if (passwordValue === "") {
      passwordError.textContent = "La contraseña es obligatoria.";
      isValid = false;
    } else if (passwordValue.length < 4 || passwordValue.length > 10) {
      passwordError.textContent = "La contraseña debe tener entre 4 y 10 caracteres.";
      isValid = false;
    }

    // Si todo está bien → alerta + redirección
    if (isValid) {
      // Validar credenciales de admin
      if (
        emailValue === "admin@gmail.com" &&
        passwordValue === "admin"
      ) {
        alert("Bienvenido, administrador 👑");
        window.location.href = "admin.html"; // redirige al panel admin
      } else {
        alert("Inicio de sesión exitoso ✅");
        window.location.href = "home.html"; // redirige al home
      }
    }
  });
});