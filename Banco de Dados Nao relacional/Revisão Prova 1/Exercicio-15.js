//Agregação com $lookup
//Liste as vendas com os dados completos do produto comprado.

db.vendas.aggregate([
  {
    $lookup: {
      from: "produtos",
      localField: "produtold",
      foreignField: "_id",
      as: "produto_vendido"
    }
  }
])