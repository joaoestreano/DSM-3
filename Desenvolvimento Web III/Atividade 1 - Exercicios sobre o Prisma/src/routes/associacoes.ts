import { Router } from "express";
import prisma from "../prisma";

const router = Router();

router.post("/", async (req, res) => {
  const { pessoaId, carroId } = req.body;
  const assoc = await prisma.pessoaPorCarro.create({
    data: { pessoaId, carroId }
  });
  res.json(assoc);
});

router.get("/", async (_req, res) => {
  const list = await prisma.pessoaPorCarro.findMany({
    include: { pessoa: true, carro: true }
  });
  res.json(list);
});

router.delete("/:id", async (req, res) => {
  await prisma.pessoaPorCarro.delete({ where: { id: Number(req.params.id) } });
  res.status(204).send();
});

export default router;
