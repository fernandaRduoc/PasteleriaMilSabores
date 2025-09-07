
var comunasPorRegion = {
    "metropolitana": [
        "Santiago",
        "Puente Alto",
        "Maipú",
        "Las Condes",
        "La Florida",
        "Ñuñoa",
        "La Cisterna",
        "San Bernardo",
        "San Ramón",
        "Cerro Navia"
    ],
    "valparaiso": [
        "Valparaíso",
        "Viña del Mar",
        "Quilpué",
        "Villa Alemana",
        "San Antonio"
    ],
    "biobio": [
        "Concepción",
        "Talcahuano",
        "Chillán",
        "Los Ángeles",
        "San Pedro de la Paz"
    ],
    "araucania": [
        "Temuco",
        "Villarrica",
        "Angol",
        "Pucón"
    ],
    "antofagasta": [
        "Antofagasta",
        "Calama",
        "Tocopilla",
        "Mejillones"
    ],
    "magallanes": [
        "Punta Arenas",
        "Puerto Natales",
        "Porvenir"
    ]
};

var regionSelect = document.getElementById("region");
var comunaSelect = document.getElementById("comuna");

regionSelect.addEventListener("change", function () {
    var regionSeleccionada = this.value;

    // Reiniciar select de comunas
    comunaSelect.innerHTML = '<option value="" disabled selected>Comuna</option>';

    // Agregar comunas de la región seleccionada
    if (comunasPorRegion[regionSeleccionada]) {
        comunasPorRegion[regionSeleccionada].forEach(function (comuna) {
            var option = document.createElement("option");
            option.value = comuna;
            option.textContent = comuna;
            comunaSelect.appendChild(option);
        });
    }
});
