function buscarQuiz() {
  fetch("/usuarios/buscar-quiz", {
    method: "GET", // get -> quando a gente nao envia 'body'
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (resposta) {
      if (resposta.ok) {
        resposta.json().then((res) => {
          criarGraficos(res);
        });
      } else {
        alert("Ocorreu um erro e os resultados não foram buscados!");
      }
    }) // essa função é executada caso haja erros na comunicação com o backend
    .catch(function (erro) {
      console.log(erro);
    });
}

function criarGraficos(data) {
// Variáveis para armazenar os dados dos gráficos
  let surfistasDeAlma = 0;

  let totalSurfistas = [];
  let totalHaoles = [];

  let qtdErros = [0, 0, 0, 0, 0];
  let listaAcertosSurfistas = [0, 0, 0, 0, 0];
  let listaAcertosHaoles = [0, 0, 0, 0, 0];


// ------------------------------------------------------------------------
// verificando quais usuários são surfistas e quais são haoles, para calcular o total de cada perfil e exibir no gráfico de donut
  for (let i = 0; i < data.length; i++) {
    if (
      data[i].perfil == "Sim" &&
      !totalSurfistas.includes(data[i].fkUsuario)
    ) {
      totalSurfistas.push(data[i].fkUsuario);
    } else if (
      data[i].perfil == "Nao" &&
      !totalHaoles.includes(data[i].fkUsuario)
    ) {
      totalHaoles.push(data[i].fkUsuario);
    }

    if (
      data[i].acertouQ1 == 1 &&
      data[i].acertouQ2 == 1 &&
      data[i].acertouQ3 == 1 &&
      data[i].acertouQ4 == 1 &&
      data[i].acertouQ5 == 1
    ) {
      surfistasDeAlma++;
    }


// ------------------------------------------------------------------------
// verificando a quantidade de acertos e erros de cada questão, para cada perfil
    if (data[i].acertouQ1 == 0) {
      qtdErros[1]++;
    } else {
      if (data[i].perfil == "Sim") {
        listaAcertosSurfistas[0]++;
      } else {
        listaAcertosHaoles[0]++;
      }
    }

    if (data[i].acertouQ2 == 0) {
      qtdErros[2]++;
    } else {
      if (data[i].perfil == "Sim") {
        listaAcertosSurfistas[1]++;
      } else {
        listaAcertosHaoles[1]++;
      }
    }

    if (data[i].acertouQ3 == 0) {
      qtdErros[3]++;
    } else {
      if (data[i].perfil == "Sim") {
        listaAcertosSurfistas[2]++;
      } else {
        listaAcertosHaoles[2]++;
      }
    }

    if (data[i].acertouQ4 == 0) {
      qtdErros[3]++;
    } else {
      if (data[i].perfil == "Sim") {
        listaAcertosSurfistas[3]++;
      } else {
        listaAcertosHaoles[3]++;
      }
    }

    if (data[i].acertouQ5 == 0) {
      qtdErros[4]++;
    } else {
      if (data[i].perfil == "Sim") {
        listaAcertosSurfistas[4]++;
      } else {
        listaAcertosHaoles[4]++;
      }
    }
  }

// ------------------------------------------------------------------------
  // verificando qual é a questão mais errada pelos usuários
  let questaoMaisErrada = qtdErros[0];

  for (let i = 0; i < qtdErros.length; i++) {
    if (questaoMaisErrada <= qtdErros[i]) {
      questaoMaisErrada = qtdErros[i];
      questaoMaisErradaTitulo = "QUESTÃO " + (i + 1)
    }
  }
  let porcentagemErro = 100 * questaoMaisErrada / data.length;


// ------------------------------------------------------------------------
  // Exibindo o total de respostas enviadas ao site
  let totalRespostas = document.getElementById("numero-centro");
  totalRespostas.innerHTML = totalSurfistas.length + totalHaoles.length;

  // Exibindo todos os usuarios
  let surfistasDeAlmaElement = document.getElementById("surfistasDeAlma");
  surfistasDeAlmaElement.innerHTML = surfistasDeAlma + " USUÁRIOS";

  // Exibindo a questão com maior índice de erros
  let questaoComMaisErros = document.getElementById("questaoComMaisErros");
  questaoComMaisErros.innerHTML = questaoMaisErradaTitulo;
  // Exibindo a porcentagem agora
  let porcentagemErroElement = document.getElementById("porcentoErro");
  porcentagemErroElement.innerHTML = porcentagemErro.toFixed(0) + '% de erro';

  // Exibindo a quantidade de respostas enviadas ao site
  let qtdRespostas = document.getElementById("qtdRespostas");
  qtdRespostas.innerHTML = data.length;


// ------------------------------------------------------------------------
  // GRÁFICO BARRAS
  const grfBarra = document.getElementById("graficoBarras");

  new Chart(grfBarra, {
    type: "bar",

    data: {
      labels: ["Questão 1", "Questão 2", "Questão 3", "Questão 4", "Questão 5"],

      datasets: [
        {
          // Barra 1
          label: "Surfistas",
          data: listaAcertosSurfistas,
          backgroundColor: "#C79F61",
          borderRadius: 10,
        },
        {
          // Barra 2
          label: "Haoles",
          data: listaAcertosHaoles,
          backgroundColor: "#536267",
          borderRadius: 10,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          align: "end",
          position: "top",
          labels: {
            color: "#000",
            font: { family: "Montserrat", weight: "600" },
            usePointStyle: true,
            pointStyle: "circle",
          },
        },
        title: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: "rgba(199, 159, 97, 0.2)" },
        },
        x: {
          grid: { display: true },
        },
      },
    },
  });
  //-----------------------------------------------------------------------
  // GRÁFICO DONUT
  const grfDonut = document.getElementById("graficoDonut");

  new Chart(grfDonut, {
    type: "doughnut",
    data: {
      labels: ["Surfistas", "Haoles"],
      datasets: [
        {
          data: [totalSurfistas.length, totalHaoles.length],
          backgroundColor: ["#C79F61", "#536267"],
          borderWidth: 0,
          font: "Montserrat",
        },
      ],
    },
    options: {
      cutout: "80%",
      responsive: true,
      maintainAspectRatio: false,

      plugins: {
        title: {
          display: false,
        },
        legend: {
          position: "bottom",
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                usePointStyle: true,
                pointStyle: "circle",
                font: { family: "Montserrat", weight: "600" },
              },
            },
          },
        },
      },
    },
  });
}
