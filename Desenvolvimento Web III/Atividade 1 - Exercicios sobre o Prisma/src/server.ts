import express from "express";
import cors from "cors";
import path from "path";

import pessoasRouter from "./routes/pessoas";
import carrosRouter from "./routes/carros";
import associacoesRouter from "./routes/associacoes";

const app = express();
app.use(cors());
app.use(express.json());

// Servir frontend
app.use(express.static(path.join(__dirname, "../public")));

// Rotas
app.use("/pessoas", pessoasRouter);
app.use("/carros", carrosRouter);
app.use("/associacoes", associacoesRouter);

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
