class Usuario {
    constructor(id, nombre, apellidos, fechaNacimiento, rut, correo, telefono, region, comuna, direccion, password) {
        this.id = id;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.fechaNacimiento = fechaNacimiento;
        this.rut = rut;
        this.correo = correo;
        this.telefono = telefono;
        this.region = region;
        this.comuna = comuna;
        this.direccion = direccion;
        this.password = password;
    }
}

let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

function generarId() {
    return usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1;
}

function guardarUsuario(e) {
    e.preventDefault();

    var form = document.querySelector(".formulario-usuario");

    var nombre =  document.getElementById("txtNombre").value.trim();
    var apellidos =  document.getElementById("txtApellidos").value.trim();
    var fechaNacimiento =  document.getElementById("txtFecha").value.trim();
    var rut =  document.getElementById("txtRut").value.trim();
    var correo =  document.getElementById("txtCorreo").value.trim();
    var telefono =  document.getElementById("txtTelefono").value.trim();
    var region = document.getElementById("region").value;
    var comuna = document.getElementById("comuna").value;
    var direccion =  document.getElementById("txtDireccion").value.trim();
    var password =  document.getElementById("txtPassword").value.trim();

    
    if (!nombre) return Swal.fire("Error", "El nombre es obligatorio", "error");
    if (!apellidos) return Swal.fire("Error", "Los apellidos son obligatorios", "error");
    if (!fechaNacimiento) return Swal.fire("Error", "La fecha de nacimiento es obligatoria", "error");
    if (!correo) return Swal.fire("Error", "El correo es obligatorio", "error");
    if (!telefono) return Swal.fire("Error", "El teléfono es obligatorio", "error");
    if (!region) return Swal.fire("Error", "Debes seleccionar una región", "error");
    if (!comuna) return Swal.fire("Error", "Debes seleccionar una comuna", "error");
    if (!direccion) return Swal.fire("Error", "La dirección es obligatoria", "error");
    if (!password) return Swal.fire("Error", "La contraseña es obligatoria", "error");

    if (!validarRut()) return;

    var nuevoUsuario = new Usuario(
        generarId(),
        nombre,
        apellidos,
        fechaNacimiento,
        rut,
        correo,
        telefono,
        region,
        comuna,
        direccion,
        password,
    );

    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    Swal.fire({
        icon: "success",
        title: "¡Usuario guardado!",
        text: `ID asignado: ${nuevoUsuario.id}`
    });

    form.reset();
}

function validarRut() {
    var rut = document.getElementById("txtRut").value;
    console.log(rut);
    var largo = rut.length;
    console.log("Largo del RUT: " +largo);
    if(largo!=7 && largo!=8 && largo!=9 && largo!=10){
        alert("RUT Incorrecto...");
        return false;
    }
    if(largo == 9){ // trabajar con rut de por ejemplo 6000000-0
        rut = "0"+rut;
    }
    var factor = 3; // se parte multiplicando por 3
    var suma = 0; // acumulador para el cálculo
    var caracter = rut.slice(1,2); // extrae un caracter del RUT (prueba)
    console.log(caracter);

    for (let index = 0; index < 8; index++) {
        var caracter = rut.slice(index, index+1);
        console.log(caracter+" x "+factor);
        suma+=(caracter * factor);
        // retroceder factor 1 valor
        factor--;
        if(factor == 1) {factor = 7 ; } 
    }
    console.log(suma);
    var resto = suma % 11;
    var dv = 11 - resto;
    if(dv == 11){
        dv=0;
    }
    if(dv > 9){
        dv = "K";
    }
    console.log("Su dígito verificador es: " + dv);
    var dvUsuario = rut.slice(9,10).toUpperCase();
    if(dv == dvUsuario){
        return true;
    }else{
        Swal.fire("Error", "RUT Incorrecto...", "error");
        return false;
    }
}

document.querySelector(".btn-guardar").addEventListener("click", guardarUsuario);