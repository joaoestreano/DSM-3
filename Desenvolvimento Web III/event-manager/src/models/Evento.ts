// src/models/Evento.ts

import mongoose, { Document, Schema } from 'mongoose';

// 1. Interface para o Documento Evento (para uso com TypeScript)
export interface IEvento extends Document {
    titulo: string;
    descricao?: string; // opcional
    data: Date;
    local: string;
    valor: number;
}

// 2. Schema Mongoose com Validações
const EventoSchema: Schema = new Schema({
    titulo: {
        type: String,
        required: [true, 'O título do evento é obrigatório.'], // obrigatório
        trim: true,
    },
    descricao: {
        type: String,
        required: false, // opcional
    },
    data: {
        type: Date,
        required: [true, 'A data do evento é obrigatória.'], // obrigatório
    },
    local: {
        type: String,
        required: [true, 'O local do evento é obrigatório.'], // obrigatório
        trim: true,
    },
    valor: {
        type: Number,
        required: [true, 'O valor do evento é obrigatório.'], // obrigatório
        min: [0, 'O valor não pode ser negativo.'],
    },
}, {
    timestamps: true // Adiciona campos createdAt e updatedAt automaticamente
});

// 3. Modelo Mongoose
export default mongoose.model<IEvento>('Evento', EventoSchema);