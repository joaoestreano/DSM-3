//Exclusão
//Remova o produto "FIFA 25" do catálogo.

db.produtos.deleteOne({ nome: "FIFA 25" })
