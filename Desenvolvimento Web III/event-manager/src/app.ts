// src/app.ts

import express, { Application } from 'express';
import path from 'path'; // ⬅️ Adicionar import
import { connectDB } from './config/database';
import eventoRoutes from './routes/eventoRoutes';

const app: Application = express();
const PORT = 3000;

// Middlewares
app.use(express.json());

// Conexão com o Banco de Dados
connectDB();

// Rotas da API
app.use('/api/eventos', eventoRoutes);

// ⬅️ CONFIGURAÇÃO PARA SERVIR O FRONTEND
// 1. Aponta para a pasta raiz do projeto, onde o index.html está
app.use(express.static(path.join(__dirname, '..'))); 

// 2. Rota raiz que serve o index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});
// FIM DA CONFIGURAÇÃO FRONTEND

// Inicia o Servidor
app.listen(PORT, () => {
    console.log(`⚡️ Servidor rodando em http://localhost:${PORT}`);
});