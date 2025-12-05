import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import ordemRoutes from './routes/ordemRoutes';

dotenv.config();

const app=express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI!)
.then(()=>console.log("MongoDB conectado"))
.catch(err=>console.error(err));

app.use('/ordens',ordemRoutes);

app.listen(process.env.PORT,()=>console.log("Rodando em http://localhost:"+process.env.PORT));
