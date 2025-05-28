const COLORES = ['rojo', 'amarillo', 'azul', 'verde'];

let secuenciaMaquina = [];
let secuenciaUsuario = [];

document.querySelector('#comenzar').addEventListener('click', function () {
    manejarSeleccionMaquina();

});

const $colores = document.querySelectorAll('.color');
for (let i = 0; i < $colores.length; i++) {
    const $color = $colores[i]; 
    $color.addEventListener('click', function () {
        const color = this.dataset.color;
        manejarSeleccionUsuario(color);
    })
}


function manejarSeleccionMaquina() {
    const colorActual = elegirColorAleatorio(COLORES);
    secuenciaMaquina.push(colorActual);
    console.log('Maquina', colorActual);
}

function manejarSeleccionUsuario(color) {
    console.log('usuario', color);
    secuenciaUsuario.push(color);

    if (color !== secuenciaMaquina[secuenciaUsuario.length - 1]) {
        console.log('perdiste');
        secuenciaMaquina = [];
        secuenciaUsuario = [];
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
