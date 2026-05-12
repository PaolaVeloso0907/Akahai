let listaHerois = [
  {
    nome: `DUKE<br>KAHANAMOKU`,
    img: `<img src="../Assets/Img/memorial/Duke.png" alt="Duke Kahanamoku" class="foto-memorial">`,
    descricao: `foi um nadador olímpico havaiano e é amplamente reconhecido como o <strong>"pai do surfe moderno"</strong>. Nascido em Honolulu, destacou-se por sua habilidade no mar, conquistando cinco medalhas olímpicas (ouro e prata) entre 1912 e 1924, além de popularizar o surfe mundialmente, especialmente nos EUA e Austrália, agindo como um embaixador cultural do Havaí.`,
  },
  {
    nome: `ISABEL<br>LETHAM`,
    img: `<img src="../Assets/Img/memorial/Isabel.png" alt="Isabel Letham" class="foto-memorial">`,
    descricao: `foi uma educadora australiana e é reverenciada como <strong>"uma das pioneiras do surfe na Austrália"</strong>. Em 1915, aos 15 anos, ela surfou nas ondas de Freshwater Beach em uma prancha de madeira ao lado do próprio Duke Kahanamoku, ajudando a introduzir e popularizar o esporte em seu país e abrindo caminho para gerações de mulheres no mar.`,
  },
  {
    nome: `SILVANA<br>LIMA`,
    img: `<img src="../Assets/Img/memorial/Silvana.png" alt="Silvana Lima" class="foto-memorial">`,
    descricao: `é uma atleta cearense e amplamente considerada <strong>"uma das maiores surfistas da história do Brasil"</strong>. Conhecida por seu estilo radical, aéreos inovadores e muita garra, ela superou diversas barreiras financeiras para se tornar octacampeã brasileira, além de representar o país com maestria na elite mundial da WSL e nos Jogos Olímpicos.`,
  },
];

function exibirHeroi(index) {
  let heroiAtual = listaHerois[index];

  if (index == 0) {
    document.getElementById("imgHeroi").innerHTML = heroiAtual.img;
    document.getElementById("nome-heroi").innerHTML = heroiAtual.nome;
    document.getElementById("descricao-heroi").innerHTML = heroiAtual.descricao;
    document.getElementById("verMais").innerHTML = `VER MAIS →`;

  } else if (index == 1) {
    document.getElementById("imgHeroi").innerHTML = heroiAtual.img;
    document.getElementById("nome-heroi").innerHTML = heroiAtual.nome;
    document.getElementById("descricao-heroi").innerHTML = heroiAtual.descricao;
    document.getElementById("verMais").innerHTML = `VER MAIS →`;
  } else if (index == 2) {
    document.getElementById("imgHeroi").innerHTML = heroiAtual.img;
    document.getElementById("nome-heroi").innerHTML = heroiAtual.nome;
    document.getElementById("descricao-heroi").innerHTML = heroiAtual.descricao;
    document.getElementById("verMais").innerHTML = `VER MAIS →`;
  }
}

