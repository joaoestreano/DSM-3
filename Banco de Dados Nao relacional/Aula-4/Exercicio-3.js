//Operador de Existência: $exists
//Liste os documentos que possuem o campo idade.

db.alunos.find(
    {
        idade:{ $exists: true }
    },
    {
        nome:true,
        idade:true,
        _id:false
    }
)