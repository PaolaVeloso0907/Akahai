function entrar() {
  var emailVar = ipt_email.value;
  var senhaVar = ipt_senha.value;

  var valido = ehValido(emailVar, senhaVar);

  if (!valido) {
    return;
  }

  console.log("FORM LOGIN: ", emailVar);
  console.log("FORM SENHA: ", senhaVar);

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
          console.log(json);
          console.log(JSON.stringify(json));
          sessionStorage.EMAIL_USUARIO = json.email;
          sessionStorage.NOME_USUARIO = json.nome;
          sessionStorage.ID_USUARIO = json.id;

          setTimeout(function () {
            window.location = "../HTML/Dashboard/dashboard.html";
          }, 1000); // apenas para exibir o loading
        });
      } else {
        mensagem_login.innerHTML = "Usuário ou senha inválidos!";

        console.log("Houve um erro ao tentar realizar o login!");

        resposta.text().then((texto) => {
          console.error(texto);
          finalizarAguardar(texto);
        });
      }
    })
    .catch(function (erro) {
      console.log(erro);
    });

  return false;
}

function ehValido(emailVar, senhaVar) {
  if (emailVar == "" || senhaVar == "") {
    mensagem_login.innerHTML = "Preencha os campos em branco!";
    return false;
  }

  return true;
}
