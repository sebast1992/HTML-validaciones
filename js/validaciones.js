export function valida(input) {
    const tipoInput = input.dataset.tipo;
    if (validadores[tipoInput]) {
        validadores[tipoInput](input);
    }

    console.log(input.parentElement);
    if (input.validity.valid) {
        input.parentElement.classList.remove('input-container--invalid')
        input.parentElement.querySelector('.input-message-error').innerHTML = '';
    } else {
        input.parentElement.classList.add('input-container--invalid')
        input.parentElement.querySelector('.input-message-error').innerHTML = mostrarMensajeError(tipoInput, input);
    }
}

const tipoErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
];

const mensajeDeError = {
    nombre: {
        valueMissing: 'El nombre no puede estar vacio'
    },
    email: {
        valueMissing: 'El email no puede estar vacio',
        typeMismatch: 'El correo no es valido'
    },
    password: {
        valueMissing: 'La contraseña no puede estar vacia',
        patternMismatch: 'Debe tener entre 6 a 12 Caracteres y almenos 1 mayuscula o minuscula - EJ:Pass123'
    },
    nacimiento: {
        valueMissing: 'La fecha de nacimiento no puede estar vacio',
        customError: 'Debes tener al menos 18 años de edad'
    },
    numero: {
        valueMissing: 'El numero de telefono no puede esta vacio',
        patternMismatch: 'El formato requerido es: xx xxxx xxxx, 10 digitos'
    },
    direccion: {
        valueMissing: 'La dirección no puede esta vacio',
        patternMismatch: 'La dirección debe tener entre 10 y 40 caracteres'
    },
    ciudad: {
        valueMissing: 'La ciudad no puede esta vacio',
        patternMismatch: 'La ciudad debe tener entre 10 y 40 caracteres'
    },
    region: {
        valueMissing: 'La región no puede esta vacio',
        patternMismatch: 'La región debe tener entre 10 y 40 caracteres'
    }
}

const validadores = {
    nacimiento: input => validarNacimiento(input),
}

function mostrarMensajeError(tipoInput, input) {
    let mensaje = '';
    tipoErrores.forEach(error => {
        if (input.validity[error]) {
            console.log(tipoInput, ' -- ', error);
            console.log(input.validity[error])
            console.log(mensajeDeError[tipoInput][error])
            mensaje = mensajeDeError[tipoInput][error];
        }
    })
    return mensaje;
}

function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    let mensaje = '';
    if (!mayorEdad(fechaCliente)) {
        mensaje = 'Debes tener al menos 18 años de edad'
    };

    input.setCustomValidity(mensaje);
}


function mayorEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFecha = new Date(fecha.getUTCFullYear() + 18, fecha.getUTCMonth(), fecha.getUTCDate());
    return diferenciaFecha <= fechaActual;
}