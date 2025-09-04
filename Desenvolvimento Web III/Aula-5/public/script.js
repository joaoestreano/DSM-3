const API_URL = "http://localhost:3000/produtos";
const form = document.getElementById("form-produto");
const lista = document.getElementById("lista-produtos");
const modal = document.getElementById("modal-edicao");
const formEdicao = document.getElementById("form-edicao");
const fecharModal = document.querySelector(".fechar");

let produtoEmEdicao = null;

// Funções para o Modal
function abrirModal(produto) {
  modal.style.display = "block";
  document.getElementById("edit-id").value = produto._id;
  document.getElementById("edit-nome").value = produto.nome;
  document.getElementById("edit-valor").value = produto.valor;
  document.getElementById("edit-quantidade").value = produto.quantidade;
}

fecharModal.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Função para carregar e renderizar os produtos
async function carregarProdutos() {
  const resp = await fetch(API_URL);
  const produtos = await resp.json();

  lista.innerHTML = "";
  produtos.forEach(produto => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${produto.nome} - R$ ${produto.valor.toFixed(2)} - Quantidade: ${produto.quantidade}</span>
      <div class="acoes">
        <button onclick="editarProduto('${produto._id}', '${produto.nome}', ${produto.valor}, ${produto.quantidade})">Editar</button>
        <button onclick="removerProduto('${produto._id}')">Remover</button>
      </div>
    `;
    lista.appendChild(li);
  });
}

// Função para cadastrar produto
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const novoProduto = {
    nome: document.getElementById("nome").value,
    valor: parseFloat(document.getElementById("valor").value)
  };

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(novoProduto)
  });

  form.reset();
  carregarProdutos();
});

// Função para remover produto
window.removerProduto = async (id) => {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  carregarProdutos();
};

// Função para abrir o modal de edição
window.editarProduto = (id, nome, valor, quantidade) => {
  abrirModal({ _id: id, nome, valor, quantidade });
};

// Evento de submit do formulário de edição
formEdicao.addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = document.getElementById("edit-id").value;
  const produtoAtualizado = {
    nome: document.getElementById("edit-nome").value,
    valor: parseFloat(document.getElementById("edit-valor").value),
    quantidade: parseInt(document.getElementById("edit-quantidade").value)
  };
  
  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(produtoAtualizado)
  });

  modal.style.display = "none";
  carregarProdutos();
});

// Carrega produtos ao abrir a página
carregarProdutos();