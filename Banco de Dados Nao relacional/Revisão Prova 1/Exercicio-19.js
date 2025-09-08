//Paginação com skip
//Liste os produtos ordenados pelo valor (antes chamado de preco) em ordem decrescente, exibindo apenas do 3º ao 5º produto mais caro.

db.produtos.find().sort({ valor: -1 }).skip(2).limit(3)