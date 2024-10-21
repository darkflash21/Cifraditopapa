const alfabeto = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

let textareaElemento, inputClave, formulario, resultadoElemento, tablaElemento;

function validarInput(input) {
    input.value = input.value.replace(/[^A-Za-zÑñáéíóúÁÉÍÓÚ\s]/g, '');
    input.value = input.value.replace(/\s+/g, ' ').trim();
}

document.addEventListener('DOMContentLoaded', () => {
    textareaElemento = document.getElementById('textarea');
    inputClave = document.getElementById('clave');
    formulario = document.getElementById('formulario');
    resultadoElemento = document.getElementById("resultado");
    tablaElemento = document.getElementById("tabla");

    // Validar inputs 
    textareaElemento.addEventListener('blur', function() {
        validarInput(this);
    });

    inputClave.addEventListener('blur', function() {
        validarInput(this);
    });

    formulario.addEventListener('submit', function(evento) {
        evento.preventDefault();
        resultadoElemento.textContent = '';

        let mensaje = textareaElemento.value.toUpperCase();
        let clave = inputClave.value.toUpperCase();
        const opciones = document.getElementsByName('Opciones');

        let opcionSeleccionada;
        for (let i = 0; i < opciones.length; i++) {
            if (opciones[i].checked) {
                opcionSeleccionada = opciones[i].value;
                break;
            }
        }

        // Validación en js 
        if (!clave || !mensaje) {
            alert("El mensaje y la clave no pueden estar vacíos.");
            return;
        }

        if (!opcionSeleccionada) {
            alert("Por favor, selecciona una opción.");
            return;
        }

        let nuevaClave = [];
        let indiceClave = 0;

        for (let i = 0; i < mensaje.length; i++) {
            if (mensaje[i] === ' ') {
                nuevaClave.push(' ');
            } else {
                nuevaClave.push(clave[indiceClave]);
                indiceClave = (indiceClave + 1) % clave.length; 
            }
        }

        if (opcionSeleccionada == "1") {
            let mensajeCifrado = cifrar(mensaje, nuevaClave);
            resultadoElemento.textContent = 'Mensaje cifrado: ' + mensajeCifrado;
            crearMatrizVigenere(mensaje, nuevaClave);
        } else if (opcionSeleccionada == "2") {
            let mensajeDescifrado = descifrar(mensaje, nuevaClave);
            resultadoElemento.textContent = 'Mensaje descifrado: ' + mensajeDescifrado;
            crearMatrizVigenereDescifrar(mensaje, nuevaClave);
        }
    });
});

function cifrar(mensaje, nuevaClave) {
    let cifrado = [];
    for (let i = 0; i < mensaje.length; i++) {
        let posicionMensaje = alfabeto.indexOf(mensaje[i]);
        let posicionClave = alfabeto.indexOf(nuevaClave[i]);

        if (mensaje[i] === ' ') {
            cifrado.push(' '); 
        } else if (posicionMensaje === -1 || posicionClave === -1) {
            cifrado.push(mensaje[i]); 
        } else {
            cifrado.push(alfabeto[((posicionMensaje + posicionClave) % alfabeto.length)]);
        }
    }
    
    return cifrado.join('');  
}

function descifrar(mensaje, nuevaClave) {
    let descifrado = [];
    for (let i = 0; i < mensaje.length; i++) {
        let posicionMensaje = alfabeto.indexOf(mensaje[i]);
        let posicionClave = alfabeto.indexOf(nuevaClave[i]);

        if (mensaje[i] === ' ') {
            descifrado.push(' '); 
        } else if (posicionMensaje === -1 || posicionClave === -1) {
            descifrado.push(mensaje[i]); 
        } else {
            descifrado.push(alfabeto[((((posicionMensaje - posicionClave) % alfabeto.length) + alfabeto.length) % alfabeto.length)]);
        }
    }
    return descifrado.join('');  
}

function crearMatrizVigenere(mensaje, clave) {
    const tabla = document.getElementById("tabla");
    tabla.innerHTML = ""; 

    const alfabeto = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
    const tr = document.createElement("tr");
    const vacio = document.createElement("th");
    tr.appendChild(vacio);

    for (let i = 0; i < mensaje.length; i++) {
        const th = document.createElement("th");
        th.textContent = mensaje[i] === ' ' ? ' ' : mensaje[i].toUpperCase();
        tr.appendChild(th);
    }
    tabla.appendChild(tr);

    for (let i = 0; i < clave.length; i++) {
        const fila = document.createElement("tr");
        const th = document.createElement("th");
        th.textContent = clave[i] === ' ' ? ' ' : clave[i].toUpperCase();
        fila.appendChild(th);

        for (let j = 0; j < mensaje.length; j++) {
            const td = document.createElement("td");
            if (mensaje[j] !== ' ') {
                const indiceMensaje = alfabeto.indexOf(mensaje[j].toUpperCase());
                const indiceClave = alfabeto.indexOf(clave[i].toUpperCase());

                if (indiceMensaje !== -1 && indiceClave !== -1) {
                    const letraCifradaIndex = (indiceMensaje + indiceClave) % alfabeto.length;
                    td.textContent = alfabeto[letraCifradaIndex];
                } else {
                    td.textContent = mensaje[j];
                }
            } else {
                td.textContent = "";
            }
            fila.appendChild(td);
        }

        tabla.appendChild(fila);
    }
}

function crearMatrizVigenereDescifrar(mensaje, clave) {
    const tabla = document.getElementById("tabla");
    tabla.innerHTML = ""; 

    const alfabeto = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
    const tr = document.createElement("tr");
    const vacio = document.createElement("th");
    tr.appendChild(vacio);

    for (let i = 0; i < mensaje.length; i++) {
        const th = document.createElement("th");
        th.textContent = mensaje[i] === ' ' ? ' ' : mensaje[i].toUpperCase();
        tr.appendChild(th);
    }
    tabla.appendChild(tr);

    for (let i = 0; i < clave.length; i++) {
        const fila = document.createElement("tr");
        const th = document.createElement("th");
        th.textContent = clave[i] === ' ' ? ' ' : clave[i].toUpperCase();
        fila.appendChild(th);

        for (let j = 0; j < mensaje.length; j++) {
            const td = document.createElement("td");
            if (mensaje[j] !== ' ') {
                const indiceMensaje = alfabeto.indexOf(mensaje[j].toUpperCase());
                const indiceClave = alfabeto.indexOf(clave[i].toUpperCase());

                if (indiceMensaje !== -1 && indiceClave !== -1) {
                    const letraDescifradaIndex = (indiceMensaje - indiceClave + alfabeto.length) % alfabeto.length;
                    td.textContent = alfabeto[letraDescifradaIndex];
                } else {
                    td.textContent = mensaje[j];
                }
            } else {
                td.textContent = "";
            }
            fila.appendChild(td);
        }

        tabla.appendChild(fila);
    }
}
