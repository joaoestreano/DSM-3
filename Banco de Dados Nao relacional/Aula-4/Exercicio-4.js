//Operador de Tipo: $type
//Liste os documentos que possuem o campo idade do tipo number.

db.alunos.find(
    {
        idade:{ $type: "number" }
    },
    {
        nome:true,
        idade:true,
        _id:false
    }
)