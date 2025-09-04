📝 Projeto: Lista de Compras
Este é um projeto simples de uma Lista de Compras que demonstra a criação de uma API RESTful completa usando Node.js, Express e TypeScript, com um frontend em HTML, CSS e JavaScript. A aplicação permite adicionar, editar, remover e controlar a quantidade de itens em uma lista de compras, com os dados persistidos em um banco de dados MongoDB.

✨ Funcionalidades
Adicionar Item: Permite incluir novos produtos na lista. Se um item com o mesmo nome já existir, sua quantidade é incrementada.

Visualizar Itens: Exibe todos os produtos da lista, com nome, valor e quantidade.

Editar Item: Permite modificar o nome, valor e quantidade de um produto existente.

Remover Item: Exclui um produto da lista.

🚀 Tecnologias Utilizadas
Backend:

Node.js: Ambiente de execução JavaScript.

Express: Framework web para Node.js, utilizado para criar a API.

TypeScript: Superconjunto do JavaScript que adiciona tipagem estática.

Mongoose: Biblioteca que facilita a interação com o banco de dados MongoDB.

MongoDB Compass: Ferramenta visual para gerenciar o banco de dados.

Frontend:

HTML: Estrutura da página.

CSS: Estilização e design do layout.

JavaScript: Lógica de interação com a API e manipulação do DOM.

Pré-requisitos
Certifique-se de ter os seguintes softwares instalados:

Node.js

MongoDB Compass

Bash

npm install
Configuração do Banco de Dados
Inicie o servidor do MongoDB Compass.

O projeto está configurado para se conectar a um banco de dados local chamado shopping-listDB.

Execução da Aplicação
Inicie o servidor de backend. O comando dev utiliza o ts-node para compilar e executar o código TypeScript automaticamente:

Bash

npm run dev
Aguarde a mensagem "Conectado ao MongoDB Compass" e "Servidor rodando em http://localhost:3000" no terminal.

Abra seu navegador e acesse a URL:

http://localhost:3000
A página da Lista de Compras será carregada, e você poderá começar a usar a aplicação.
