import { Router } from "express";
import { Disco } from "../models/Disco";
import { Types } from "mongoose";

const router = Router();

// listar todos
router.get("/", async (req, res) => {
  try {
    const discos = await Disco.find().sort({ criadoEm: -1 });
    res.json(discos);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar discos" });
  }
});

// pegar 1 por id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!Types.ObjectId.isValid(id)) return res.status(400).json({ error: "ID inválido" });
  try {
    const disco = await Disco.findById(id);
    if (!disco) return res.status(404).json({ error: "Disco não encontrado" });
    res.json(disco);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar disco" });
  }
});

// criar
router.post("/", async (req, res) => {
  try {
    const { titulo, artista, ano, genero, formato, preco } = req.body;
    if (!titulo || !artista || !formato) {
      return res.status(400).json({ error: "Campos obrigatórios: titulo, artista, formato" });
    }
    const novo = new Disco({ titulo, artista, ano, genero, formato, preco });
    const salvo = await novo.save();
    res.status(201).json(salvo);
  } catch (err) {
    res.status(500).json({ error: "Erro ao criar disco" });
  }
});

// atualizar
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  if (!Types.ObjectId.isValid(id)) return res.status(400).json({ error: "ID inválido" });
  try {
    const update = req.body;
    const disco = await Disco.findByIdAndUpdate(id, update, { new: true, runValidators: true });
    if (!disco) return res.status(404).json({ error: "Disco não encontrado" });
    res.json(disco);
  } catch (err) {
    res.status(500).json({ error: "Erro ao atualizar disco" });
  }
});

// deletar
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  if (!Types.ObjectId.isValid(id)) return res.status(400).json({ error: "ID inválido" });
  try {
    const disco = await Disco.findByIdAndDelete(id);
    if (!disco) return res.status(404).json({ error: "Disco não encontrado" });
    res.json({ message: "Disco removido" });
  } catch (err) {
    res.status(500).json({ error: "Erro ao deletar disco" });
  }
});

export default router;
