let bolinha = document.getElementById("bolinha");
let player1 = document.getElementById("player1");
let player2 = document.getElementById("player2");
let areaJogo = document.getElementById("areaJogo");
let pontosP1 = 0;
let pontosP2 = 0;

let bolinhaXPosition = 450;
let bolinhaYPosition = 175;
let bolinhaXSpeed = 4;
let bolinhaYSpeed = 4;
let deslocamento = 2;

let keysPressed = {
    'w': false,
    's': false,
    'ArrowUp': false,
    'ArrowDown': false
};

document.addEventListener('keydown', function(e){
    keysPressed[e.key] = true;
});
document.addEventListener('keyup', function(e){
    keysPressed[e.key] = false;
});

// MOVER A BOLA ----------------------------------------------------------------
function moverBola() {

    let player1Bounds = player1.getBoundingClientRect();
    let player2Bounds = player2.getBoundingClientRect();
    let bolinhaBounds = bolinha.getBoundingClientRect();
    let areaJogoBounds = areaJogo.getBoundingClientRect();
    
    let player1Topo = player1Bounds.top - areaJogoBounds.top;
    let player1Bottom = player1Bounds.bottom - areaJogoBounds.top;
    let player2Topo = player2Bounds.top - areaJogoBounds.top;
    let player2Bottom = player2Bounds.bottom - areaJogoBounds.top;

    bolinhaXPosition += bolinhaXSpeed;
    bolinhaYPosition += bolinhaYSpeed;

    // colisão com topo e fundo
    if (bolinhaYPosition + 20 >= areaJogo.clientHeight || bolinhaYPosition <= 0) {
        bolinhaYSpeed = -bolinhaYSpeed;
    }

    //colisão com laterais
    if (bolinhaXPosition + 20 >= areaJogo.clientWidth) {
        pontosP1++;
        document.getElementById("pontosP1").innerHTML = pontosP1;
        bolinhaXSpeed = -bolinhaXSpeed;
    } 
    else if (bolinhaXPosition <= 0) {
        pontosP2++;
        document.getElementById("pontosP2").innerHTML = pontosP2;
        bolinhaXSpeed = -bolinhaXSpeed;
    }
    
    //colisão com player 1
    if (bolinhaBounds.left <= player1Bounds.right &&
        bolinhaBounds.right >= player1Bounds.left &&
        bolinhaBounds.top <= player1Bounds.bottom &&
        bolinhaBounds.bottom >= player1Bounds.top) {
        bolinhaXPosition = player1Bounds.right - areaJogoBounds.left + deslocamento;
        bolinhaXSpeed = -bolinhaXSpeed;
    }
    
    //colisão com player 2
    if (
        bolinhaBounds.right >= player2Bounds.left &&
        bolinhaBounds.left <= player2Bounds.right &&
        bolinhaBounds.top <= player2Bounds.bottom &&
        bolinhaBounds.bottom >= player2Bounds.top) {
        bolinhaXPosition = player2Bounds.left - areaJogoBounds.left - 20 - deslocamento;
        bolinhaXSpeed = -bolinhaXSpeed;
    }
}

// MOVER JOGADORES -------------------------------------------------------------
function movePaddles() {
    if (keysPressed['w'] && player1.offsetTop > 0) {
        player1.style.top = (player1.offsetTop - 3) + 'px';
    }
    if (keysPressed['s'] && player1.offsetTop < areaJogo.clientHeight - player1.clientHeight - 5) {
        player1.style.top = (player1.offsetTop + 3) + 'px';
    }
    if (keysPressed['ArrowUp'] && player2.offsetTop > 0) {
        player2.style.top = (player2.offsetTop - 3) + 'px';
    }
    if (keysPressed['ArrowDown'] && player2.offsetTop < areaJogo.clientHeight - player2.clientHeight - 5) {
        player2.style.top = (player2.offsetTop + 3) + 'px';
    }
}

// ATUALIZAÇÃO DE DADOS --------------------------------------------------------
function atualizacaoDados() {
    moverBola();
    return {
        bolinhaX: bolinhaXPosition,
        bolinhaY: bolinhaYPosition
    };
}

// LOOPING PARA FUNCIONAMENTO DO JOGO
function loopDoJogo() {
    let dadosAtualizados = atualizacaoDados();

    bolinha.style.left = dadosAtualizados.bolinhaX + 'px';
    bolinha.style.top = dadosAtualizados.bolinhaY + 'px';
    
    movePaddles();

    requestAnimationFrame(loopDoJogo);
}

// CHAMAR O LOOPING QUANDO CARREGAR A PAGINA
window.addEventListener('load', function() {
    loopDoJogo();
});