//Projeção
//Mostre apenas o nome e o preço dos produtos da categoria "Periféricos".

db.produtos.find({ categoria: "Periféricos" }, { nome: 1, preco: 1, _id: 0 })