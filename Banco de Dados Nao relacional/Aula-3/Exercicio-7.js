//Operador: $eq
//Liste os documentos que possuem idade = 20 e gênero = F.

db.alunos.find(
    { idade: {$eq:20}, genero: {$eq:"F"} },
    { nome:true, idade:true, _id:false }
)