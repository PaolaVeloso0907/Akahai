// Função para iniciar o jogo
function iniciar() {
  window.location.href = "../Quiz/p1.html";
}

let alternativaSelecionada = 0;
let cliques = 0;

// recebe o valor da opção selecionada pelo usuário
function alternativa(opcaoClicada) {
  alternativaSelecionada = opcaoClicada; // salva a alternativa selecionada pelo user.
}

// segue para a próxima pergunta
function proximo(proximaPagina) {
  if (alternativaSelecionada === 0) {
    alert("Opa! Selecione uma opção antes de remar para a próxima onda!");
    return;
  }

  let pontosAtuais = Number(sessionStorage.getItem("pontosDoUser")) || 0;

  if (alternativaSelecionada === respostaCertaAtual) {
    exibirFeedback("Boa! Dropou na onda certa! Ganhou ponto.");
    pontosAtuais++;
  } else {
    exibirFeedback("Ixi, tomou um caldo! Resposta errada.");
  }

  sessionStorage.setItem("pontosDoUser", pontosAtuais);

  setTimeout(() => {
    window.location.href = "../Quiz/" + proximaPagina;
  }, 2000);

}

// volta para a tela anterior
function voltar(voltarPagina) {
  window.location.href = "../Quiz/" + voltarPagina;
}

// Exibe os pontos
function verResultado() {
  let mensagem = "";
  let totalAcertos = Number(sessionStorage.getItem("pontosDoUser")) || 0;
  let totalPerguntas = 5;
  let totalErros = totalPerguntas - totalAcertos;

  document.getElementById("spanAcertos").innerHTML = totalAcertos;
  document.getElementById("spanErros").innerHTML = totalErros;

  if (totalAcertos >= 3) {
    mensagem =
      "Parabéns! <br> Você é um verdadeiro Surfista de Alma e domina o Akahai!";
    sessionStorage.setItem("statusFinal", "Surfista de Alma"); // GUARDANDO O STATUS PARA A DASHBOARD
  } else {
    mensagem =
      "Ixi, tomou um caldo! <br> Você ainda é um Surfista Prego, mas continue remando e estudando a história!";
    sessionStorage.setItem("statusFinal", "Surfista Prego"); // GUARDANDO O STATUS PARA A DASHBOARD:
  }
  document.getElementById("mensagemFinal").innerHTML = mensagem;
}

// Reinicia o jogo
function jogarNovamente(riniciarJogo) {
  sessionStorage.clear();
  window.location.href = "../Quiz/" + riniciarJogo;
}

// Voltar para a tela inicial
function telaInicial(voltarTelaInicial) {
  window.location.href = "../" + voltarTelaInicial;
}

function exibirFeedback(mensagem) {
  document.getElementById("mensagemFeedback").innerHTML = mensagem;
  document.getElementById("popUpFeedback").classList.remove("display-none")

  
}
