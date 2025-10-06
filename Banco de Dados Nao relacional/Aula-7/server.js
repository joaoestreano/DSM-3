// server.js
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Banco de dados em memória (para teste)
let jogos = [];
let idCounter = 1;

// [GET] /jogos
app.get('/jogos', (req, res) => {
  res.json(jogos);
});

// [POST] /jogos
app.post('/jogos', (req, res) => {
  const novoJogo = { id: idCounter++, ...req.body };
  jogos.push(novoJogo);
  res.status(201).json(novoJogo);
});

// [GET] /jogos/:id
app.get('/jogos/:id', (req, res) => {
  const jogo = jogos.find(j => j.id == req.params.id);
  if (!jogo) return res.status(404).json({ message: 'Jogo não encontrado' });
  res.json(jogo);
});

// [PUT] /jogos/:id
app.put('/jogos/:id', (req, res) => {
  const index = jogos.findIndex(j => j.id == req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Jogo não encontrado' });
  jogos[index] = { ...jogos[index], ...req.body };
  res.json(jogos[index]);
});

// [DELETE] /jogos/:id
app.delete('/jogos/:id', (req, res) => {
  const index = jogos.findIndex(j => j.id == req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Jogo não encontrado' });
  jogos.splice(index, 1);
  res.status(204).send();
});

// Servir os arquivos do frontend
app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
