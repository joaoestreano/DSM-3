//Paginação
//Liste os produtos ordenados pelo preço em ordem decrescente, exibindo apenas os 2 produtos mais caros.

db.produtos.find().sort({ preco: -1 }).limit(2)