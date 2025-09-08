//Atualização com updateOne
//Atualize a idade para 30 do 1º documento que possui idade maior que 25.

db.alunos.updateOne(
    { idade:{ $gt: 25 } },
    { $set: { idade:30 } }
)
