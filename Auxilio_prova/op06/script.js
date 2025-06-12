// Aguarda o carregamento completo da página antes de executar o código
$(document).ready(function () {

  // Armazena os produtos da API
  let produtos = [];

  // Função para renderizar os produtos dinamicamente no catálogo
  function renderizarProdutos(lista) {
    $('#catalogo').empty(); // Limpa o conteúdo anterior

    lista.forEach(produto => {
      $('#catalogo').append(`
        <div class="col-sm-6 col-md-4 col-lg-3">
          <div class="card h-100 shadow-sm">
            <img src="${produto.image}" class="card-img-top" alt="${produto.title}">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${produto.title}</h5>
              <p class="card-text fw-bold text-success">R$ ${produto.price.toFixed(2)}</p>
            </div>
          </div>
        </div>
      `);
    });

    // Atualiza o número total de produtos no título e no rodapé
    $('#total-produtos').text(lista.length);
    $('#rodape-total').text(lista.length);
  }

  // Faz a requisição para a API usando $.getJSON()
  $.getJSON('https://fakestoreapi.com/products', function (data) {
    produtos = data; // Armazena os produtos recebidos
    renderizarProdutos(produtos); // Exibe os produtos na tela
  });

  // 🔍 Campo de busca em tempo real
  $('#busca').on('input', function () {
    const termo = $(this).val().toLowerCase();

    const filtrados = produtos.filter(p =>
      p.title.toLowerCase().includes(termo)
    );

    renderizarProdutos(filtrados);
  });

  // 🔽 Botões de ordenação
  $('#ordenar-crescente').click(function () {
    const ordenados = [...produtos].sort((a, b) => a.price - b.price);
    renderizarProdutos(ordenados);
  });

  $('#ordenar-decrescente').click(function () {
    const ordenados = [...produtos].sort((a, b) => b.price - a.price);
    renderizarProdutos(ordenados);
  });

});
