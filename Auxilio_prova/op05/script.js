// script.js

// Espera até que todo o HTML esteja carregado para executar o JS
document.addEventListener("DOMContentLoaded", function () {
  // URL da API pública que retorna os produtos
  const apiURL = "https://fakestoreapi.com/products";

  // Array para armazenar os produtos carregados
  let produtos = [];

  // Função para exibir os produtos na tela
  function exibirProdutos(lista) {
    const container = $("#product-grid");
    container.empty(); // Limpa os cards antigos

    // Para cada produto, cria um card Bootstrap
    lista.forEach(produto => {
      const card = `
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
          <div class="card h-100">
            <img src="${produto.image}" class="card-img-top" alt="${produto.title}">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${produto.title}</h5>
              <p class="card-text fw-bold text-primary">R$ ${produto.price.toFixed(2)}</p>
            </div>
          </div>
        </div>
      `;
      container.append(card); // Adiciona o card ao DOM
    });

    // Atualiza os contadores de produtos
    $("#product-count").text(lista.length);
    $("#footer-count").text(lista.length);
  }

  // Função para carregar os produtos via jQuery e $.getJSON()
  function carregarProdutos() {
    $.getJSON(apiURL, function (data) {
      produtos = data; // Salva os produtos em memória
      exibirProdutos(produtos); // Exibe os produtos na tela
    });
  }

  // Filtra os produtos conforme o usuário digita no campo de busca
  $("#search").on("input", function () {
    const termo = $(this).val().toLowerCase();
    const filtrados = produtos.filter(p => p.title.toLowerCase().includes(termo));
    exibirProdutos(filtrados);
  });

  // Ordena os produtos por preço (crescente ou decrescente)
  let ordemCrescente = true;
  $("#sort-price").on("click", function () {
    const ordenados = [...produtos].sort((a, b) =>
      ordemCrescente ? a.price - b.price : b.price - a.price
    );
    ordemCrescente = !ordemCrescente;
    exibirProdutos(ordenados);
  });

  // Inicia o carregamento da página
  carregarProdutos();
});
