//Consulta com $and
//Liste todos os clientes que moram em Fortaleza E possuem idade maior que 25 anos.

db.clientes.find({ cidade: "Fortaleza", idade: { $gt: 25 } })