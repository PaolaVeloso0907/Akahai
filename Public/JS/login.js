function entrar() {
  mensagem_login.innerHTML = "";

  var emailVar = ipt_email.value;
  var senhaVar = ipt_senha.value;

  var valido = ehValido(emailVar, senhaVar);

  if (!valido) {
    return;
  }

  //---------------------------------------------------------------------------------------------------------
  // Informa no console as informações de login do user
  console.log("FORM LOGIN: ", emailVar);
  console.log("FORM SENHA: ", senhaVar);

  // envia os dados do login para o backend para verificar se o email e senha estão corretos
  fetch("/usuarios/autenticar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      emailServer: emailVar,
      senhaServer: senhaVar,
    }),
  })
    .then(function (resposta) {
      console.log("ESTOU NO THEN DO entrar()!");

      if (resposta.ok) {
        console.log(resposta);

        resposta.json().then((json) => {
          // converte a resposta do fetch para json, para acessar os dados do usuário
          console.log(json);
          console.log(JSON.stringify(json));
          sessionStorage.EMAIL_USUARIO = json.email;
          sessionStorage.NOME_USUARIO = json.nome;
          sessionStorage.ID_USUARIO = json.id;

          // Adicionando o nome do usuario na tela de "oi" após login
          sessionStorage.setItem("NOME_LOGADO", json.nome);

          setTimeout(function () {
            window.location = "../HTML/userDashboard.html";
          }, 1000);
        });
      } else {
        mensagem_login.innerHTML = "Usuário ou senha inválidos!";

        console.log("Houve um erro ao tentar realizar o login!");

        // essa função é executada caso a resposta do fetch seja diferente de "ok"
        resposta.text().then((texto) => {
          console.error(texto);
          finalizarAguardar(texto);
        });
      }
    }) // essa função é executada caso haja erros na comunicação com o backend
    .catch(function (erro) {
      console.log(erro);
    });
  //-----------------------------------------------------------------------------------------------------------

  return false;
}

// valida se o email e senha estão em branco
function ehValido(emailVar, senhaVar) {
  if (emailVar == "" || senhaVar == "") {
    mensagem_login.innerHTML = "Preencha os campos em branco!";
    return false;
  }

  return true;
}
