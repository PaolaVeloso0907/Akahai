let listaDeSurfistas = []; // Lista para armazenar os dados do select

function cadastrar() {
  var nomeVar = ipt_nome.value;
  var emailVar = ipt_email.value;
  var senhaVar = ipt_senha.value;
  var confirmacaoSenhaVar = ipt_confirmarSenha.value;
  var perfilVar = ipt_surfista.value;

  listaDeSurfistas.push(perfilVar); // adicionando as respostas do select na lista

  let totalSurfistas = 0;
  let totalNaoSurfistas = 0;

  for (let i = 0; i < listaDeSurfistas.length; i++) { // percorrendo a lista para verificar as respostas e armazenar elas na lista para futuramente poder utilizar na dash

    if (listaDeSurfistas[i] == "Sim") {
      totalSurfistas++; 
    } else {
      totalNaoSurfistas++; 
    }

  }

  var valido = ehValido(nomeVar, emailVar, senhaVar, confirmacaoSenhaVar, perfilVar); 
  if (!valido) { 
    return;
  }

  // Enviando o valor da nova input
  fetch("/usuarios/cadastrar", { // rota do backend para cadastrar o usuário
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
      perfilServer: perfilVar,
    }),
  })
    .then(function (resposta) { // função para tratar a resposta do backend
      console.log("resposta: ", resposta); // para verificar a resposta do backend

      if (resposta.ok) { // se a resposta do fetch for "ok", ou seja, o cadastro foi bem-sucedido
        mensagem_cadastro.innerHTML =
          "Cadastro realizado com sucesso! Redirecionando para tela de Login...";

        setTimeout(() => { // aguarda 3 segundos para redirecionar o usuário para a tela de login, para exibir a mensagem de sucesso
          window.location = "../HTML/login.html";
        }, "3000");

      } else { // se a resposta do fetch for diferente de "ok", ou seja, o cadastro falhou
        throw "Houve um erro ao tentar realizar o cadastro!";
      }
    })// essa função é executada caso haja erros na comunicação com o backend
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });

  return false; // retorna falso para impedir o envio do formulário, pois o cadastro é feito via fetch, sem recarregar a página
}

function ehValido(nomeVar, emailVar, senhaVar, confirmacaoSenhaVar, perfil) {
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

  if (perfil == "") {
    mensagem_cadastro.innerHTML = "Por favor, selecione se você já é surfista!";
    return false;
  }

  return true;
}
