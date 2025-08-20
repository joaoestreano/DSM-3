# 🚗 Atividade 1 -- Exercícios com Prisma ORM

Projeto desenvolvido para a disciplina **Desenvolvimento Web III**.\
Objetivo: praticar **Prisma ORM** com **PostgreSQL**, construindo uma
API em **Node.js + Express** e um **frontend simples em HTML/Bootstrap**
para CRUD de Pessoas, Carros e Associações (N:N).

------------------------------------------------------------------------

## 📌 Tecnologias

-   Node.js
-   Express
-   Prisma ORM
-   PostgreSQL
-   TypeScript

------------------------------------------------------------------------

## ⚙️ Requisitos

-   Node.js 18+\
-   PostgreSQL rodando na porta `5432`\
-   pgAdmin ou Prisma Studio (opcional, para visualizar dados)

------------------------------------------------------------------------

## 🚀 Como rodar o projeto

### Instalar dependências

``` bash
npm install
```

### Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz com sua string de conexão ao PostgreSQL:

``` env
DATABASE_URL="postgresql://postgres:SUA_SENHA@localhost:5432/atividade_prisma?schema=public"
```

> Troque `SUA_SENHA` pela senha do usuário postgres criada na instalação
> do banco.

### Executar migrações do Prisma

``` bash
npx prisma migrate dev --name init
```

### Rodar o servidor

``` bash
npm run dev
```

O servidor estará em:

    http://localhost:3000

------------------------------------------------------------------------

## 🗂️ Estrutura do Projeto

    prisma/
     └── schema.prisma   # Modelos do banco
    src/
     ├── server.ts       # Configuração do servidor Express
     ├── prisma.ts       # Instância do Prisma Client
     └── routes/         # Rotas (pessoas, carros, associações)
    public/
     ├── index.html      # Home com links
     ├── pessoas.html    # CRUD de pessoas
     ├── carros.html     # CRUD de carros
     └── associacoes.html# Gerenciar relações pessoa ↔ carro

------------------------------------------------------------------------

## 🌐 Endpoints principais

### Pessoas

-   `POST /pessoas` -- Criar
-   `GET /pessoas` -- Listar
-   `GET /pessoas/:id` -- Buscar por ID
-   `PUT /pessoas/:id` -- Atualizar
-   `DELETE /pessoas/:id` -- Excluir

### Carros

-   `POST /carros`
-   `GET /carros`
-   `GET /carros/:id`
-   `PUT /carros/:id`
-   `DELETE /carros/:id`

### Associações

-   `POST /associacoes`
-   `GET /associacoes`
-   `DELETE /associacoes/:id`

------------------------------------------------------------------------

## 🖥️ Frontend

-   Acesse `http://localhost:3000/` para usar o frontend.\
-   O frontend está em **Bootstrap 5** e consome diretamente as rotas da
    API.

------------------------------------------------------------------------

## 📊 Dica

Para visualizar e editar dados facilmente, use:

``` bash
npx prisma studio
```

Isso abrirá o **Prisma Studio** no navegador.

------------------------------------------------------------------------

## 📌 Autor

-   João Victor Estreano Nogueira Vaz Silva