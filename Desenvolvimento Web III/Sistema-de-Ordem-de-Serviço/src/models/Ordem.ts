import mongoose from 'mongoose';

const OrdemSchema=new mongoose.Schema({
  titulo:{type:String,required:true},
  descricao:{type:String,required:true},
  dataAbertura:{type:Date,default:Date.now},
  status:{type:String,required:true,enum:['aberta','em andamento','concluída']},
  prioridade:{type:String,required:true,enum:['baixa','média','alta']},
  responsavel:{type:String},
  setor:{type:String,required:true},
  prazo:{type:Date},
  valor:{type:Number,required:true}
});

export default mongoose.model('Ordem',OrdemSchema);
