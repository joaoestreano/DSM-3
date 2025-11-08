import { Schema, model, Document } from "mongoose";

export interface IDisco extends Document {
  titulo: string;
  artista: string;
  ano?: number;
  genero?: string;
  formato: "Vinil" | "CD";
  preco?: number;
  criadoEm: Date;
}

const DiscoSchema = new Schema<IDisco>({
  titulo: { type: String, required: true, trim: true },
  artista: { type: String, required: true, trim: true },
  ano: { type: Number },
  genero: { type: String, trim: true },
  formato: { type: String, required: true, enum: ["Vinil", "CD"] },
  preco: { type: Number, default: 0 },
  criadoEm: { type: Date, default: Date.now }
});

export const Disco = model<IDisco>("Disco", DiscoSchema);
