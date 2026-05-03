let listaDeSurfistas = []; // Lista para armazenar os dados do select

function cadastrar() {
  var nomeVar = ipt_nome.value;
  var emailVar = ipt_email.value;
  var senhaVar = ipt_senha.value;
  var confirmacaoSenhaVar = ipt_confirmarSenha.value;
  var ehSurfista = ipt_surfista.value;

  listaDeSurfistas.push(ehSurfista); // adicionando as respostas do select na lista

  let totalSurfistas = 0;
  let totalNaoSurfistas = 0;

  for (let i = 0; i < listaDeSurfistas.length; i++) { // percorrendo a lista para verificar as respostas e armazenar elas na lista para futuramente poder utilizar na Dashboard

    if (listaDeSurfistas[i] == "Sim") {
      totalSurfistas++; 
    } else {
      totalNaoSurfistas++; 
    }

  }

  var valido = ehValido(nomeVar, emailVar, senhaVar, confirmacaoSenhaVar, ehSurfista);

  if (!valido) {
    return;
  }

  // Enviando o valor da nova input
  fetch("/usuarios/cadastrar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // crie um atributo que recebe o valor recuperado aqui
      // Agora vá para o arquivo routes/usuario.js
      nomeServer: nomeVar,
      emailServer: emailVar,
      senhaServer: senhaVar,
    }),
  })
    .then(function (resposta) {
      console.log("resposta: ", resposta);

      if (resposta.ok) {
        mensagem_cadastro.innerHTML =
          "Cadastro realizado com sucesso! Redirecionando para tela de Login...";

        setTimeout(() => {
          window.location = "../HTML/login.html";
        }, "3000");

        limparFormulario();
      } else {
        throw "Houve um erro ao tentar realizar o cadastro!";
      }
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });

  return false;
}

function ehValido(nomeVar, emailVar, senhaVar, confirmacaoSenhaVar, ehSurfista) {
  mensagem_cadastro.innerHTML = "";

  // Verificando se há algum campo em branco
  if (
    nomeVar == "" ||
    emailVar == "" ||
    senhaVar == "" ||
    confirmacaoSenhaVar == ""
  ) {
    mensagem_cadastro.innerHTML = "Preencha todos os campos!";
    return false;
  }

  if (nomeVar.length <= 3) {
    mensagem_cadastro.innerHTML = "Digite um nome válido!";
    return false;
  }

  if (!emailVar.includes("@") || !emailVar.includes(".")) {
    mensagem_cadastro.innerHTML = "Digite um e-mail válido!";
    return false;
  }

  if (senhaVar.length < 6) {
    mensagem_cadastro.innerHTML = "A senha deve ter 6 ou mais caracteres!";
    return false;
  }

  if (confirmacaoSenhaVar != senhaVar) {
    mensagem_cadastro.innerHTML = "As senhas devem ser iguais!";
    return false;
  }

  if (ehSurfista == "") {
    mensagem_cadastro.innerHTML = "Por favor, selecione se você já é surfista!";
    return false;
  }

  return true;
}
