import mongoose, { Schema, Document } from "mongoose";

// Interface que define a estrutura de um produto
export interface IProduto extends Document {
    nome: string;
    valor: number;
    quantidade: number; // Campo de quantidade adicionado
    criadoEm: Date;
}

// Define o esquema do MongoDB para produtos
const ProdutoSchema: Schema = new Schema({
    nome: { type: String, required: true },
    valor: { type: Number, required: true },
    quantidade: { type: Number, required: true, default: 1 }, // Adiciona quantidade com valor padrão 1
    criadoEm: { type: Date, default: Date.now },
});

export default mongoose.model<IProduto>("Produto", ProdutoSchema);