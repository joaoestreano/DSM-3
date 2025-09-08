//Criação do Banco e Coleções

use rede_games

// Coleção: clientes
db.clientes.insertMany([
  {_id: 1, nome: "Marcos", idade: 25, cidade: "Fortaleza" },
  {_id: 2, nome: "Julia", idade: 30, cidade: "São Paulo" },
  {_id: 3, nome: "Lucas", idade: 19, cidade: "Recife" },
  {_id: 4, nome: "Ana", idade: 27, cidade: "Fortaleza"}
])

// Coleção: produtos
db.produtos.insertMany([
  {_id: 101, nome: "Mouse Gamer", categoria: "Periféricos", preco: 250 },
  {_id: 102, nome: "Teclado Mecânico", categoria: "Periféricos", preco: 400 },
  {_id: 103, nome: "CS:GO Deluxe", categoria: "Jogos", preco: 120 },
  {_id: 104, nome: "Headset Pro", categoria: "Periféricos", preco: 350 },
  {_id: 105, nome: "FIFA 25", categoria: "Jogos", preco: 300 }
])

// Coleção: vendas
db.vendas.insertMany([
  { clienteld: 1, produtold: 101, quantidade: 1, data: "2024-05-01" },
  { clienteld: 1, produtold: 103, quantidade: 2, data: "2024-05-03" },
  { clienteld: 2, produtold: 102, quantidade: 1, data: "2024-05-02" },
  { clienteld: 3, produtold: 105, quantidade: 1, data: "2024-05-04" },
  { clienteld: 4, produtold: 104, quantidade: 2, data: "2024-05-05"}
])