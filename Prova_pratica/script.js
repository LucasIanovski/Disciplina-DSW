$(document).ready(function () {
  var produtos = [];

  function exibirProdutos(lista) {
    $("#catalogo").empty();
    $("#total-produtos").text(lista.length);

    for (var i = 0; i < lista.length; i++) {
      var produto = lista[i];

      var card = '<div class="col-md-4 col-lg-3 mb-4">' +
                   '<div class="card h-100">' +
                     '<img src="' + produto.image + '" class="card-img-top" style="height: 200px; object-fit: contain;">' +
                     '<div class="card-body">' +
                       '<h5 class="card-title">' + produto.title + '</h5>' +
                       '<p class="card-text">R$ ' + produto.price.toFixed(2) + '</p>' +
                     '</div>' +
                   '</div>' +
                 '</div>';

      $("#catalogo").append(card);
    }
  }

  // Requisição com jQuery
  $.getJSON("https://fakestoreapi.com/products", function (dados) {
    produtos = dados;
    exibirProdutos(produtos);
  });

  // Campo de busca
  $("#busca").on("input", function () {
    var termo = $(this).val().toLowerCase();
    var filtrados = [];

    for (var i = 0; i < produtos.length; i++) {
      if (produtos[i].title.toLowerCase().indexOf(termo) !== -1) {
        filtrados.push(produtos[i]);
      }
    }

    exibirProdutos(filtrados);
  });

  // Botão de ordenar
  $("#ordenar").on("click", function () {
    var ordenados = produtos.slice(); // cópia do array

    ordenados.sort(function (a, b) {
      return a.price - b.price;
    });

    exibirProdutos(ordenados);
  });
});