// app.js (ou index.js)
const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

// Configuração de conexão (AJUSTE CONFORME SEU AMBIENTE)
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

app.get('/produtos', async (req, res) => {
    try {
        await client.connect();
        const database = client.db("rede_games");
        const produtos = database.collection("produtos");

        const resultado = await produtos.find({})
            .project({ nome: 1, preco: 1, _id: 0 }) // Exibe apenas nome e preco
            .limit(5) // Limita a 5 resultados
            .toArray();

        res.json(resultado);

    } catch (error) {
        console.error("Erro na consulta ao MongoDB:", error);
        res.status(500).send("Erro ao buscar produtos.");
    } finally {
        await client.close();
    }
});

app.listen(port, () => {
    console.log(`Servidor Node.js rodando em http://localhost:${port}`);
});