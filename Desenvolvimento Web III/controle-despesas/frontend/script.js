const API_BASE = "http://localhost:5000/api/expenses";

const form = document.getElementById("expense-form");
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const dateInput = document.getElementById("date");
const expensesList = document.getElementById("expenses-list");
const totalEl = document.getElementById("total");
const cancelEditBtn = document.getElementById("cancel-edit");
const submitBtn = document.getElementById("submit-btn");

let editingId = null;

const formatCurrency = (value) => {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
};

const formatDate = (iso) => {
  const d = new Date(iso);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

async function fetchExpenses() {
  try {
    const res = await fetch(API_BASE);
    const data = await res.json();
    renderExpenses(data);
  } catch (err) {
    console.error("Erro ao buscar despesas", err);
  }
}

async function fetchTotalExpenses() {
  try {
    const res = await fetch(`${API_BASE}/total`);
    const { total } = await res.json();
    totalEl.textContent = formatCurrency(total || 0);
  } catch (err) {
    console.error("Erro ao buscar total", err);
  }
}

function renderExpenses(expenses) {
  expensesList.innerHTML = "";
  if (!Array.isArray(expenses) || expenses.length === 0) {
    expensesList.innerHTML = "<li>Nenhuma despesa registrada.</li>";
    return;
  }

  expenses.forEach(exp => {
    const li = document.createElement("li");
    li.className = "expense-item";

    const info = document.createElement("div");
    info.className = "expense-info";
    const desc = document.createElement("div");
    desc.textContent = exp.description;
    const meta = document.createElement("div");
    meta.textContent = `${formatCurrency(exp.amount)} • ${formatDate(exp.date)}`;
    meta.style.color = "#666";
    meta.style.fontSize = "0.9em";
    info.appendChild(desc);
    info.appendChild(meta);

    const actions = document.createElement("div");
    actions.className = "expense-actions";

    const editBtn = document.createElement("button");
    editBtn.className = "btn-edit";
    editBtn.textContent = "Alterar";
    editBtn.onclick = () => startEdit(exp);

    const delBtn = document.createElement("button");
    delBtn.className = "btn-delete";
    delBtn.textContent = "Excluir";
    delBtn.onclick = () => deleteExpense(exp._id);

    actions.appendChild(editBtn);
    actions.appendChild(delBtn);

    li.appendChild(info);
    li.appendChild(actions);

    expensesList.appendChild(li);
  });
}

function startEdit(expense) {
  editingId = expense._id;
  descriptionInput.value = expense.description;
  amountInput.value = expense.amount;
  // set date input in yyyy-mm-dd
  const d = new Date(expense.date);
  dateInput.value = d.toISOString().slice(0, 10);
  submitBtn.textContent = "Salvar Alteração";
  cancelEditBtn.classList.remove("hidden");
}

async function deleteExpense(id) {
  if (!confirm("Deseja realmente excluir esta despesa?")) return;
  try {
    const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Erro ao excluir");
    await fetchExpenses();
    await fetchTotalExpenses();
  } catch (err) {
    console.error(err);
    alert("Erro ao excluir despesa.");
  }
}

cancelEditBtn.addEventListener("click", () => {
  editingId = null;
  form.reset();
  submitBtn.textContent = "Cadastrar Despesa";
  cancelEditBtn.classList.add("hidden");
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const description = descriptionInput.value.trim();
  const amount = parseFloat(amountInput.value);
  const date = dateInput.value ? dateInput.value : undefined;

  if (!description) return alert("Preencha a descrição.");
  if (isNaN(amount) || amount < 0) return alert("Valor inválido.");

  const payload = { description, amount, ...(date ? { date } : {}) };

  try {
    let res;
    if (editingId) {
      res = await fetch(`${API_BASE}/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error("Erro ao atualizar");
      editingId = null;
      submitBtn.textContent = "Cadastrar Despesa";
      cancelEditBtn.classList.add("hidden");
    } else {
      res = await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error("Erro ao cadastrar");
      form.reset();
    }

    await fetchExpenses();
    await fetchTotalExpenses();
  } catch (err) {
    console.error(err);
    alert("Erro ao salvar despesa.");
  }
});

// Inicialização: carrega lista e total. Define data padrão atual no campo data.
(function init() {
  // default date to today
  const today = new Date().toISOString().slice(0, 10);
  dateInput.value = today;
  fetchExpenses();
  fetchTotalExpenses();
})();
