//Atualização com replaceOne
//Substitua completamente o documento da cliente "Julia" por um novo documento.

db.clientes.replaceOne(
  { nome: "Julia" },
  { nome: "Julia", idade: 31, cidade: "Rio de Janeiro", clienteVip: true }
)