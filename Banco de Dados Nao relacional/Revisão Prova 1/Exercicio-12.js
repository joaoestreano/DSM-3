//Atualização com $rename e $unset
//Renomeie o campo preco para valor em todos os produtos. Depois, remova o campo categoria dos documentos.

// Renomear o campo 'preco' para 'valor' em todos os produtos
db.produtos.updateMany({}, { $rename: { preco: "valor" } })

// Remover o campo 'categoria' dos documentos
db.produtos.updateMany({}, { $unset: { categoria: "" } })