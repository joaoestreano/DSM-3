//Operadores Lógicos
//Liste os clientes que são de São Paulo OU de Recife.

db.clientes.find({ $or: [ { cidade: "São Paulo" }, { cidade: "Recife" } ] })