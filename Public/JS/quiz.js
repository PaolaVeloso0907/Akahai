// Função para iniciar o jogo
function iniciar() {
  window.location.href = "../Quiz/p1.html";
}

let alternativaSelecionada = 0;
let cliques = 0;


// recebe o valor da opção selecionada pelo usuário
function alternativa(opcaoClicada) {
  alternativaSelecionada = opcaoClicada; // salva a alternativa selecionada pelo user.

  if (alternativaSelecionada === respostaCertaAtual) {
    alert("Boa! Dropou na onda certa! Ganhou ponto.");
  } else {
    alert("Ixi, tomou um caldo! Resposta errada.");
  }
}

// segue para a próxima pergunta
function proximo(proximaPagina) {

  if (alternativaSelecionada === 0) {
    alert("Opa! Selecione uma opção antes de remar para a próxima onda!");
    return;
  } 

  window.location.href = "../Quiz/" + proximaPagina;

}

// volta para a tela anterior
function voltar(voltarPagina) {
  window.location.href = "../Quiz/" + voltarPagina;
}
