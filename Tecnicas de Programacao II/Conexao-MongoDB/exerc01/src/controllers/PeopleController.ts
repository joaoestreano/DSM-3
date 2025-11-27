import { Request, Response } from "express";
import { People } from "../models/index.js";

class PeopleController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const document = new People(req.body);
      const resp = await document.save();
      return res.json(resp);
    } catch (error: any) {
      if (error.code === 11000) {
        return res.json({ message: "Nome já cadastrado" });
      }
      if (error.errors?.number) {
        return res.json({ message: error.errors.number.message });
      }
      return res.json({ message: error.message });
    }
  }

  async list(_: Request, res: Response): Promise<Response> {
    try {
      const objects = await People.find().sort({ name: "asc" });
      return res.json(objects);
    } catch (error: any) {
      return res.json({ message: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const obj = await People.findByIdAndDelete(req.body.id);
      if (!obj) return res.json({ message: "Registro inexistente" });
      return res.json({ message: "Excluído com sucesso" });
    } catch (error: any) {
      return res.json({ message: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const document = await People.findById(req.body.id);
      if (!document) return res.json({ message: "Pessoa inexistente" });

      document.name = req.body.name;
      document.number = req.body.number;

      const resp = await document.save();
      return res.json(resp);
    } catch (error: any) {
      if (error.code === 11000) {
        return res.json({ message: "Nome já cadastrado" });
      }
      return res.json({ message: error.message });
    }
  }
}

export default new PeopleController();
