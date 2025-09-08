//Consulta com opções (sort, skip, limit)
//Liste os alunos ordenados por idade, ignorando os 2 primeiros documentos e mostrando os 4 últimos.

db.alunos.find(
    {},
    { nome:true, idade:true, _id:false },
    { sort:{ idade:1 }, skip: 2, limit: 4 }
)