//Atualização com $set e $inc
//Atualize o cliente chamado "Lucas" para incluir o campo status: "ativo". Em seguida, incremente sua idade em +1 ano.

db.clientes.updateOne(
  { nome: "Lucas" },
  { $set: { status: "ativo" }, $inc: { idade: 1 } }
)