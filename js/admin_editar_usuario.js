var usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

document.addEventListener("DOMContentLoaded", function () {
    var params = new URLSearchParams(window.location.search);
    var id = parseInt(params.get("id"));  // 👈 convertir el id a número

    console.log("ID recibido:", id);
    console.log("Usuarios en storage:", usuarios);

    var usuario = usuarios.find(function(u) { return u.id === id; });

    console.log("Usuario encontrado:", usuario);

    if (!usuario) {
        Swal.fire("Error", "Usuario no encontrado", "error").then(function () {
            window.location.href = "gestion_usuarios.html";
        });
        return;
    }

    // Precargar datos en el formulario
    document.getElementById("txtNombre").value = usuario.nombre;
    document.getElementById("txtApellidos").value = usuario.apellidos;
    document.getElementById("txtFecha").value = usuario.fechaNacimiento;
    document.getElementById("txtRut").value = usuario.rut;
    document.getElementById("txtCorreo").value = usuario.correo;
    document.getElementById("txtTelefono").value = usuario.telefono;
    document.getElementById("region").value = usuario.region;
    document.getElementById("comuna").value = usuario.comuna;
    document.getElementById("txtDireccion").value = usuario.direccion;
    document.getElementById("txtPassword").value = usuario.password;
    document.getElementById("tipoUsuario").value = usuario.tipoUsuario;
});

function actualizarUsuario(e) {
    e.preventDefault();

    var params = new URLSearchParams(window.location.search);
    var id = parseInt(params.get("id")); // 👈 también aquí como número

    var index = usuarios.findIndex(function(u) { return u.id === id; });

    if (index === -1) {
        Swal.fire("Error", "Usuario no encontrado", "error");
        return;
    }

    // Capturar valores del formulario y actualizar el usuario
    usuarios[index].nombre = document.getElementById("txtNombre").value.trim();
    usuarios[index].apellidos = document.getElementById("txtApellidos").value.trim();
    usuarios[index].fechaNacimiento = document.getElementById("txtFecha").value.trim();
    usuarios[index].rut = document.getElementById("txtRut").value.trim();
    usuarios[index].correo = document.getElementById("txtCorreo").value.trim();
    usuarios[index].telefono = document.getElementById("txtTelefono").value.trim();
    usuarios[index].region = document.getElementById("region").value;
    usuarios[index].comuna = document.getElementById("comuna").value;
    usuarios[index].direccion = document.getElementById("txtDireccion").value.trim();
    usuarios[index].password = document.getElementById("txtPassword").value.trim();
    usuarios[index].tipoUsuario = document.getElementById("tipoUsuario").value;

    // Guardar en localStorage
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    Swal.fire({
        icon: "success",
        title: "Usuario actualizado",
        showConfirmButton: false,
        timer: 1500
    }).then(function () {
        window.location.href = "gestion_usuarios.html";
    });
}

// Asociar evento al botón de guardar
document.querySelector(".btn-guardar").addEventListener("click", actualizarUsuario);
