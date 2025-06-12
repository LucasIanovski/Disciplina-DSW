// Espera o DOM estar carregado
$(document).ready(function () {
  // Lista de produtos original
  let allProducts = [];
  // Variável para controlar ordenação
  let ascending = true;

  // Função para exibir os produtos na tela
  function renderProducts(products) {
    const container = $('#productList'); // seleciona o container
    container.empty(); // limpa o conteúdo anterior

    // Atualiza o contador de produtos
    $('#productCount').text(products.length);

    // Para cada produto na lista recebida
    products.forEach(product => {
      // Cria a estrutura de colunas Bootstrap
      const card = `
        <div class="col-sm-12 col-md-6 col-lg-4 mb-4">
          <div class="card h-100">
            <img src="${product.image}" class="card-img-top" alt="${product.title}">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${product.title}</h5>
              <p class="card-text text-success fw-bold">$${product.price.toFixed(2)}</p>
            </div>
          </div>
        </div>
      `;
      // Adiciona o card ao container
      container.append(card);
    });
  }

  // Função para buscar dados da API
  $.getJSON('https://fakestoreapi.com/products', function (data) {
    allProducts = data; // salva todos os produtos
    renderProducts(allProducts); // renderiza na tela
  });

  // Campo de busca por nome
  $('#searchInput').on('input', function () {
    const search = $(this).val().toLowerCase(); // texto digitado
    const filtered = allProducts.filter(product =>
      product.title.toLowerCase().includes(search)
    );
    renderProducts(filtered); // atualiza a exibição
  });

  // Botão de ordenação por preço
  $('#sortButton').on('click', function () {
    ascending = !ascending; // alterna entre crescente/decrescente

    const sorted = [...allProducts].sort((a, b) => {
      return ascending ? a.price - b.price : b.price - a.price;
    });

    // Altera o texto do botão
    $(this).text(`Ordenar por Preço ${ascending ? '⬆️' : '⬇️'}`);
    renderProducts(sorted);
  });
});
