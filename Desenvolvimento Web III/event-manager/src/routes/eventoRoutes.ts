// src/routes/eventoRoutes.ts

import { Router } from 'express';
import {
    createEvento,
    getEventos,
    updateEvento,
    deleteEvento
} from '../controllers/eventoController';

const router = Router();

// Rotas CRUD
router.post('/', createEvento); // Criar: POST /api/eventos
router.get('/', getEventos);    // Leia: GET /api/eventos (listar todos ou pesquisar por título)
router.put('/:id', updateEvento); // Atualização: PUT /api/eventos/:id
router.delete('/:id', deleteEvento); // Excluir: DELETE /api/eventos/:id

export default router;