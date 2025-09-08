//Consulta com $exists e $type
//Verifique se há clientes com o campo cliente Vip. Depois, liste apenas os documentos em que o campo idade seja do tipo number.

// Verifique se há clientes com o campo clienteVip
db.clientes.find({ clienteVip: { $exists: true } })

// Liste apenas os documentos em que o campo idade seja do tipo number
db.clientes.find({ idade: { $type: "number" } })