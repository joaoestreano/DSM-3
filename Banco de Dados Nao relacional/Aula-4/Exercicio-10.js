//Atualização com $unset
//Remova o campo idade dos documentos que possuem idade acima de 25.

db.alunos.updateMany(
    { idade:{ $gt: 25 } },
    { $unset: { "idade": "" } }
)