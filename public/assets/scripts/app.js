const URL = "http://localhost:3000";

// Logo

function CarregarLogo() {
  const logo = document.getElementById("logo");
  if (!logo) return;
  logo.innerHTML = `
    <div id="container-logo">
      <a href="index.html">
        <img src="assets/img/logoVanGog.png" alt="Van Gogh Logo" class="img-fluid">
        <a href="cadastro.html"><button  id="adicionar"class="btn btn-outline-primary">Cadastro de obras</button></a>
    </div>
  `;
}

//Método auxiliar para obter a url

async function GetObras(endpoint) {
  try {
    const resposta = await fetch(`${URL}/${endpoint}`);
    const dados = await resposta.json();
    return dados;
  } catch (error) {
    console.error(`Erro ao buscar ${endpoint}:`, error);
  }
}

// Página principal

//Método Get

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
        <button onclick="buscarObras('${obra.id}')" class="btn btn-outline-primary mt-2">Ver mais</button>
          
      </article>`;
  });
  tela.innerHTML = strTexto;
}


function buscarObras(id) {
  window.location.href = `detalhes.html?id=${id}`;
}


//pagina detalhes

async function ListarObraDetalhes() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
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
    `
    ;

    
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


// bloco de cadastrar
function CarregarCadastroObras() {
  const area = document.getElementById("cadastro_section");
  if (!area) return;

  area.innerHTML = `
    <div class="col-12 mb-5">
      <div class="p-4 shadow bg-light rounded">
        <h2 class="text-center mb-4">Cadastro de Obras</h2>
        <form id="formCadastro">
          <div class="form-group">
            <label for="tituloC">Título da obra:</label>
            <input type="text" class="form-control" id="tituloC" placeholder="Digite o título" required>
          </div>
          <div class="form-group">
            <label for="descricaoBC">Breve descrição:</label>
            <input type="text" class="form-control" id="descricaoBC" placeholder="Digite uma breve descrição" required>
          </div>
          <div class="form-group">
            <label for="descricaoCC">Descrição completa:</label>
            <textarea class="form-control" id="descricaoCC" rows="3" placeholder="Digite uma descrição detalhada" required></textarea>
          </div>
          <div class="form-group">
            <label for="anoC">Ano da obra:</label>
            <input type="number" class="form-control" id="anoC" placeholder="Ex: 2024" required>
          </div>
          <div class="form-group">
            <label for="imagemC">Imagem principal:</label>
            <input type="text" class="form-control" id="imagemC" placeholder="Acrescente o URL">
          </div>
          <button type="button" id="adicionarC" class="btn btn-success btn-block mt-3">Enviar</button>
        </form>
      </div>
    </div>
  `;
  document.getElementById("adicionarC")?.addEventListener("click", AdicionarObras);
}


// bloco de alterar
function CarregarAlterarObras() {
  const area = document.getElementById("alterar_section");
  if (!area) return;

  area.innerHTML = `
    <div class="col-12 mb-5 ">
      <div class="p-4 shadow bg-light rounded">
        <h2 class="text-center mb-4">Alterar Obras</h2>
        <form id="formAlterar">
          <div class="form-group">
            <label for="idObraA">ID da obra:</label>
            <input type="text" class="form-control" id="idObraA" placeholder="Digite o ID da obra" required>
          </div>
          <div class="form-group">
            <label for="tituloA">Título da obra:</label>
            <input type="text" class="form-control" id="tituloA" placeholder="Digite o título" required>
          </div>
          <div class="form-group">
            <label for="descricaoBA">Breve descrição:</label>
            <input type="text" class="form-control" id="descricaoBA" placeholder="Digite uma breve descrição">
          </div>
          <div class="form-group">
            <label for="descricaoCA">Descrição completa:</label>
            <textarea class="form-control" id="descricaoCA" rows="3" placeholder="Digite uma descrição detalhada"></textarea>
          </div>
          <div class="form-group">
            <label for="anoA">Ano da obra:</label>
            <input type="number" class="form-control" id="anoA" placeholder="Ex: 2024" required>
          </div>
          <div class="form-group">
            <label for="imagemA">Imagem:</label>
            <input type="text" class="form-control" id="imagemA" placeholder="Acrescente o URL">
          </div>
          <button onclick="AlterarObras()" type="button" class="btn btn-warning btn-block mt-3">Alterar</button>
        </form>
      </div>
    </div>
  `;
}


