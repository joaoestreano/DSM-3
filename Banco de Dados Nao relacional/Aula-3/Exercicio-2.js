//Consulta com critérios de seleção
//Liste todos os documentos da coleção alunos com gênero F e idade = 20.

db.alunos.find({ genero:"F", idade:20 })