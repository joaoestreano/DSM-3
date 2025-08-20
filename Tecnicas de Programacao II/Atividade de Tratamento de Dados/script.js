const fs=require('fs');
const path=require('path');
const preposicoes=['de', 'da', 'das', 'do', 'dos', 'e'];

function capitalizarNome(nome) {
  return nome
    .toLowerCase()
    .replace(/\s+/g, ' ') 
    .trim()
    .split(' ')
    .map(palavra => {
      return preposicoes.includes(palavra)
        ? palavra
        : palavra.charAt(0).toUpperCase()+palavra.slice(1);
    })
    .join(' ');
}

const entrada=path.join(__dirname,'nomes.csv');
const saida=path.join(__dirname,'nomes_formatados.csv');

fs.readFile(entrada,'utf8',(err, data) => {
  if (err) {
    console.error('Erro ao ler o arquivo:', err);
    return;
  }

  const nomes=data
    .split('\n')
    .map(l => l.replace(/\r/g, '').trim())
    .filter(l => l.length > 0)
    .map(capitalizarNome);

  const resultado = ['Nomes:', ...nomes].join('\n');

  fs.writeFile(saida, resultado, 'utf8', err => {
    if (err) {
      console.error('Erro ao salvar o arquivo:', err);
      return;
    }
    console.log(`Arquivo '${saida}' criado com sucesso!`);
  });
});
