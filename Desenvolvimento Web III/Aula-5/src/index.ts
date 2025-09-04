import express from "express";
import mongoose from "mongoose";
import path from "path";
import ProdutoRoutes from "./routes/produtosRoute"; // Importa a nova rota

const app = express();

app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/shopping-listDB") // Altera o nome do banco de dados
    .then(() => console.log("Conectado ao MongoDB Compass"))
    .catch((erro) => console.error("Erro ao conectar:", erro));

app.use("/produtos", ProdutoRoutes); // Adiciona a nova rota

app.use(express.static(path.join(__dirname, "../public")));

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});