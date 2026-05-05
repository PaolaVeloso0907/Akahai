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


// Função para iniciar o jogo
function iniciar() {
  window.location.href = "../HTML/Quiz/p1.html"; // redireciona o usuário para a página do quiz, onde as questões serão exibidas

  preencherHTMLcomQuestaoAtual(0); // chama a função preencherHTMLcomQuestaoAtual para exibir a primeira questão do quiz, passando o número 0 como parâmetro para indicar que é a primeira questão da lista de questões
}
