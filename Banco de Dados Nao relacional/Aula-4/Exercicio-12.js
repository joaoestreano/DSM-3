//Exclusão com deleteMany
//Remova todos os documentos que possuem idade abaixo de 25.

db.alunos.deleteMany(
    { idade:{ $lt: 25 } }
)