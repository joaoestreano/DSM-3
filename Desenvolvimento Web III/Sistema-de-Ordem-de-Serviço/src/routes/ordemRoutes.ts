import {Router} from 'express';
import {criar,listar,atualizar,excluir} from '../controllers/ordemController';

const r=Router();

r.post('/',criar);
r.get('/',listar);
r.put('/:id',atualizar);
r.delete('/:id',excluir);

export default r;
