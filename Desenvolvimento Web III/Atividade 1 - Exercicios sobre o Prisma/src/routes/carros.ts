import { Router } from "express";
import prisma from "../prisma";

const router = Router();

router.post("/", async (req, res) => {
  const { modelo, marca, ano } = req.body;
  const carro = await prisma.carro.create({ data: { modelo, marca, ano } });
  res.json(carro);
});

router.get("/", async (_req, res) => {
  res.json(await prisma.carro.findMany());
});

router.get("/:id", async (req, res) => {
  const carro = await prisma.carro.findUnique({ where: { id: Number(req.params.id) } });
  res.json(carro);
});

router.put("/:id", async (req, res) => {
  const { modelo, marca, ano } = req.body;
  const carro = await prisma.carro.update({
    where: { id: Number(req.params.id) },
    data: { modelo, marca, ano }
  });
  res.json(carro);
});

router.delete("/:id", async (req, res) => {
  await prisma.carro.delete({ where: { id: Number(req.params.id) } });
  res.status(204).send();
});

export default router;
