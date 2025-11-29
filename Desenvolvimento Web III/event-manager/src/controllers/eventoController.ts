// src/controllers/eventoController.ts

import { Request, Response } from 'express';
import Evento, { IEvento } from '../models/Evento';

// 1. Criar Evento (POST /api/eventos)
export const createEvento = async (req: Request, res: Response): Promise<void> => {
    try {
        const novoEvento: IEvento = new Evento(req.body);
        await novoEvento.save();
        res.status(201).json({
            message: '🎉 Evento adicionado com sucesso!', // Exibir mensagem de sucesso
            evento: novoEvento
        });
    } catch (error) {
        // Exibir mensagem de erro
        res.status(400).json({
            message: '❌ Erro ao criar evento.',
            error: (error as Error).message
        });
    }
};

// 2. Ler/Listar Eventos (GET /api/eventos)
export const getEventos = async (req: Request, res: Response): Promise<void> => {
    try {
        const { titulo } = req.query;
        let eventos: IEvento[];

        if (titulo) {
            // Pesquisar por título (case-insensitive)
            eventos = await Evento.find({
                titulo: { $regex: new RegExp(titulo as string, 'i') }
            });
            if (eventos.length === 0) {
                 res.status(404).json({ message: 'Nenhum evento encontrado com esse título.' });
                 return;
            }
        } else {
            // Listar todos os eventos
            eventos = await Evento.find();
        }

        res.status(200).json(eventos);
    } catch (error) {
        res.status(500).json({
            message: '❌ Erro ao buscar eventos.',
            error: (error as Error).message
        });
    }
};

// 3. Atualizar Evento (PUT /api/eventos/:id)
export const updateEvento = async (req: Request, res: Response): Promise<void> => {
    try {
        const eventoAtualizado = await Evento.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true } // Retorna o doc atualizado e roda validações
        );

        if (!eventoAtualizado) {
            res.status(404).json({ message: 'Evento não encontrado para atualização.' });
            return;
        }

        res.status(200).json({
            message: '✅ Informações do evento atualizadas com sucesso!', // Exibir mensagem de sucesso
            evento: eventoAtualizado
        });
    } catch (error) {
        res.status(400).json({
            message: '❌ Erro ao atualizar evento.',
            error: (error as Error).message
        });
    }
};

// 4. Excluir Evento (DELETE /api/eventos/:id)
export const deleteEvento = async (req: Request, res: Response): Promise<void> => {
    try {
        const eventoRemovido = await Evento.findByIdAndDelete(req.params.id);

        if (!eventoRemovido) {
            res.status(404).json({ message: 'Evento não encontrado para exclusão.' });
            return;
        }

        res.status(200).json({
            message: '🗑️ Evento removido com sucesso!', // Exibir mensagem de sucesso
            evento: eventoRemovido
        });
    } catch (error) {
        res.status(500).json({
            message: '❌ Erro ao remover evento.',
            error: (error as Error).message
        });
    }
};