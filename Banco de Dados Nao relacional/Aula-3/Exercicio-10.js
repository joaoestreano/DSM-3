//Operador de Intervalo: $in
//Retorne os documentos quando o nome for: Maria, João e Bruna.

db.alunos.find(
    { nome:{$in:["Maria","João","Bruna"]} },
    { nome:true, idade:true, _id:false }
)