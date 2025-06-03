const COLORES = ['rojo', 'amarillo', 'azul', 'verde'];

let secuenciaMaquina = [];
let secuenciaUsuario = [];

const $ronda = document.querySelector('#ronda');
let ronda = 0;

const $estado = document.querySelector('#estado');

reiniciar();

document.querySelector('#comenzar').addEventListener('click', function () {
    manejarSeleccionMaquina();

});

function bloquearUsuario() {
    const $colores = document.querySelectorAll('.color');
    for (let i = 0; i < $colores.length; i++) {
        const $color = $colores[i];
        $color.onclick = function () {
        };
    }
}

function desBloquearUsuario() {
    const $colores = document.querySelectorAll('.color');
    for (let i = 0; i < $colores.length; i++) {
        const $color = $colores[i];
        $color.onclick = function () {
            const color = this.dataset.color;
            manejarSeleccionUsuario(color);
        };
    }
}



function manejarSeleccionMaquina() {
    const DELAY_IN_MS = 1000;
    actualizarEstado('Turno de la maquina:')
    bloquearUsuario();
    incrementarRonda();

    const colorActual = elegirColorAleatorio(COLORES);
    secuenciaMaquina.push(colorActual);

    for (let i = 0; i < secuenciaMaquina.length; i++) {
        setTimeout(function () {
            resaltarCuadro(secuenciaMaquina[i]);
        }, DELAY_IN_MS * (i + 1))
    }

    setTimeout(function () {
        actualizarEstado('Turno del jugador:')
        desBloquearUsuario();
    }, DELAY_IN_MS * (secuenciaMaquina.length + 1))

}

function resaltarCuadro(color) {
    const DELAY_IN_MS = 500;

    document.querySelector('.' + color).style.opacity = 1;

    setTimeout(function () {
        document.querySelector('.' + color).style.opacity = 0.5;
    }, DELAY_IN_MS);
}

function manejarSeleccionUsuario(color) {
    resaltarCuadro(color);
    secuenciaUsuario.push(color);

    if (color !== secuenciaMaquina[secuenciaUsuario.length - 1]) {
        reiniciar(true);
        return;
    }

    if (secuenciaUsuario.length === secuenciaMaquina.length) {
        secuenciaUsuario = [];
        manejarSeleccionMaquina();
    }

}


function elegirColorAleatorio(colores) {
    const indiceAleatorio = Math.floor(Math.random() * colores.length);
    return colores[indiceAleatorio];
};

function incrementarRonda() {
    $ronda.textContent = ++ronda;
}

function reiniciarRonda(ronda) {
    ronda = 0;
    $ronda.textContent = 0;
}

function actualizarEstado(estado) {
    $estado.textContent = estado;
}

function reiniciar(usuarioPerdio = false) {
    bloquearUsuario();
    if (usuarioPerdio) {
        actualizarEstado('Perdiste! Toca "Comenzar" para reiniciar el juego.');
    } else {
        actualizarEstado('Toca "Comenzar" para iniciar el juego.');
    }
    secuenciaMaquina = [];
    secuenciaUsuario = [];
    ronda = 0;
}