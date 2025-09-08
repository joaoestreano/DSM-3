//Operador Lógico: $not
//Liste os documentos que possuem idades abaixo de 23.

db.alunos.find(
    {
        idade: { $not:{$gte:23} }
    },
    {
        nome:true,
        idade:true,
        _id:false
    }
)