import { Request, Response } from "express";
import { Car } from "../models/index.js";

class CarController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const document = new Car(req.body);
      const resp = await document.save();
      return res.json(resp);
    } catch (error: any) {
      if (error.code === 11000) {
        return res.json({ message: "Modelo já cadastrado" });
      }
      return res.json({ message: error.message });
    }
  }

  async list(_: Request, res: Response): Promise<Response> {
    try {
      const objects = await Car.find().sort({ model: "asc" });
      return res.json(objects);
    } catch (error: any) {
      return res.json({ message: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const obj = await Car.findByIdAndDelete(req.body.id);
      if (!obj) return res.json({ message: "Registro inexistente" });
      return res.json({ message: "Excluído com sucesso" });
    } catch (error: any) {
      return res.json({ message: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const document = await Car.findById(req.body.id);
      if (!document) return res.json({ message: "Carro inexistente" });

      document.model = req.body.model;
      document.year = req.body.year;

      const resp = await document.save();
      return res.json(resp);
    } catch (error: any) {
      if (error.code === 11000) {
        return res.json({ message: "Modelo já cadastrado" });
      }
      return res.json({ message: error.message });
    }
  }
}

export default new CarController();
