//Atualização com $set
//Adicione o campo peso em todos os documentos da coleção.

db.alunos.updateMany(
    {},
    { $set: { peso: 70 } }
)