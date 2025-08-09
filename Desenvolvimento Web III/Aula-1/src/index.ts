//import o framework Express, usado para gerenciar o servidor HTTP
import express from "express";

//importa o pacote dontenv, que carrega variaveis de ambiente do arquivo
import dontenv from "dotenv";

//importar as rotas relacionadas as tarefas do arquivo
import {TaskRoutes} from "./Routes/TaskRoutes";

//carregar as variaveis do arquivo .env
dontenv.config();

//cria a aplicação Express
const app = express();

//configura o express para conseguir ler os dados em formato JSON no corpo da requisição
app.use(express.json());

app.get("/", (req,res)=> {
    res.send("API Aula-1 Esta rodando! Acesse /Task para usar")
});

app.use("/Task", TaskRoutes);

app.listen(3000,() => {
    console.log("Servidor rodando em http://localhost:3000");
});