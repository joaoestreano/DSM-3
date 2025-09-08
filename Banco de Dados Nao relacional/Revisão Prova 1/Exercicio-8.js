//Inserção de Novo Cliente
//Adicione um novo cliente chamado "Jorge", 22 anos, morador de Salvador.

db.clientes.insertOne({ nome: "Jorge", idade: 22, cidade: "Salvador" })