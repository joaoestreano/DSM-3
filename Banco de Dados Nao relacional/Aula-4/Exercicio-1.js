//Operadores Lógicos: $nor
//Selecione os documentos que possuem idades acima de 22 e abaixo de 26.

db.alunos.find(
    {
        $nor:[
            { idade: {$lte:22} },
            { idade: {$gte:26} }
        ]
    },
    {
        nome:true,
        idade:true,
        id:false
    }
)