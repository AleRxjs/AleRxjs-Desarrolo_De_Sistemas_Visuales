/* Formulario Zapatería */

const listaZapatos = [];
const formulario = document.getElementById('formulario');
const marcaZapato = document.getElementById('marcaZapato');
const numeroZapato = document.getElementById('numeroZapato');
const textoError = document.getElementById('textoError');
const btnAgregar = document.getElementById('btnAgregar');
const btnLimpiar = document.getElementById('btnLimpiar');
const btnLimpiarLista = document.getElementById('btnLimpiarLista');
const listaEnPantalla = document.getElementById('listaZapatos');
const textoVacio = document.getElementById('textoVacio');

function normalizarTexto(texto) {
    return texto.trim().toLowerCase().replace(/\s+/g, ' ');
}

function validar() {
    const marca = normalizarTexto(marcaZapato.value);
    const numero = Number(numeroZapato.value);

    let error = "";

    if (marca.length < 2) {
        error = "La marca debe tener al menos 2 caracteres.";
    } else if (!numero || numero < 1 || numero > 40) {
        error = "Ingresa un número válido del 1 al 40.";
    }

    textoError.textContent = error;
    btnAgregar.disabled = Boolean(error);

    return !error;
}

function pintarLista() {
    listaEnPantalla.innerHTML = "";
    
    // mensaje si está vacío
    textoVacio.style.display = listaZapatos.length === 0 ? "block" : "none";

    listaZapatos.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `#${index + 1} | Marca: ${item.marca} | Número: ${item.numero}`;
        listaEnPantalla.appendChild(li);
    });
}

function limpiarFormulario() {
    marcaZapato.value = "";
    numeroZapato.value = "";
    textoError.textContent = "";
    btnAgregar.disabled = true;
    marcaZapato.focus();
}

function limpiarLista() {
    listaZapatos.length = 0;
    pintarLista();
}

// Eventos
marcaZapato.addEventListener('input', validar);
numeroZapato.addEventListener('input', validar);

btnLimpiar.addEventListener('click', limpiarFormulario);
btnLimpiarLista.addEventListener('click', limpiarLista);

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validar()) return;

    listaZapatos.push({
        marca: normalizarTexto(marcaZapato.value),
        numero: normalizarTexto(numeroZapato.value)
    });

    limpiarFormulario();
    pintarLista();
});

// Inicial
validar();
pintarLista();
