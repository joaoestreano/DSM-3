import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import discosRoutes from "./routes/discos";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/vinildb";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// servir frontend estático (public)
app.use(express.static(path.join(__dirname, "../public")));

// rotas da API
app.use("/api/discos", discosRoutes);

// fallback -> index.html para single page (caso necessário)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log("Conectado ao MongoDB");
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error("Erro ao conectar no MongoDB:", err);
    process.exit(1);
  });
