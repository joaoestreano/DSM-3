import { Router } from "express";
import prisma from "../prisma";

const router = Router();

router.post("/", async (req, res) => {
  const { nome, email } = req.body;
  const pessoa = await prisma.pessoa.create({ data: { nome, email } });
  res.json(pessoa);
});

router.get("/", async (_req, res) => {
  res.json(await prisma.pessoa.findMany());
});

router.get("/:id", async (req, res) => {
  const pessoa = await prisma.pessoa.findUnique({ where: { id: Number(req.params.id) } });
  res.json(pessoa);
});

router.put("/:id", async (req, res) => {
  const { nome, email } = req.body;
  const pessoa = await prisma.pessoa.update({
    where: { id: Number(req.params.id) },
    data: { nome, email }
  });
  res.json(pessoa);
});

router.delete("/:id", async (req, res) => {
  await prisma.pessoa.delete({ where: { id: Number(req.params.id) } });
  res.status(204).send();
});

export default router;
