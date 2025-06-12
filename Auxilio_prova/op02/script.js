document.addEventListener("DOMContentLoaded", function () {
  const produtosEl = document.getElementById("produtos");
  const buscaEl = document.getElementById("busca");
  const ordenarBtn = document.getElementById("ordenar-preco");

  let ordemAscendente = true;
  let produtos = [];

  // Fetch dos produtos
  fetch("https://fakestoreapi.com/products")
    .then(res => res.json())
    .then(data => {
      produtos = data;
      renderizarProdutos(produtos);
    });

  function renderizarProdutos(lista) {
    produtosEl.innerHTML = "";
    lista.forEach(p => {
      const col = document.createElement("div");
      col.className = "col-sm-6 col-md-4 col-lg-3 mb-4";

      col.innerHTML = `
        <div class="card h-100">
          <img src="${p.image}" class="card-img-top" alt="${p.title}">
          <div class="card-body">
            <h5 class="card-title">${p.title}</h5>
            <div class="card-price">R$ ${p.price.toFixed(2)}</div>
          </div>
        </div>
      `;

      produtosEl.appendChild(col);
    });
  }

  // Filtro de busca
  buscaEl.addEventListener("input", function () {
    const termo = this.value.toLowerCase();
    const filtrados = produtos.filter(p => p.title.toLowerCase().includes(termo));
    renderizarProdutos(filtrados);
  });

  // Ordenação por preço
  ordenarBtn.addEventListener("click", function () {
    ordemAscendente = !ordemAscendente;
    this.textContent = ordemAscendente ? "Ordenar ↑" : "Ordenar ↓";

    const ordenados = [...produtos].sort((a, b) => {
      return ordemAscendente ? a.price - b.price : b.price - a.price;
    });

    renderizarProdutos(ordenados);
  });
});
