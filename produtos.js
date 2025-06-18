document.addEventListener("DOMContentLoaded", () => {
  const lista = document.getElementById("product-list");

  const produtos = [
    {
      imagem: "./images/Produto1.jpeg",
      nome: "Bebê Reborn",
      descricao: "Uma criança que você não tera nenhum trabalho para cuidar.",
      preco: 129.90,
      detalhes: "O Bebê Reborn é feito com silicone e roupas costuradas à mão. Ideal para presentes ou colecionadores.",
    },
    {
      imagem: "./images/Produto2.jpg",
      nome: "Fraldas Pampers",
      descricao: "Fraldas para o seu Bebê Reborn sempre ficar limpinho.",
      preco: 79.90,
      detalhes: "Contém 138 unidades. Conforto seco garantido por até 12h.",
    },
    {
      imagem: "./images/Produto3.png",
      nome: "Sapatênis",
      descricao: "Sapatênis tamanho 38 para ficar muito no estilo.",
      preco: 90.00,
      detalhes: "Confeccionado em material sintético de alta qualidade, com palmilha macia e solado antiderrapante para máximo conforto e segurança.",
    },
    {
      imagem: "./images/Produto4.jpg",
      nome: "Boné do PT",
      descricao: "Compre este boné do PT para estar sempre apoiando nosso querido presidente.",
      preco: 13.13,
      detalhes: "Boné ajustável com estampa bordada em destaque, feito em algodão resistente para garantir estilo e durabilidade no apoio ao seu partido.",
    },
    {
      imagem: "./images/Produto5.jpeg",
      nome: "Tapete da MC Pipokinha",
      descricao: "Esse tapete impede de suas visitas chegarem na sua casa e falar mal da pipokinha.",
      preco: 69.00,
      detalhes: "Tapete em tecido antiderrapante, com estampa ousada e divertida da MC Pipokinha. Ideal para quem quer recepcionar as visitas com muito estilo (e um toque de polêmica).",
    }
  ];

  produtos.forEach(produto => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}">
      <h2>${produto.nome}</h2>
      <p>${produto.descricao}</p>
      <span class="price">R$ ${produto.preco.toFixed(2)}</span>
      <button type="button" class="btn-comprar">Comprar</button>
    `;

    card.querySelector(".btn-comprar").addEventListener("click", () => {
      abrirPopup(produto);
    });

    lista.appendChild(card);
  });

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
        <label for="quantidade">Quantidade:</label>
        <input type="number" id="quantidade" min="1" value="1" required>
        <span class="price">R$ ${produto.preco.toFixed(2)}</span>
        <button type="button" class="btn-popup-comprar">Comprar</button>
      </div>
    `;

document.addEventListener("keydown", e => {
  if (e.key === "Escape") popup.remove();
});
popup.addEventListener("click", e => {
  if (e.target === popup) popup.remove();
});

    
    document.body.appendChild(popup);

    popup.querySelector(".popup-close").addEventListener("click", () => {
      popup.remove();
    });

    popup.querySelector(".btn-popup-comprar").addEventListener("click", () => {
      const quantidade = parseInt(popup.querySelector("#quantidade").value);
      if (quantidade <= 0 || isNaN(quantidade)) {
        alert("Por favor, insira uma quantidade válida.");
        return;
      }
      abrirFormularioEndereco(produto, quantidade);
      popup.remove();
    });
  }

  function abrirFormularioEndereco(produto, quantidade) {
    const popup = document.createElement("div");
    popup.className = "popup-overlay";

    popup.innerHTML = `
      <div class="popup-content">
        <span class="popup-close">&times;</span>
        <h2>Finalizar Compra</h2>
        <p><strong>Produto:</strong> ${produto.nome}</p>
        <p><strong>Quantidade:</strong> ${quantidade}</p>
        <p><strong>Total (Produto):</strong> R$ ${(produto.preco * quantidade).toFixed(2)}</p>
        <p><strong>Frete:</strong> R$ 10.99</p>

        <h3>Endereço de Entrega:</h3>
        <label>CEP:</label>
        <input type="text" id="cep" placeholder="00000-000" required>

        <label>Cidade:</label>
        <input type="text" id="cidade" required>

        <label>Estado (UF):</label>
        <input type="text" id="estado" maxlength="2" required>

        <label>Bairro:</label>
        <input type="text" id="bairro" required>

        <label>Rua:</label>
        <input type="text" id="rua" required>

        <label>Número:</label>
        <input type="text" id="numero" required>

        <label>Complemento (opcional):</label>
        <input type="text" id="complemento">

        <h3>Método de Pagamento:</h3>
        <select id="pagamento" required>
          <option value="">Selecione</option>
          <option value="Cartão de Crédito">Cartão de Crédito</option>
          <option value="Pix">Pix</option>
          <option value="Boleto">Boleto</option>
        </select>

        <button type="button" class="btn-finalizar-pedido">Finalizar Pedido</button>
      </div>
    `;

    document.body.appendChild(popup);

    popup.querySelector(".popup-close").addEventListener("click", () => {
      popup.remove();
    });
    document.addEventListener("keydown", e => {
  if (e.key === "Escape") popup.remove();
});
popup.addEventListener("click", e => {
  if (e.target === popup) popup.remove();
});


    popup.querySelector(".btn-finalizar-pedido").addEventListener("click", () => {
      const cep = document.getElementById('cep').value.trim();
      const cidade = document.getElementById('cidade').value.trim();
      const estado = document.getElementById('estado').value.trim();
      const bairro = document.getElementById('bairro').value.trim();
      const rua = document.getElementById('rua').value.trim();
      const numero = document.getElementById('numero').value.trim();
      const pagamento = document.getElementById('pagamento').value;

      const cepRegex = /^\d{5}-\d{3}$/;

      if (!cepRegex.test(cep)) {
        alert("Por favor, insira um CEP válido (ex: 12345-678).");
        return;
      }

      if (!cidade || !estado || !bairro || !rua || !numero || !pagamento) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
      }

      const total = (produto.preco * quantidade + 10.99).toFixed(2);

      alert(`
Pedido Finalizado!

Produto: ${produto.nome}
Quantidade: ${quantidade}
Total: R$ ${total}

Endereço de Entrega:
CEP: ${cep}
Cidade: ${cidade}
Estado: ${estado}
Bairro: ${bairro}
Rua: ${rua}, Nº ${numero}

Método de Pagamento: ${pagamento}

Obrigado pela compra!
      `);
      popup.remove();
    });
  }
});

// Script do menu mobile
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('open');
  mobileMenu.classList.toggle('active');
});

document.querySelectorAll('.mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    menuToggle.classList.remove('open');
  });
});
