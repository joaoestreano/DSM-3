//Agrupamento
//Calcule o total de produtos vendidos por categoria.

db.vendas.aggregate([
  {
    $lookup: {
      from: "produtos",
      localField: "produtold",
      foreignField: "_id",
      as: "produto_info"
    }
  },
  {
    $unwind: "$produto_info"
  },
  {
    $group: {
      _id: "$produto_info.categoria",
      totalVendido: { $sum: "$quantidade" }
    }
  }
])