// bloco de Excluir
function CarregarExcluirObras() {
  const area = document.getElementById("excluir_section");
  if (!area) return;

  area.innerHTML = `
   <div class="col-12 ">
      <div class="p-4 shadow bg-light rounded">
        <h2 class="text-center mb-4">Excluir Obra</h2>
        <form id="formExcluir">
          <div class="form-group">
            <label for="idExcluir">ID da obra:</label>
            <input type="text" class="form-control" id="idExcluir" placeholder="Digite o ID da obra" required>
          </div>
          <button onclick="DeletarObras()" type="button" class="btn btn-danger btn-block mt-3">Excluir</button>
        </form>
      </div>
    </div>
  `;
}

function MontarPaginaCadastro() {
  CarregarCadastroObras();
  CarregarAlterarObras();
  CarregarExcluirObras();
}


if (window.location.pathname.includes("cadastro.html")) {
  MontarPaginaCadastro();
}


  //Carrousel destaques

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


//Cabeçalho


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
 
  criarFooter();
}



 // metodo post

async function AdicionarObras() {
   titulo = document.getElementById("tituloC").value.trim();
   descricaoB = document.getElementById("descricaoBC").value.trim();
   descricaoC = document.getElementById("descricaoCC").value.trim();
   ano = document.getElementById("anoC").value.trim();
  imagemInput = document.getElementById("imagemC").value.trim();
  


  if (!titulo || !descricaoB || !descricaoC || !ano) {
    alert("Preencha todos os campos obrigatórios.");
    return;
  }
  
  if (!imagemInput ) {
     imagemInput = "assets/img/sem-imagem.png";
  }



  const novaObra = {
    titulo: titulo,
    descricao: descricaoB,
    descricaoCompleta: descricaoC,
    ano: ano,
    imagem: imagemInput 
  };

  try {
    const resposta = await fetch("http://localhost:3000/obras", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novaObra)
    });

     const obraCriada = await resposta.json();


    alert("Obra alterada com sucesso!");
     

    document.getElementById("formCadastro").reset(); 
     await ListarObras();
  } catch (erro) {
    console.error("Erro ao cadastrar obra:", erro);
    alert("Erro ao cadastrar obra.");
  }
}

const botaoAdicionar = document.getElementById("adicionarC");
if (botaoAdicionar) {
  botaoAdicionar.addEventListener("click", AdicionarObras);
}



// metodo put

async function AlterarObras() {
   id = document.getElementById("idObraA").value.trim();
   titulo = document.getElementById("tituloA").value.trim();
   descricaoB = document.getElementById("descricaoBA").value.trim();
   descricaoC = document.getElementById("descricaoCA").value.trim();
   ano = document.getElementById("anoA").value.trim();
  imagemInput = document.getElementById("imagemA").value.trim();



 
 if (!imagemInput) {
     imagemInput = "assets/img/sem-imagem.png";
  }



  if (!titulo || !descricaoB || !descricaoC || !ano) {
    alert("Preencha todos os campos obrigatórios.");
    return;
  }

  const novaObra = {
    id: id,
    titulo: titulo,
    descricao: descricaoB,
    descricaoCompleta: descricaoC,
    ano: ano,
    imagem: imagemInput
  };

    const resposta = await fetch(`http://localhost:3000/obras/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novaObra)
    });

    if (!resposta.ok) throw new Error("Erro no PUT");
    alert("Obra alterada com sucesso!");
    document.getElementById("formAlterar").reset(); 
    await ListarObras();

}





// delete
async function DeletarObras() {
  const id = document.getElementById("idExcluir").value.trim();
  if (!id) {
    alert("Informe o ID da obra para excluir.");
    return;
  }
    const resposta = await fetch(`${URL}/obras/${id}`, { method: "DELETE" });

    if (resposta.ok) {
      alert("Obra excluída com sucesso!");
      document.getElementById("formExcluir").reset();
    } else {
      alert("Não foi possível excluir. Verifique se o ID existe.");
    }

 
}










  

