let Numero_Quiz = 1;

// Função para iniciar o jogo
function iniciar() {
  if (
    sessionStorage.ID_USUARIO != undefined &&
    sessionStorage.ID_USUARIO != null
  ) {
    window.location.href = "../Quiz/p1.html";
  } else {
    mostrarPopUp(
      "Opa, tomou um caldo! Você precisa fazer login antes de dropar essa onda e iniciar o quiz.",
    );
    setTimeout(() => {
      window.location.href = "../login.html";
    }, 1000);
  }
}

// o quiz de fato começa aqui!!!
let alternativaSelecionada = 0;

// recebe o valor da opção selecionada pelo usuário e interage com o CSS
function alternativa(opcaoClicada) {
  // seleciona a resposta
  alternativaSelecionada = opcaoClicada;

  // remove a selecao da alternativa (bordinhas)
  document.getElementById("alt-1").classList.remove("selecionada");
  document.getElementById("alt-2").classList.remove("selecionada");
  document.getElementById("alt-3").classList.remove("selecionada");
  document.getElementById("alt-4").classList.remove("selecionada");

  // seleciona literalmente a alternativa
  if (opcaoClicada == 1) {
    document.getElementById("alt-1").classList.add("selecionada");
  } else if (opcaoClicada == 2) {
    document.getElementById("alt-2").classList.add("selecionada");
  } else if (opcaoClicada == 3) {
    document.getElementById("alt-3").classList.add("selecionada");
  } else if (opcaoClicada == 4) {
    document.getElementById("alt-4").classList.add("selecionada");
  }
}

function proximo(proximaPagina, numeroQuestao) {
  if (alternativaSelecionada === 0) {
      mostrarPopUp("Opa! Selecione uma opção antes de remar para a próxima onda!");
      setTimeout(() => { document.getElementById("meuPopUp").classList.add("escondido") }, 2000);
    return;
  }

  let pontosAtuais = Number(sessionStorage.getItem("pontosDoUser")) || 0;

  if (alternativaSelecionada === respostaCertaAtual) {
    mostrarPopUp("Boa! Ganhou ponto.");
    pontosAtuais++;
    sessionStorage.setItem("acertouQ" + numeroQuestao, 1); // Salva 1 (acerto) para essa questão específica

  } else {
    mostrarPopUp("Ixi! Resposta errada.");
    sessionStorage.setItem("acertouQ" + numeroQuestao, 0); // Salva 0 (erro) para essa questão específica
  }

  sessionStorage.setItem("pontosDoUser", pontosAtuais);
  setTimeout(() => {window.location.href = "../Quiz/" + proximaPagina;}, 2500);
}

// volta para a tela anterior
function voltar(voltarPagina) {
  window.location.href = "../Quiz/" + voltarPagina;
}

// Exibe os pontos e salva no banco
function verResultado() {
  let mensagem = "";
  let totalAcertos = Number(sessionStorage.getItem("pontosDoUser")) || 0;
  let totalPerguntas = 5;
  let totalErros = totalPerguntas - totalAcertos;

  document.getElementById("spanAcertos").innerHTML = totalAcertos;
  document.getElementById("spanErros").innerHTML = totalErros;

  if (totalAcertos >= 3) {
    mensagem =
      "Parabéns! <br> Você é um verdadeiro Surfista de Alma!";
    sessionStorage.setItem("statusFinal", "Surfista de Alma");
  } else {
    mensagem =
      "Ixi, tomou um caldo! <br> Você ainda é um Surfista Prego, mas continue estudando a história!";
    sessionStorage.setItem("statusFinal", "Surfista Prego");
  }
  document.getElementById("mensagemFinal").innerHTML = mensagem;

  fetch("/usuarios/gravar-quiz", {
    method: "POST", // post -> quando a gente for enviar 'body(json)'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({//por enquanto o numero do quiz é fixo, porque só tem um quiz
      pontuacao: totalAcertos,
      numeroQuiz: Numero_Quiz, // é a FK do quiz (esse é a var global)
      idUsuario: sessionStorage.ID_USUARIO,
      q1: sessionStorage.acertouQ1,
      q2: sessionStorage.acertouQ2,
      q3: sessionStorage.acertouQ3,
      q4: sessionStorage.acertouQ4,
      q5: sessionStorage.acertouQ5,
    }),
  })
    .then(function (resposta) {
      console.log("ESTOU NO THEN DO entrar()!");

      if (resposta.ok) {
        console.log(resposta);
      } else {
        mostrarPopUp("Ocorreu um erro e os resultados não foram armazenados!");
        setTimeout(() => { document.getElementById("meuPopUp").classList.add("escondido") }, 2000);
      }
    }) // essa função é executada caso haja erros na comunicação com o backend
    .catch(function (erro) {
      console.log(erro);
    });
}

// Reinicia o jogo
function jogarNovamente(riniciarJogo) {
  limparRespostas()

  window.location.href = "../Quiz/" + riniciarJogo;
}

// limpar as respostas do jogo anterior
function limparRespostas() {
  // Limpa os dados do jogo anterior
  sessionStorage.removeItem("pontosDoUser");
  sessionStorage.removeItem("acertouQ1");
  sessionStorage.removeItem("acertouQ2");
  sessionStorage.removeItem("acertouQ3");
  sessionStorage.removeItem("acertouQ4");
  sessionStorage.removeItem("acertouQ5");
}

// voltar para a tela inicial
function telaInicial(irTelaInicial) {
  window.location.href = "../" + irTelaInicial;
}

// Função para abrir o Pop-up
function mostrarPopUp(mensagem) {
  document.getElementById("textoDoPopUp").innerHTML = mensagem;
  document.getElementById("meuPopUp").classList.remove("escondido");
}