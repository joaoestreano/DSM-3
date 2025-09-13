import  express  from "express";
import mongoose from "mongoose";
import bodyParser = require("body-parser");
import cors from 'cors';
import Livros from './models/livro';

const app = express()
const PORT = 3000;
Const MONGODB_URI = 'mongodb://localhost:27017/crud_livros';

//Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));
app.use(express.json());

//conectar ao mongoDB
mongoose.connect(MONGODB_URI)
    .then(() => console.log('MongoDB conectado'))
    .catch(err => console.log('Erro ao conectar ao MongoDB:', err));

//rota para cadastrar um livro
app.post('/livro', async (req, res) => {
    try{
        const novoLivro = new Livros({
            titulo: req.body.titulo,
            autor: req.body.autor,
            ano: req.body.ano 
        });
        const livroSalvo = await novoLivro.save();
        res.status(201).json(livroSalvo);
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao cadastrar livro', error });
    }
});

//rota para listar todos os livros
app.get('/livros', async (req, res) => {
    try {
        const livros = await Livros.find();
        res.json(livros);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar livros' });
    }
});

//rota para atualizar um livro
app.put('/livros/:id', async (req, res) => {
    const {id} = req.params;
    const { titulo, autor, anoPublicacao } = req.body;
    try {
        const livroAtualizado = await Livro.findByIdAndUpdate(id, {titulo, autor,anoPublicacao},
            { new: true });
        if (!livroAtualizado) {
            return res.status(404).json({ error: 'Livro não encontrado' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar livro' });
    }
});