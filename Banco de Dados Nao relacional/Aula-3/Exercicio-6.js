//Consulta com critérios e projeção de campos
//Retorne o 1º documento da coleção que tenha o gênero F e idade = 20.

db.alunos.findOne({ genero:"F", idade:20 }, { nome:true, _id:false })