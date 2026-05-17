// Função para iniciar o jogo
function iniciar() {
  if (sessionStorage.ID_USUARIO != undefined && sessionStorage.ID_USUARIO != null) {
    window.location.href = "../Quiz/p1.html";
  } else {
    alert("Opa, tomou um caldo! Você precisa fazer login antes de dropar essa onda e iniciar o quiz.");
    window.location.href = "../login.html";
  }
}


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
    alert("Opa! Selecione uma opção antes de remar para a próxima onda!");
    return;
  }

  let pontosAtuais = Number(sessionStorage.getItem("pontosDoUser")) || 0;

  if (alternativaSelecionada === respostaCertaAtual) {
    alert("Boa! Dropou na onda certa! Ganhou ponto.");
    pontosAtuais++;
    // Salva 1 (acerto) para essa questão específica
    sessionStorage.setItem("acertouQ" + numeroQuestao, 1);
  } else {
    alert("Ixi, tomou um caldo! Resposta errada.");
    // Salva 0 (erro) para essa questão específica
    sessionStorage.setItem("acertouQ" + numeroQuestao, 0);
  }

  sessionStorage.setItem("pontosDoUser", pontosAtuais);
  window.location.href = "../Quiz/" + proximaPagina;
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
      "Parabéns! <br> Você é um verdadeiro Surfista de Alma e domina o Akahai!";
    sessionStorage.setItem("statusFinal", "Surfista de Alma");
  } else {
    mensagem =
      "Ixi, tomou um caldo! <br> Você ainda é um Surfista Prego, mas continue remando e estudando a história!";
    sessionStorage.setItem("statusFinal", "Surfista Prego");
  }
  document.getElementById("mensagemFinal").innerHTML = mensagem;

  let idUsuario = sessionStorage.ID_USUARIO;

  let acertouQ1 = Number(sessionStorage.getItem("acertouQ1")) || 0;
  let acertouQ2 = Number(sessionStorage.getItem("acertouQ2")) || 0;
  let acertouQ3 = Number(sessionStorage.getItem("acertouQ3")) || 0;
  let acertouQ4 = Number(sessionStorage.getItem("acertouQ4")) || 0;
  let acertouQ5 = Number(sessionStorage.getItem("acertouQ5")) || 0;

  fetch("/usuarios/salvarResultado", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idUsuarioServer: idUsuario,
      pontuacaoServer: totalAcertos,
      q1Server: acertouQ1,
      q2Server: acertouQ2,
      q3Server: acertouQ3,
      q4Server: acertouQ4,
      q5Server: acertouQ5,
    }),
  })
    .then(function (resposta) {
      if (resposta.ok) {
        console.log("Respostas salvas com sucesso no banco!");
      } else {
        console.log("Erro ao salvar respostas.");
      }
    })
    .catch(function (erro) {
      console.log("Erro no fetch: ", erro);
    });
}

// Reinicia o jogo
function jogarNovamente(riniciarJogo) {
  sessionStorage.removeItem("pontosDoUser");
  sessionStorage.removeItem("acertouQ1");
  sessionStorage.removeItem("acertouQ2");
  sessionStorage.removeItem("acertouQ3");
  sessionStorage.removeItem("acertouQ4");
  sessionStorage.removeItem("acertouQ5");

  window.location.href = "../Quiz/" + riniciarJogo;
}

function telaInicial(irTelaInicial) {
  window.location.href = "../" + irTelaInicial;
}
