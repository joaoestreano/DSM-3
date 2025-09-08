//Operador: $ne
//Liste os documentos que não possuem idade = 20 e gênero = F.

db.alunos.find(
    { idade: {$ne:20}, genero: {$eq:"F"} },
    { nome:true, idade:true, _id:false }
)