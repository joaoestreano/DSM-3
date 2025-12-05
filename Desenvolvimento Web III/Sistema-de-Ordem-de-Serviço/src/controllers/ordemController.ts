import {Request,Response} from 'express';
import Ordem from '../models/Ordem';
import mongoose from 'mongoose';

export async function criar(req:Request,res:Response){
  try{
    console.log("DADOS RECEBIDOS:", req.body);
    const ordem=await Ordem.create(req.body);
    res.status(201).json(ordem);
  }catch(e){
    console.error("ERRO AO CRIAR ORDEM:", e);
    if (e instanceof mongoose.Error.ValidationError) {
      const messages = Object.values(e.errors).map(val => (val as any).message);
      return res.status(400).json({ 
        message: "Erro de validação do Mongoose. Campos obrigatórios faltando ou inválidos.", 
        details: messages 
      });
    }

    // Outros erros
    res.status(400).json(e);
  }
}


export async function listar(req:Request,res:Response){
  const {titulo,status,prioridade,setor}=req.query;
  let filtro:any={};

  if(titulo) filtro.titulo={$regex:titulo as string,$options:'i'};
  if(status) filtro.status=status;
  if(prioridade) filtro.prioridade=prioridade;
  if(setor) filtro.setor=setor;

  const ordens=await Ordem.find(filtro);
  res.json(ordens);
}

export async function atualizar(req:Request,res:Response){
  try{
    const ordem=await Ordem.findByIdAndUpdate(req.params.id,req.body,{new:true});
    if(!ordem) return res.status(404).json({erro:"Não encontrada"});
    res.json(ordem);
  }catch(e){res.status(400).json(e);}
}

export async function excluir(req:Request,res:Response){
  try{
    const ordem=await Ordem.findByIdAndDelete(req.params.id);
    if(!ordem) return res.status(404).json({erro:"Não encontrada"});
    res.json({mensagem:"Excluída"});
  }catch(e){res.status(400).json(e);}
}