//Operador de Intervalo: $nin
//Liste os documentos que não possuem o nome de alunos: Maria, João e Bruna.

db.alunos.find(
    { nome:{$nin:["Maria","João","Bruna"]} },
    { nome:true, idade:true, _id:false }
)