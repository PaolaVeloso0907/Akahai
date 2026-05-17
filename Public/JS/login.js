function entrar() {
  var emailVar = ipt_email.value;
  var senhaVar = ipt_senha.value;

  var valido = ehValido(emailVar, senhaVar);

  if (!valido) {
    return;
  }

  // Informa no console as informações de login do user
  console.log("FORM LOGIN: ", emailVar);
  console.log("FORM SENHA: ", senhaVar);

  // envia os dados do login para o backend para verificar se o email e senha estão corretos
  fetch("/usuarios/autenticar", { // rota do backend para autenticar o usuário
    method: "POST", // método de envio dos dados, nesse caso, POST, pois estamos enviando dados para o backend
    headers: { // cabeçalho da requisição, indicando que o conteúdo é do tipo JSON
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ // corpo da requisição, convertendo os dados para JSON
      emailServer: emailVar, // nome do campo esperado pelo backend, seguido do valor da variável que contém o email do usuário
      senhaServer: senhaVar,
    }),
  }) // se a requisição for bem-sucedida, ou seja, o backend retornar uma resposta, essa função é executada
    .then(function (resposta) { // função para tratar a resposta do backend
      console.log("ESTOU NO THEN DO entrar()!");

      // se a resposta do fetch for "ok", ou seja, o login foi bem-sucedido
      if (resposta.ok) {
        console.log(resposta);

        resposta.json().then((json) => { // converte a resposta do fetch para json, para acessar os dados do usuário
          console.log(json);
          console.log(JSON.stringify(json));
          sessionStorage.EMAIL_USUARIO = json.email;
          sessionStorage.NOME_USUARIO = json.nome;
          sessionStorage.ID_USUARIO = json.idUsuario;

          setTimeout(function () { // aguarda 1 segundo para redirecionar o usuário para a dashboard, para exibir o loading
            window.location = "../HTML/dashboard.html";
          }, 1000); // apenas para exibir o loading
        });

        // essa função é executada caso a resposta do fetch seja "ok" 
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

  // retorna falso para evitar que a página seja recarregada
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
