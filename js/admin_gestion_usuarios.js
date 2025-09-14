function cargarUsuarios() {
    // lee los datos del localStorage
    var usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    var tbody = document.getElementById("tablaUsuarios");
    tbody.innerHTML = "";

    usuarios.forEach(function(usuario) {
        var fila = document.createElement("tr");
        fila.id = "fila-" + usuario.id; // Asignar un ID único a cada fila

        // rellena la fila con los datos del localStorage
        fila.innerHTML = `
          <td>${usuario.id}</td>
          <td>${usuario.nombre}</td>
          <td>${usuario.apellidos}</td>
          <td>${usuario.fechaNacimiento}</td>
          <td>${usuario.rut}</td>
          <td>${usuario.correo}</td>
          <td>${usuario.telefono}</td>
          <td>${usuario.region}</td>
          <td>${usuario.comuna}</td>
          <td>${usuario.direccion}</td>
          <td>${usuario.password}</td>
          <td>${usuario.tipoUsuario}</td>
          <td class="text-center">
            <button class="btn btn-sm btn-warning me-2" onclick="editarUsuario(${usuario.id})">✏️ Editar</button>
            <button class="btn btn-sm btn-danger" onclick="eliminarUsuario(${usuario.id})">🗑️ Eliminar</button>
          </td>
        `;

        tbody.appendChild(fila);
    });
}
// aquí borra el localStorage y vuelve a cargar la tabla
function eliminarUsuario(id) {
    var usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    var nuevosUsuarios = usuarios.filter(u => u.id !== id);
    localStorage.setItem("usuarios", JSON.stringify(nuevosUsuarios));
    cargarUsuarios();
}

// redirigir a la página de edición con el id del usuario
function editarUsuario(id) {
    window.location.href = `admin_editar_usuario.html?id=${id}`;
}

document.addEventListener("DOMContentLoaded", cargarUsuarios);
