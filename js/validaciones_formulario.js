var formulario = document.getElementById("formulario-usuario");

    formulario.addEventListener("submit", function(event) {
        event.preventDefault(); // evita que se envíe sin validar

        var nombre = document.getElementById("nombre").value.trim();
        var correo = document.getElementById("correo").value.trim();

        if (nombre === "" || correo === "") {
            Swal.fire("Error", "Todos los campos son obligatorios", "warning");
            return;
        }

        if (!correo.includes("@")) {
            Swal.fire("Error", "El correo debe contener @", "error");
            return;
        }

        Swal.fire("¡Listo!", "Formulario enviado correctamente", "success");
        // aquí podrías poner formulario.submit() si quieres enviarlo de verdad
    });