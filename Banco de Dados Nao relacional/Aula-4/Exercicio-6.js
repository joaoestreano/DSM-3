//Atualização com updateMany e $inc
//Subtraia 10 na idade de todos os documentos que possuem idade menor que 25.

db.alunos.updateMany(
    { idade:{ $lt: 25 } },
    { $inc: { idade:-10 } }
)