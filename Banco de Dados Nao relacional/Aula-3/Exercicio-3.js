//Consulta com projeção de campos
//Liste apenas os nomes de todos os documentos da coleção alunos.

db.alunos.find( {}, { nome:true, _id:false} )