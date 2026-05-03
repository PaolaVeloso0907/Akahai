let listaDeQuestoes = [
  {
    pergunta: "O que a saudação havaiana 'Aloha' realmente significa?",
    alternativaA: "<img src='../../Assets/Img/jogo/p1/a-p1.png'>",
    alternativaB: "<img src='../../Assets/Img/jogo/p1/b-p1.png'>",
    alternativaC: "<img src='../../Assets/Img/jogo/p1/c-p1.png'>",
    alternativaD: "<img src='../../Assets/Img/jogo/p1/d-p1.png'>",
    alternativaCorreta: "alternativaC",
  },
  {
    pergunta:
      "O que o famoso gesto com a mão 'Shaka' (o famoso Hang Loose) transmite?",
    alternativaA: "<img src='../../Assets/Img/jogo/p2/a-p2.png'>",
    alternativaB: "<img src='../../Assets/Img/jogo/p2/b-p2.png'>",
    alternativaC: "<img src='../../Assets/Img/jogo/p2/c-p2.png'>",
    alternativaD: "<img src='../../Assets/Img/jogo/p2/d-p2.png'>",
    alternativaCorreta: "alternativaB",
  },
  {
    pergunta:
      "Qual é o significado da palavra 'Akahai', que dá nome ao projeto?",
    alternativaA: "<img src='../../Assets/Img/jogo/p3/a-p3.png'>",
    alternativaB: "<img src='../../Assets/Img/jogo/p3/b-p3.png'>",
    alternativaC: "<img src='../../Assets/Img/jogo/p3/c-p3.png'>",
    alternativaD: "<img src='../../Assets/Img/jogo/p3/d-p3.png'>",
    alternativaCorreta: "alternativaC",
  },
  {
    pergunta:
      "Qual é a tradução literal do termo ancestral havaiano 'He'e nalu'?",
    alternativaA: "<img src='../../Assets/Img/jogo/p4/a-p4.png'>",
    alternativaB: "<img src='../../Assets/Img/jogo/p4/b-p4.png'>",
    alternativaC: "<img src='../../Assets/Img/jogo/p4/c-p4.png'>",
    alternativaD: "<img src='../../Assets/Img/jogo/p4/d-p4.png'>",
    alternativaCorreta: "alternativaB",
  },
  {
    pergunta:
      "O que significa a gíria brasileira para 'surfista prego'?",
    alternativaA: "<img src='../../Assets/Img/jogo/p5/a-p5.png'>",
    alternativaB: "<img src='../../Assets/Img/jogo/p5/b-p5.png'>",
    alternativaC: "<img src='../../Assets/Img/jogo/p5/c-p5.png'>",
    alternativaD: "<img src='../../Assets/Img/jogo/p5/d-p5.png'>",
    alternativaCorreta: "alternativaA",
  },
];
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// variáveis globais    
    let numeroDaQuestaoAtual = 0
    let pontuacaoFinal = 0
    let tentativaIncorreta = 0
    let certas = 0
    let erradas = 0
    let quantidadeDeQuestoes = listaDeQuestoes.length
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Função para iniciar o jogo
function iniciar() {
  window.location.href = "../HTML/Quiz/p1.html"; // redireciona o usuário para a página do quiz, onde as questões serão exibidas

  preencherHTMLcomQuestaoAtual(0); // chama a função preencherHTMLcomQuestaoAtual para exibir a primeira questão do quiz, passando o número 0 como parâmetro para indicar que é a primeira questão da lista de questões
}
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Função para preencher o HTML com a questão atual
function preencherHTMLcomQuestaoAtual(index) { // recebe o index da questão a ser exibida
  let questaoAtual = listaDeQuestoes[index]; // recupera a questão atual da lista de questões usando o index recebido como parâmetro
  numeroDaQuestaoAtual = index; // atualiza a variável global para refletir o número da questão atual, garantindo que o estado do jogo esteja sincronizado com a questão exibida

  document.getElementById("spanNumeroDaQuestaoAtual").innerHTML = Number(index) + 1; // exibe o número da questão atual (index + 1 para exibir a contagem a partir de 1 em vez de 0)
  document.getElementById("spanQuestaoExibida").innerHTML = questaoAtual.pergunta; // exibe a pergunta da questão atual no elemento HTML com o id "spanQuestaoExibida"
  document.getElementById("labelOpcaoUm").innerHTML = questaoAtual.alternativaA; // exibe a alternativa A da questão atual no elemento HTML com o id "labelOpcaoUm"
  document.getElementById("labelOpcaoDois").innerHTML = questaoAtual.alternativaB; // exibe a alternativa B da questão atual no elemento HTML com o id "labelOpcaoDois"
  document.getElementById("labelOpcaoTres").innerHTML = questaoAtual.alternativaC; // exibe a alternativa C da questão atual no elemento HTML com o id "labelOpcaoTres"
  document.getElementById("labelOpcaoQuatro").innerHTML = questaoAtual.alternativaD; // exibe a alternativa D da questão atual no elemento HTML com o id "labelOpcaoQuatro" 
}
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Função para avançar para a próxima questão
function avancar() {
  desmarcarRadioButtons(); // desmarca os radio buttons para a próxima questão

  if (numeroDaQuestaoAtual < quantidadeDeQuestoes - 1) { // verifica se ainda há questões restantes para avançar
    preencherHTMLcomQuestaoAtual(numeroDaQuestaoAtual); // preenche o HTML com a questão atual usando a função preencherHTMLcomQuestaoAtual, passando o número da questão atual como parâmetro para exibir a próxima questão
  } else {
    finalizarJogo(); // se não houver mais questões, chama a função finalizarJogo para encerrar o jogo e exibir os resultados finais
  }
}
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Função para limpar as classes de cor de fundo das opções
function desmarcarRadioButtons() { // desmarca os radio buttons para a próxima questão
  const options = document.getElementsByName("option"); // recupera as opções de resposta (radio buttons) do HTML usando o nome "option"
  for (let i = 0; i < options.length; i++) { // itera sobre as opções de resposta usando um loop for
    options[i].checked = false; // desmarca a opção de resposta atual, garantindo que nenhuma opção esteja selecionada para a próxima questão
  }
}


