//Atualização com $rename
//Renomeie o campo idade para age dos documentos que satisfazem a query.

db.alunos.updateMany(
    { idade:{ $lt: 25 } },
    { $rename: { "idade": "age" } }
)