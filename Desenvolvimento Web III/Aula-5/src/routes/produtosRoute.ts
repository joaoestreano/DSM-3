import { Router, Request, Response } from "express";
import Produto from "../models/produtos";

const router = Router();

// Rota POST -> Criar ou atualizar um produto
router.post("/", async (req: Request, res: Response) => {
    try {
        const { nome, valor } = req.body;
        
        // Verifica se o produto já existe
        const produtoExistente = await Produto.findOne({ nome });

        if (produtoExistente) {
            // Se o produto existe, incrementa a quantidade
            produtoExistente.quantidade += 1;
            const produtoAtualizado = await produtoExistente.save();
            return res.status(200).json(produtoAtualizado);
        } else {
            // Se não existe, cria um novo produto com quantidade 1
            const novoProduto = new Produto({ nome, valor, quantidade: 1 });
            const produtoSalvo = await novoProduto.save();
            return res.status(201).json(produtoSalvo);
        }
    } catch (erro: unknown) {
        if (erro instanceof Error) {
            res.status(400).json({ erro: erro.message });
        } else {
            res.status(400).json({ erro: String(erro) });
        }
    }
});

// Rota GET -> Listar todos os produtos
router.get("/", async (_req: Request, res: Response) => {
    try {
        const produtos = await Produto.find();
        res.json(produtos);
    } catch (erro: unknown) {
        if (erro instanceof Error) {
            res.status(500).json({ erro: erro.message });
        } else {
            res.status(500).json({ erro: String(erro) });
        }
    }
});

// Rota DELETE -> Remover um produto pelo ID
router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const resultado = await Produto.findByIdAndDelete(id);

        if (!resultado) {
            return res.status(404).json({ mensagem: "Produto não encontrado." });
        }
        res.status(200).json({ mensagem: "Produto removido com sucesso." });
    } catch (erro: unknown) {
        if (erro instanceof Error) {
            res.status(500).json({ erro: erro.message });
        } else {
            res.status(500).json({ erro: String(erro) });
        }
    }
});

// Rota PUT -> Editar um produto pelo ID
router.put("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { nome, valor, quantidade } = req.body;

        const produtoAtualizado = await Produto.findByIdAndUpdate(
            id, 
            { nome, valor, quantidade }, 
            { new: true } // Retorna o documento atualizado
        );

        if (!produtoAtualizado) {
            return res.status(404).json({ mensagem: "Produto não encontrado." });
        }
        res.status(200).json(produtoAtualizado);
    } catch (erro: unknown) {
        if (erro instanceof Error) {
            res.status(500).json({ erro: erro.message });
        } else {
            res.status(500).json({ erro: String(erro) });
        }
    }
});

export default router;