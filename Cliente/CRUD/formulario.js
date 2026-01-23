let proyectos = [];
let editIndex = null;

// Cargar dinámicamente
document.addEventListener("DOMContentLoaded", mostrarProyectos);

function crearOEditar() {
    const nombre = document.getElementById("nombre").value.trim();
    const descripcion = document.getElementById("descripcion").value.trim();

    // Validación (regla de negocio)
    if (nombre.length < 3) {
        alert("El nombre debe tener mínimo 3 caracteres.");
        return;
    }

    if (editIndex === null) {
        // CREAR
        proyectos.push({ nombre, descripcion });
    } else {
        // EDITAR
        proyectos[editIndex] = { nombre, descripcion };
        editIndex = null;
    }

    limpiarFormulario();
    mostrarProyectos();
}

function mostrarProyectos() {
    const contenedor = document.getElementById("lista");
    contenedor.innerHTML = "";

    proyectos.forEach((p, index) => {
        const div = document.createElement("div");
        div.className = "item";

        div.innerHTML = `
            <strong>${p.nombre}</strong><br>
            <small>${p.descripcion}</small>
            <div class="item-buttons">
                <button class="edit-btn" onclick="cargarParaEdicion(${index})">Editar</button>
                <button class="delete-btn" onclick="eliminar(${index})">Eliminar</button>
            </div>
        `;

        contenedor.appendChild(div);
    });
}

function cargarParaEdicion(i) {
    editIndex = i;
    document.getElementById("nombre").value = proyectos[i].nombre;
    document.getElementById("descripcion").value = proyectos[i].descripcion;
}

function eliminar(i) {
    proyectos.splice(i, 1);
    mostrarProyectos();
}

function limpiarFormulario() {
    document.getElementById("nombre").value = "";
    document.getElementById("descripcion").value = "";
}
