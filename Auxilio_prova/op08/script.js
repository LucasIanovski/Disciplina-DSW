// script.js - CineVerse
$(document).ready(function () {
  const API_KEY = 'demo'; // substitua pela sua key real se tiver

  let filmes = [];
  let crescente = true;

  function exibirFilmes(lista) {
    $('#moviesContainer').empty();
    $('#totalMovies').text(`Total de filmes encontrados: ${lista.length}`);
    lista.forEach(filme => {
      $('#moviesContainer').append(`
        <div class="col-sm-6 col-md-4 col-lg-3 mb-4">
          <div class="card movie-card h-100">
            <img src="${filme.Poster}" class="card-img-top" alt="${filme.Title}">
            <div class="card-body">
              <h5 class="card-title">${filme.Title}</h5>
              <p class="card-text">Ano: ${filme.Year}</p>
            </div>
          </div>
        </div>
      `);
    });
  }

  function buscarFilmes(titulo) {
    $.getJSON(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${titulo}`, function (dados) {
      if (dados.Response === "True") {
        filmes = dados.Search;
        exibirFilmes(filmes);
      } else {
        $('#moviesContainer').html('<p class="text-danger text-center">Nenhum filme encontrado.</p>');
        $('#totalMovies').text('Total de filmes encontrados: 0');
      }
    });
  }

  $('#searchButton').on('click', function () {
    const titulo = $('#searchInput').val();
    if (titulo.length >= 3) {
      buscarFilmes(titulo);
    } else {
      alert('Digite pelo menos 3 letras para buscar um filme.');
    }
  });

  $('#sortButton').on('click', function () {
    if (filmes.length === 0) return;

    filmes.sort((a, b) => crescente ? a.Year - b.Year : b.Year - a.Year);
    exibirFilmes(filmes);
    $(this).text(`Ordenar por Ano ${crescente ? '⬇️' : '⬆️'}`);
    crescente = !crescente;
  });

  buscarFilmes('Batman');
});
