//Consulta com $nor e $not
//Liste todos os clientes que não moram em Fortaleza e não possuem idade inferior a 20 anos.

db.clientes.find({ $nor: [ { cidade: "Fortaleza" }, { idade: { $lt: 20 } } ] })