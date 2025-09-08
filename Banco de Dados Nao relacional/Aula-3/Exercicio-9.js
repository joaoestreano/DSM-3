//Operadores de Comparação: $gte e $lte
//Liste os documentos de alunos que possuem idade entre 22 e 24 anos.

db.alunos.find(
    { idade: {$gte:22, $lte:24} },
    { nome:true, idade:true, _id:false }
)