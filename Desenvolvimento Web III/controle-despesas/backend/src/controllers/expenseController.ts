import { Request, Response } from "express";
import Expense from "../models/Expense";
import mongoose from "mongoose";

export const createExpense = async (req: Request, res: Response) => {
  try {
    const { description, amount, date } = req.body;

    if (!description || typeof description !== "string" || description.trim() === "") {
      return res.status(400).json({ message: "Descrição inválida." });
    }
    const numericAmount = Number(amount);
    if (isNaN(numericAmount) || numericAmount < 0) {
      return res.status(400).json({ message: "Valor inválido." });
    }

    const expense = new Expense({
      description: description.trim(),
      amount: numericAmount,
      date: date ? new Date(date) : new Date()
    });

    const saved = await expense.save();
    return res.status(201).json(saved);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao criar despesa." });
  }
};

export const getExpenses = async (_req: Request, res: Response) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 }).exec();
    return res.json(expenses);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao buscar despesas." });
  }
};

export const updateExpense = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: "ID inválido." });

    const { description, amount, date } = req.body;
    const update: any = {};

    if (description !== undefined) {
      if (typeof description !== "string" || description.trim() === "")
        return res.status(400).json({ message: "Descrição inválida." });
      update.description = description.trim();
    }

    if (amount !== undefined) {
      const numericAmount = Number(amount);
      if (isNaN(numericAmount) || numericAmount < 0) return res.status(400).json({ message: "Valor inválido." });
      update.amount = numericAmount;
    }

    if (date !== undefined) {
      update.date = new Date(date);
    }

    const updated = await Expense.findByIdAndUpdate(id, update, { new: true });
    if (!updated) return res.status(404).json({ message: "Despesa não encontrada." });
    return res.json(updated);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao atualizar despesa." });
  }
};

export const deleteExpense = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: "ID inválido." });

    const removed = await Expense.findByIdAndDelete(id);
    if (!removed) return res.status(404).json({ message: "Despesa não encontrada." });
    return res.json({ message: "Despesa removida." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao remover despesa." });
  }
};

// função que usa aggregate para somar todos os amounts
export const getTotalExpenses = async (_req: Request, res: Response) => {
  try {
    const result = await Expense.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" }
        }
      }
    ]);

    const total = result.length > 0 ? result[0].total : 0;
    return res.json({ total });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao calcular total." });
  }
};
