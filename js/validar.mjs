const abc = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

let textarea, inpText, form, resultado, table;

function validarInput(input) {
    input.value = input.value.replace(/[^A-Za-zÑñáéíóúÁÉÍÓÚ\s]/g, '');
    input.value = input.value.replace(/\s+/g, ' ').trim();
}

document.addEventListener('DOMContentLoaded', () => {
    textarea = document.getElementById('textarea');
    inpText = document.getElementById('clave');
    form = document.getElementById('formulario');
    resultado = document.getElementById("resultado");
    table = document.getElementById("tabla");

    // Validar inputs 

    textarea.addEventListener('blur', function() {
        validarInput(this);
    });

    inpText.addEventListener('blur', function() {
        validarInput(this);
    });

    form.addEventListener('submit', function(validar) {
        validar.preventDefault();
        resultado.textContent = '';

        let mensaje = textarea.value.toUpperCase();
        let clave = inpText.value.toUpperCase();
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

        let NewClave = [];
        let claveIndex = 0;

        for (let i = 0; i < mensaje.length; i++) {
            if (mensaje[i] === ' ') {
                NewClave.push(' ');
            } else {
                NewClave.push(clave[claveIndex]);
                claveIndex = (claveIndex + 1) % clave.length; 
            }
        }

        if (opcionSeleccionada == "1") {
            let mensajeCifrado = cifrar(mensaje, NewClave);
            resultado.textContent = 'Mensaje cifrado: ' + mensajeCifrado;
            crearMatrizVigenere(mensaje, NewClave);
        } else if (opcionSeleccionada == "2") {
            let mensajeDescifrado = descifrar(mensaje, NewClave);
            resultado.textContent = 'Mensaje descifrado: ' + mensajeDescifrado;
            crearMatrizVigenereDescifrar(mensaje, NewClave);
        }
    });
});

function cifrar(mensaje, NewClave) {
    let Cifrado = [];
    for (let i = 0; i < mensaje.length; i++) {
        let posicionM = abc.indexOf(mensaje[i]);
        let posicionC = abc.indexOf(NewClave[i]);

        if (mensaje[i] === ' ') {
            Cifrado.push(' '); 
        } else if (posicionM === -1 || posicionC === -1) {
            Cifrado.push(mensaje[i]); 
        } else {
            Cifrado.push(abc[((posicionM + posicionC) % abc.length)]);
        }
    }
    
    return Cifrado.join('');  
}

function descifrar(mensaje, NewClave) {
    let DeCifrado = [];
    for (let i = 0; i < mensaje.length; i++) {
        let posicionM = abc.indexOf(mensaje[i]);
        let posicionC = abc.indexOf(NewClave[i]);

        if (mensaje[i] === ' ') {
            DeCifrado.push(' '); 
        } else if (posicionM === -1 || posicionC === -1) {
            DeCifrado.push(mensaje[i]); 
        } else {
            DeCifrado.push(abc[((((posicionM - posicionC) % abc.length) + abc.length) % abc.length)]);
        }
    }
    return DeCifrado.join('');  
}


function crearMatrizVigenere(mensaje, clave) {
    const tabla = document.getElementById("tabla");
    tabla.innerHTML = ""; 

    const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
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
                const mensajeIndex = alfabeto.indexOf(mensaje[j].toUpperCase());
                const claveIndex = alfabeto.indexOf(clave[i].toUpperCase());

                if (mensajeIndex !== -1 && claveIndex !== -1) {
                    const letraCifradaIndex = (mensajeIndex + claveIndex) % alfabeto.length;
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
                const mensajeIndex = alfabeto.indexOf(mensaje[j].toUpperCase());
                const claveIndex = alfabeto.indexOf(clave[i].toUpperCase());

                if (mensajeIndex !== -1 && claveIndex !== -1) {
                    const letraDescifradaIndex = (mensajeIndex - claveIndex + alfabeto.length) % alfabeto.length;
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
