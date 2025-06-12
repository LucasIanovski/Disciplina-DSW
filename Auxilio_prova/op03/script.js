// Este bloco só será executado depois que todo o HTML da página for carregado
document.addEventListener("DOMContentLoaded", function () {
  // Aqui declaramos as constantes que irão guardar os elementos do HTML
  // "const" é uma variável que NÃO pode ser reatribuída, é usada para valores fixos

  // Pega a div onde os produtos serão exibidos
  const produtosEl = document.getElementById("produtos");

  // Pega o campo de busca (input)
  const buscaEl = document.getElementById("busca");

  // Pega o botão de ordenação
  const ordenarBtn = document.getElementById("ordenar-preco");

  // Essa variável controla se a ordenação é crescente (true) ou decrescente (false)
  let ordemAscendente = true;

  // Aqui será guardada a lista de produtos vinda da API
  let produtos = [];

  // Faz a requisição dos dados da API (https://fakestoreapi.com/products)
  // fetch() serve para buscar dados externos
  fetch("https://fakestoreapi.com/products")
    .then(res => res.json()) // converte a resposta para JSON
    .then(data => {
      produtos = data; // salva os produtos recebidos
      renderizarProdutos(produtos); // exibe os produtos na tela
    });

  /**
   * Função que recebe uma lista de produtos e monta os cards HTML para cada um
   * @param {Array} lista - lista de produtos a ser exibida
   */
  function renderizarProdutos(lista) {
    produtosEl.innerHTML = ""; // limpa o conteúdo anterior

    lista.forEach(p => {
      // Cria um elemento <div> para representar cada produto
      const col = document.createElement("div");
      col.className = "col-sm-6 col-md-4 col-lg-3 mb-4"; // classes Bootstrap para responsividade

      // Adiciona o conteúdo HTML do card com os dados do produto
      col.innerHTML = `
        <div class="card h-100">
          <img src="${p.image}" class="card-img-top" alt="${p.title}">
          <div class="card-body">
            <h5 class="card-title">${p.title}</h5>
            <div class="card-price">R$ ${p.price.toFixed(2)}</div>
          </div>
        </div>
      `;

      // Adiciona o card à lista de produtos na página
      produtosEl.appendChild(col);
    });
  }

  // Este evento é ativado sempre que o usuário digita algo no campo de busca
  buscaEl.addEventListener("input", function () {
    // Converte o texto digitado para minúsculas para facilitar a comparação
    const termo = this.value.toLowerCase();

    // Filtra os produtos com base no texto digitado
    const filtrados = produtos.filter(p => p.title.toLowerCase().includes(termo));

    // Exibe somente os produtos filtrados
    renderizarProdutos(filtrados);
  });

  // Este evento é ativado quando o botão "Ordenar" é clicado
  ordenarBtn.addEventListener("click", function () {
    // Inverte o estado da ordenação (true vira false e vice-versa)
    ordemAscendente = !ordemAscendente;

    // Muda o texto do botão com base na ordem
    this.textContent = ordemAscendente ? "Ordenar ↑" : "Ordenar ↓";

    // Cria uma nova lista ordenada por preço
    const ordenados = [...produtos].sort((a, b) => {
      // Se for ordem crescente, retorna a - b, senão b - a
      return ordemAscendente ? a.price - b.price : b.price - a.price;
    });

    // Exibe os produtos ordenados
    renderizarProdutos(ordenados);
  });

}); // Fim do DOMContentLoaded
