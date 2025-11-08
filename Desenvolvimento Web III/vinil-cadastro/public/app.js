const API = "/api/discos";

const form = document.getElementById("disco-form");
const tabelaBody = document.querySelector("#tabela-discos tbody");
const formTitle = document.getElementById("form-title");
const cancelarBtn = document.getElementById("cancelar");

async function fetchDiscos() {
  const res = await fetch(API);
  const dados = await res.json();
  renderTabela(dados);
}

function renderTabela(discos) {
  tabelaBody.innerHTML = "";
  discos.forEach(d => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${escapeHtml(d.titulo)}</td>
      <td>${escapeHtml(d.artista)}</td>
      <td>${d.ano || ""}</td>
      <td>${d.genero || ""}</td>
      <td>${d.formato}</td>
      <td>${d.preco != null ? "R$ " + Number(d.preco).toFixed(2) : ""}</td>
      <td class="actions-btn">
        <button class="small-btn edit" data-id="${d._id}">Editar</button>
        <button class="small-btn delete" data-id="${d._id}">Excluir</button>
      </td>
    `;
    tabelaBody.appendChild(tr);
  });
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str).replace(/[&<>"'\/]/g, s => {
    const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;", "/": "&#x2F;" };
    return map[s];
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = document.getElementById("disco-id").value;
  const payload = {
    titulo: document.getElementById("titulo").value.trim(),
    artista: document.getElementById("artista").value.trim(),
    ano: document.getElementById("ano").value ? Number(document.getElementById("ano").value) : undefined,
    genero: document.getElementById("genero").value.trim(),
    formato: document.getElementById("formato").value,
    preco: document.getElementById("preco").value ? Number(document.getElementById("preco").value) : undefined
  };

  try {
    if (id) {
      // atualizar
      const res = await fetch(API + "/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error("Erro ao atualizar");
    } else {
      // criar
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error("Erro ao criar");
    }
    resetForm();
    await fetchDiscos();
  } catch (err) {
    alert("Erro: " + err.message);
  }
});

tabelaBody.addEventListener("click", async (e) => {
  const target = e.target;
  if (target.matches(".edit")) {
    const id = target.dataset.id;
    const res = await fetch(API + "/" + id);
    if (!res.ok) { alert("Erro ao obter disco"); return; }
    const disco = await res.json();
    preencherFormulario(disco);
  } else if (target.matches(".delete")) {
    const id = target.dataset.id;
    if (!confirm("Deseja realmente excluir esse disco?")) return;
    const res = await fetch(API + "/" + id, { method: "DELETE" });
    if (!res.ok) { alert("Erro ao excluir"); return; }
    await fetchDiscos();
  }
});

function preencherFormulario(d) {
  document.getElementById("disco-id").value = d._id;
  document.getElementById("titulo").value = d.titulo || "";
  document.getElementById("artista").value = d.artista || "";
  document.getElementById("ano").value = d.ano || "";
  document.getElementById("genero").value = d.genero || "";
  document.getElementById("formato").value = d.formato || "";
  document.getElementById("preco").value = d.preco != null ? d.preco : "";
  formTitle.textContent = "Editar disco";
}

cancelarBtn.addEventListener("click", () => {
  resetForm();
});

function resetForm() {
  document.getElementById("disco-id").value = "";
  form.reset();
  formTitle.textContent = "Cadastrar novo disco";
}

window.addEventListener("load", fetchDiscos);
