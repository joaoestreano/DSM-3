//Exclusão com deleteOne
//Remova o 1º documento que possui idade acima de 25.

db.alunos.deleteOne(
    { idade:{ $gt: 25 } }
)