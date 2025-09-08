//Atualização com replaceOne
//Substitua o documento que possui o nome João pelo documento fornecido: { nome: "José", idade: 44, genero: "M" }.

db.alunos.replaceOne(
    { nome: "João" },
    { nome: "José", idade: 44, genero: "M" }
)