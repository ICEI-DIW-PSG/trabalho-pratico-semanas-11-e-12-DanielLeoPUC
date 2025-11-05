const URL = "http://localhost:3000";


async function GetObras(endpoint) {
  try {
    const resposta = await fetch(`${URL}/${endpoint}`);
    const dados = await resposta.json();
    return dados;
  } catch (error) {
    console.error(`Erro ao buscar ${endpoint}:`, error);
  }
}


async function ListarObras() {
  const obras = await GetObras("obras");
  const tela = document.getElementById("tela");
  if (!tela) return;

  let strTexto = "";
  obras.forEach(obra => {
    strTexto += `
      <article class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 text-center border border-light p-2">
        <img src="${obra.imagem}" alt="${obra.titulo}" class="img-fluid mb-2">
        <h2>${obra.titulo}</h2>
        <p>${obra.descricao}</p>
        <button onclick="buscarObras(${obra.id})" class="btn btn-outline-primary mt-2">Ver mais</button>
      </article>`;
  });
  tela.innerHTML = strTexto;
}


function buscarObras(id) {
  window.location.href = `detalhes.html?id=${id}`;
}

async function ListarObraDetalhes() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));
  const obras = await GetObras("obras");
  const obra = obras.find(a => a.id == id);

  const telaDetalhes = document.getElementById("teladetalhes");
  if (!telaDetalhes) return;

  if (obra) {
    telaDetalhes.innerHTML = `
      <div class="col-12 text-center">
        <img src="${obra.imagem}" alt="${obra.titulo}" width="400px" height="400px" class="img-fluid mb-3 p-3">
        <h2>${obra.titulo}</h2>
        <p><strong>Descrição:<br></strong>${obra.descricao}</p>
        <p><strong>Ano de Criação:<br></strong>${obra.ano}</p>
        <p><strong>História:<br></strong>${obra.descricaoCompleta}</p>
      </div>
    `;


    CarregarEntidadeSecundaria(obra.fotos);


    CarregarLogo();
  } else {
    telaDetalhes.innerHTML = `<p>ERRO 404 — página não encontrada</p>`;
  }
}


function CarregarEntidadeSecundaria(fotos) {
  const entidadeSecundaria = document.getElementById("entidadeSecundaria");
  if (!entidadeSecundaria) return;

  if (!fotos || fotos.length === 0) {
    entidadeSecundaria.innerHTML = "<p>Nenhuma foto disponível.</p>";
    return;
  }

  let strTexto = "";
  for (let i = 0; i < fotos.length; i++) {
    strTexto += `
      <article class="col-12 col-sm-6 col-md-3 col-lg-3 col-xl-3 text-center mt-10 p-2">
        <img src="${fotos[i].imagem}" alt="${fotos[i].titulo}" class="img-fluid mb-2">
        <h6>${fotos[i].titulo}</h6>
        <p>${fotos[i].descricao}</p>
      </article>`;
  }

  entidadeSecundaria.innerHTML = strTexto;
}

function CarregarLogo() {
  const logo = document.getElementById("logo");
  if (!logo) return;
  logo.innerHTML = `
    <div id="container-logo">
      <a href="index.html">
        <img src="assets/img/logoVanGog.png" alt="Van Gogh Logo" class="img-fluid">
      </a>
    </div>
  `;
}


async function carregarCarrousel() {
  try {
    const carrousel = await GetObras("carrousel");
    const car = document.getElementById("carrousel");
    if (!car) return;


    let strTexto = `
      <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
          ${carrousel
            .map(
              (_, i) => `
            <li data-target="#carouselExampleIndicators"
                data-slide-to="${i}"
                ${i === 0 ? 'class="active"' : ''}></li>`
            )
            .join("")}
        </ol>
        <div class="carousel-inner">
    `;


    carrousel.forEach((obra, indice) => {
      const ativo = indice === 0 ? "active" : "";
      strTexto += `
        <div class="carousel-item ${ativo}">
          <a href="detalhes.html?id=${obra.id}"><img class="d-block w-100" src="${obra.imagem}" alt="${obra.titulo}"><a>
          <div class="carousel-caption d-none d-md-block">
            <h5>${obra.titulo}</h5>
            <p>${obra.descricao}</p>
          </div>
        </div>`;
    });


    strTexto += `
        </div>
        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Anterior</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Próximo</span>
        </a>
      </div>
    `;


    car.innerHTML = strTexto;
  } catch (error) {
    console.error("Erro ao carregar o carrossel:", error);
  }
}





async function criarFooter() {
  const cabecalho = await GetObras("cabecalho");
  const f = document.getElementById("footer");
  if (!f || !cabecalho || cabecalho.length === 0) return;

  const dados = cabecalho[0];
  let strTexto = `
    <article class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-8">
      <h3>Sobre mim</h3>
      <p>${dados.sobre}</p>
    </article>
    <article class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4">
      <img src="${dados.imagem}" alt="Foto do autor" class="img-fluid mb-2 rounded-circle">
      <p><strong>Aluno:</strong> ${dados.nome}<br>
      <strong>Curso:</strong> ${dados.curso}<br>
      <strong>Turno:</strong> ${dados.turno}</p>
      <h6><strong>Redes Sociais:</strong></h6>
      <p id="icons">
        <i class="fab fa-facebook"></i>
        <i class="fab fa-github"></i>
        <i class="fab fa-linkedin"></i>
      </p>
    </article>
  `;
  f.innerHTML = strTexto;
}

if (document.getElementById("tela")) {
  ListarObras();
  carregarCarrousel();
  criarFooter();
  CarregarLogo();
}

if (document.getElementById("teladetalhes")) {
  ListarObraDetalhes();
  criarFooter();
}
