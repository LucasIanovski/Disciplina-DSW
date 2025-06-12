// O document.addEventListener garante que o código só execute após o carregamento do HTML
document.addEventListener("DOMContentLoaded", () => {
  // const é usada para declarar constantes (valores que não mudam)
  const produtos = [
    { nome: "Notebook Gamer", imagem: "https://via.placeholder.com/300x180", preco: 3500 },
    { nome: "Smartphone", imagem: "https://via.placeholder.com/300x180", preco: 2500 },
    { nome: "Headset", imagem: "https://via.placeholder.com/300x180", preco: 300 },
    { nome: "Teclado Mecânico", imagem: "https://via.placeholder.com/300x180", preco: 500 },
    { nome: "Monitor 4K", imagem: "https://via.placeholder.com/300x180", preco: 2200 },
    { nome: "Cadeira Gamer", imagem: "https://via.placeholder.com/300x180", preco: 800 }
  ];

  // Seleciona o container onde os produtos serão exibidos
  const container = document.getElementById("productContainer");

  // Função que exibe os produtos na tela
  function exibirProdutos(lista) {
    // Limpa o conteúdo atual
    container.innerHTML = "";

    // Para cada produto na lista, cria um card HTML
    lista.forEach(produto => {
      container.innerHTML += `
        <div class="card">
          <img src="${produto.imagem}" alt="${produto.nome}" class="card-img-top" />
          <div class="card-body">
            <h5 class="card-title">${produto.nome}</h5>
            <p>R$ ${produto.preco.toFixed(2)}</p>
            <button class="btn-comprar">Comprar</button>
          </div>
        </div>
      `;
    });
  }

  // Chama a função para mostrar todos os produtos inicialmente
  exibirProdutos(produtos);

  // Adiciona filtro de busca em tempo real
  const inputBusca = document.getElementById("searchInput");
  inputBusca.addEventListener("input", () => {
    const termo = inputBusca.value.toLowerCase();
    const filtrados = produtos.filter(p =>
      p.nome.toLowerCase().includes(termo)
    );
    exibirProdutos(filtrados);
  });
});
