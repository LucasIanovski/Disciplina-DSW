

//$.getJSON("https://pokeapi.co/api/v2/pokemon?limit=168", function (dados) {
  //  for (let item of dados.results) {
   //     $.getJSON(item.url, function (pokemon) {
            // criação da tabela 
    //        const linha = `
     //   <tr> 
    //      <td>${pokemon.id}</td>
     //      <td>${pokemon.name}</td>
     //      <td><img src="${pokemon.sprites.front_default}" alt="${pokemon.name}"></td>
     //      <td>${pokemon.height}</td>
     //      <td>${pokemon.weight}</td>
     //      <td>${pokemon.species.name}</td>
      //   </tr>
     //  `;

      // Adicionando os pokemons na tabela ordenando na linha 
     //  document.getElementById("tabela-pokemon").innerHTML += linha;

      //   });
  //   }
// });


// código resolvido
// Número de pokémons que vão aparecer por página
const pokemonsPorPagina = 10;

// Total de pokémons que a gente vai usar no projeto (do 1 até o 168)
const totalPokemons = 168;

// Total de páginas que vai dar. Por exemplo, 168 pokémons em grupos de 10 dá 17 páginas
const totalPaginas = Math.ceil(totalPokemons / pokemonsPorPagina);

// Função que carrega os pokémons de uma página específica
function carregarPagina(pagina) {
  // Calcula o deslocamento (offset) baseado na página. Ex: página 2 começa no 11º Pokémon
  const offset = (pagina - 1) * pokemonsPorPagina;

  // URL da API com os parâmetros de limite (10) e offset (qual parte da lista pegar)
  const url = `https://pokeapi.co/api/v2/pokemon?limit=${pokemonsPorPagina}&offset=${offset}`;

  // Limpa a tabela (remove pokémons antigos antes de mostrar os novos)
  $("#tabela-pokemon").html("");

  // Faz uma requisição (chamada) para pegar os pokémons dessa página
  $.getJSON(url, function (dados) {

    // Para cada pokémon retornado, a gente faz outra requisição pra pegar os detalhes
    for (let item of dados.results) {
      
      $.getJSON(item.url, function (pokemon) {

        // Cria uma linha da tabela com os dados do pokémon
        const linha = `
          <tr> 
            <td>${pokemon.id}</td>
            <td>${pokemon.name}</td>
            <td><img src="${pokemon.sprites.front_default}" alt="${pokemon.name}"></td>
            <td>${pokemon.height}</td>
            <td>${pokemon.weight}</td>
            <td>${pokemon.species.name}</td>
          </tr>
        `;

        // Adiciona essa linha na tabela (no final da tabela que está no HTML)
        $("#tabela-pokemon").append(linha);
      });
    }
  });
}

// Função que cria os botões de páginas (de 1 até 17)
function criarPaginacao() {
  for (let i = 1; i <= totalPaginas; i++) {

    // Cria um botão com o número da página (ex: 1, 2, 3...)
    const botao = $(`
      <li class="page-item">
        <a class="page-link" href="#">${i}</a>
      </li>
    `);

    // Quando o botão for clicado
    botao.on("click", function (e) {
      e.preventDefault(); // impede o navegador de recarregar a página
      carregarPagina(i); // carrega os pokémons daquela página
      $(".page-item").removeClass("active"); // remove a marcação de "botão ativo" de todos
      $(this).addClass("active"); // coloca a marcação de "ativo" no botão clicado
    });

    // Adiciona o botão na parte de navegação (onde estão os números das páginas)
    $("#paginacao").append(botao);
  }
}

// Quando a página carregar...
$(document).ready(function () {
  criarPaginacao();     // cria os botões de páginas
  carregarPagina(1);    // mostra os primeiros 10 pokémons
  $("#paginacao li:first-child").addClass("active"); // marca o botão "1" como ativo
});
