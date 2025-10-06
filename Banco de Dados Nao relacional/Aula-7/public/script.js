// script.js — versão do FRONTEND
const API_URL = 'http://localhost:3000/jogos';
const form = document.getElementById('form-jogo');
const tabelaBody = document.querySelector('#tabela-jogos tbody');
const btnSubmit = document.getElementById('btn-submit');

// Buscar todos os jogos
async function listarJogos() {
    tabelaBody.innerHTML = '<tr><td colspan="5">Carregando...</td></tr>';
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Erro ao buscar jogos');
        const jogos = await response.json();
        tabelaBody.innerHTML = '';

        if (jogos.length === 0) {
            tabelaBody.innerHTML = '<tr><td colspan="5">Nenhum jogo cadastrado.</td></tr>';
            return;
        }

        jogos.forEach(jogo => {
            const row = tabelaBody.insertRow();
            row.innerHTML = `
                <td>${jogo.nome}</td>
                <td>${jogo.categoria}</td>
                <td>R$ ${jogo.preco.toFixed(2)}</td>
                <td>${jogo.estoque}</td>
                <td>
                    <button onclick="carregarParaEdicao('${jogo._id}')">Editar</button>
                    <button onclick="deletarJogo('${jogo._id}')">Deletar</button>
                </td>
            `;
        });
    } catch (err) {
        tabelaBody.innerHTML = '<tr><td colspan="5">Erro ao conectar ao servidor.</td></tr>';
    }
}

// Enviar formulário
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const id = document.getElementById('jogo-id').value;
    const jogoData = {
        nome: document.getElementById('nome').value,
        categoria: document.getElementById('categoria').value,
        preco: parseFloat(document.getElementById('preco').value),
        estoque: parseInt(document.getElementById('estoque').value, 10),
    };

    const method = id ? 'PUT' : 'POST';
    const url = id ? `${API_URL}/${id}` : API_URL;

    try {
        const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(jogoData),
        });

        if (!response.ok) throw new Error('Erro ao salvar jogo');

        alert(id ? 'Jogo atualizado!' : 'Jogo adicionado!');
        form.reset();
        btnSubmit.textContent = 'Adicionar Jogo';
        listarJogos();
    } catch (err) {
        alert(err.message);
    }
});

// Edição
async function carregarParaEdicao(id) {
    const response = await fetch(`${API_URL}/${id}`);
    const jogo = await response.json();
    document.getElementById('jogo-id').value = jogo._id;
    document.getElementById('nome').value = jogo.nome;
    document.getElementById('categoria').value = jogo.categoria;
    document.getElementById('preco').value = jogo.preco;
    document.getElementById('estoque').value = jogo.estoque;
    btnSubmit.textContent = 'Atualizar Jogo';
}

// Deleção
async function deletarJogo(id) {
    if (!confirm('Tem certeza que deseja excluir?')) return;
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    listarJogos();
}

listarJogos();
