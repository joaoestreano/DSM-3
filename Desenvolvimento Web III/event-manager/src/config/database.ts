// src/config/database.ts

import mongoose from 'mongoose';

const DB_NAME = 'evento';
const MONGO_URI = `mongodb://localhost:27017/${DB_NAME}`; // Substitua a porta e host se necessário

export const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('✅ Conectado ao MongoDB com sucesso!');
    } catch (error) {
        console.error('❌ Erro de conexão com o MongoDB:', error);
        process.exit(1); // Encerra a aplicação em caso de erro
    }
};