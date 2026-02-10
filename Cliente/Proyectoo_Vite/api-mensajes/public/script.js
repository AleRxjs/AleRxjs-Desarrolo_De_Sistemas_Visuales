const url = '/api/notas';

// GET por FrontEnd: Obtiene los mensajes y los dibuja en el HTML
async function obtenerNotas() {
    try {
        const res = await fetch(url);
        const data = await res.json();
        const lista = document.getElementById('lista-notas');
        
        lista.innerHTML = ''; // Limpiamos la lista antes de recargar
        
        data.forEach(n => {
            lista.innerHTML += `<li><strong>${n.autor}:</strong> ${n.contenido}</li>`;
        });
    } catch (error) {
        console.error("Error al obtener notas:", error);
    }
}

// POST por FrontEnd: Envía el mensaje y LIMPIA los campos
async function enviarNota() {
    // 1. Obtenemos las referencias a los elementos del DOM (las cajas de texto)
    const inputAutor = document.getElementById('autor');
    const inputContenido = document.getElementById('contenido');

    // 2. Extraemos los valores actuales
    const autor = inputAutor.value;
    const contenido = inputContenido.value;

    // Validación básica para no enviar mensajes vacíos
    if (!contenido.trim()) {
        alert("El mensaje no puede estar vacío");
        return;
    }

    try {
        // 3. Enviamos la petición POST al servidor
        await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ autor: autor || "Anónimo", contenido })
        });

        // 4. ¡LA CORRECCIÓN!: Limpiamos los campos de texto en la pantalla
        inputAutor.value = '';
        inputContenido.value = '';

        // 5. Refrescamos la lista para ver el nuevo mensaje
        obtenerNotas();
        
    } catch (error) {
        console.error("Error al enviar la nota:", error);
    }
}

// Carga inicial al abrir la página
obtenerNotas();