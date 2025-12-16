let listaDeNumerosSorteados = [];
let numerolimite = 100;
let numeroSecreto = gerarNumeroAleatorio(); 
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag, texto);
    campo.innerHTML = texto;
     if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}
function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do numero secreto');
    exibirTextoNaTela('p', 'Descubra o numero secreto entre 1 e 100');
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute  == numeroSecreto) {
         exibirTextoNaTela('h1', 'Acertou');
          let palavraTetativa = tentativas > 1 ? 'tentativas' : 'tentativa';
         let mensagemTentativas = 'Voce acertou o numero secreto com ' + tentativas + ' ' + palavraTetativa;
         exibirTextoNaTela('p', mensagemTentativas);
         document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
         if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O numero secreto e menor');
         } else {
            exibirTextoNaTela('p', 'O numero secreto e maior');
         }
         tentativas++;
        limparCampo(); 
    }
}


function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() *numerolimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numerolimite) {
        listaDeNumerosSorteados = [];
    }
    if(listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
let numeroSecreto = gerarNumeroAleatorio();
limparCampo();
tentativas = 1;
exibirMensagemInicial();
document.getElementById('reiniciar').setAttribute('disabled', 'true');
}


console.log('Numero secreto: ' + numeroSecreto);