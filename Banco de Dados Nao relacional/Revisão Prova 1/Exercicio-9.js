// Atualização
//O cliente Marcos mudou-se para Natal. Atualize sua cidade.

db.clientes.updateOne( { nome: "Marcos" }, { $set: { cidade: "Natal" } } )