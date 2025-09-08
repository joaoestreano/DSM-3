//Consulta com $gte e $lte
//Liste todos os produtos cujo preço esteja entre 200 e 400 reais (inclusive).

db.produtos.find({ preco: { $gte: 200, $lte: 400 } })