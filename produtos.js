document.addEventListener("DOMContentLoaded", () => {
  const lista = document.getElementById("product-list");

  // Lista de produtos
  const produtos = [
    {
      imagem: "./images/Produto1.jpeg",
      nome: "Bebê Reborn",
      descricao: "Uma criança que você não tera nenhum trabalho para cuidar.",
      preco: "R$ 129,90",
      detalhes: "O Bebê Reborn é feito com silicone e roupas costuradas à mão. Ideal para presentes ou colecionadores.",
    },
    {
      imagem: "./images/Produto2.jpg",
      nome: "Fraldas Pampers",
      descricao: "Fraldas para o seu Bebê Reborn sempre ficar limpinho.",
      preco: "R$ 79,90",
      detalhes: "Contém 138 unidades. Conforto seco garantido por até 12h.",
    },
    {
      imagem: "./images/Produto3.png",
      nome: "Sapatênis",
      descricao: "Sapatênis tamanho 38 para ficar muito no estilo.",
      preco: "R$ 90,00",
      detalhes: "Confeccionado em material sintético de alta qualidade, com palmilha macia e solado antiderrapante para máximo conforto e segurança.",
    },
    {
      imagem: "./images/Produto4.jpg",
      nome: "Boné do PT",
      descricao: "Compre este boné do PT para estar sempre apoiando nosso querido presidente.",
      preco: "R$ 13,13",
      detalhes: "Boné ajustável com estampa bordada em destaque, feito em algodão resistente para garantir estilo e durabilidade no apoio ao seu partido.",
    },
    {
      imagem: "./images/Produto5.jpeg",
      nome: "Tapete da MC Pipokinha",
      descricao: "Esse tapete impede de suas visitas chegarem na sua casa e falar mal da pipokinha.",
      preco: "R$ 69,00",
      detalhes: "Tapete em tecido antiderrapante, com estampa ousada e divertida da MC Pipokinha. Ideal para quem quer recepcionar as visitas com muito estilo (e um toque de polêmica).",
    }
  ];

  // Criação dos cards de produto
  produtos.forEach(produto => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}">
      <h2>${produto.nome}</h2>
      <p>${produto.descricao}</p>
      <span class="price">${produto.preco}</span>
      <button type="button" class="btn-comprar">Comprar</button>
    `;

    const button = card.querySelector(".btn-comprar");
    button.addEventListener("click", () => {
      abrirPopup(produto);
    });

    lista.appendChild(card);
  });

  // Função do primeiro pop-up (escolha de quantidade)
  function abrirPopup(produto) {
    const popup = document.createElement("div");
    popup.className = "popup-overlay";
    popup.innerHTML = `
      <div class="popup-content">
        <span class="popup-close">&times;</span>
        <img src="${produto.imagem}" alt="${produto.nome}">
        <h2>${produto.nome}</h2>
        <p>${produto.descricao}</p>
        <p><strong>Mais detalhes:</strong> ${produto.detalhes}</p>
        <span class="price">${produto.preco}</span>

        <label for="quantidade">Quantidade:</label>
        <input type="number" id="quantidade" min="1" value="1">

        <button type="button" class="btn-popup-comprar">Comprar</button>
      </div>
    `;

    document.body.appendChild(popup);

    // Fechar pop-up
    popup.querySelector(".popup-close").addEventListener("click", () => {
      popup.remove();
    });

    // Evento do botão "Comprar" dentro do pop-up
    popup.querySelector(".btn-popup-comprar").addEventListener("click", () => {
      const quantidade = parseInt(popup.querySelector("#quantidade").value) || 1;
      popup.remove();
      abrirResumoFinal(produto, quantidade);
    });
  }

  // Função do segundo pop-up (resumo final, método de pagamento, endereço e total)
  function abrirResumoFinal(produto, quantidade) {
    const precoUnitario = parseFloat(produto.preco.replace('R$', '').replace(',', '.'));
    const frete = 10.99;
    const total = (precoUnitario * quantidade) + frete;

    const resumoPopup = document.createElement("div");
    resumoPopup.className = "popup-overlay";
    resumoPopup.innerHTML = `
      <div class="popup-content">
        <span class="popup-close">&times;</span>
        <h2>Resumo da Compra</h2>
        <p><strong>Produto:</strong> ${produto.nome}</p>
        <p><strong>Quantidade:</strong> ${quantidade}</p>
        <p><strong>Preço Unitário:</strong> ${produto.preco}</p>
        <p><strong>Frete:</strong> R$ 10,99</p>
        <p><strong>Total:</strong> R$ ${total.toFixed(2).replace('.', ',')}</p>

        <label for="endereco">Endereço de Entrega:</label>
        <input type="text" id="endereco" placeholder="Digite seu endereço">

        <label for="pagamento">Método de Pagamento:</label>
        <select id="pagamento">
          <option>Cartão de Crédito</option>
          <option>Boleto</option>
          <option>Pix</option>
        </select>

        <button type="button" class="btn-finalizar">Finalizar Pedido</button>
      </div>
    `;

    document.body.appendChild(resumoPopup);

    // Fechar pop-up
    resumoPopup.querySelector(".popup-close").addEventListener("click", () => {
      resumoPopup.remove();
    });

    // Evento do botão "Finalizar Pedido"
    resumoPopup.querySelector(".btn-finalizar").addEventListener("click", () => {
      const endereco = resumoPopup.querySelector("#endereco").value;
      const pagamento = resumoPopup.querySelector("#pagamento").value;

      if (endereco.trim() === "") {
        alert("Por favor, preencha o endereço de entrega.");
        return;
      }

      alert(`Pedido finalizado!\n\nProduto: ${produto.nome}\nQuantidade: ${quantidade}\nTotal: R$ ${total.toFixed(2).replace('.', ',')}\nMétodo de pagamento: ${pagamento}\nEndereço: ${endereco}`);
      resumoPopup.remove();
    });
  }
});

// Código do menu mobile
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('open');
  mobileMenu.classList.toggle('active');
});

// Fecha o menu mobile ao clicar em um link
document.querySelectorAll('.mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    menuToggle.classList.remove('open');
  });
});
