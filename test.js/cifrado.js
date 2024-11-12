const abc = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

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

// Exportar las funciones
export { cifrar, descifrar };
