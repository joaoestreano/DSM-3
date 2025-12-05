import { Request, Response } from 'express';
import dayjs from 'dayjs';
import { Reservation } from '../models/Reservation.model';
import { Table } from '../models/Table.model';

const DEFAULT_DURATION_MIN = 90;
const MIN_HOURS_AHEAD = 1;

function overlap(aStart: Date, aEnd: Date, bStart: Date, bEnd: Date) {
  return aStart < bEnd && bStart < aEnd;
}

export async function createReservation(req: Request, res: Response) {
  try {
    const { customerName, customerContact, tableNumber, people, start: startRaw, notes } = req.body;
    if (!customerName || !customerContact || !tableNumber || !people || !startRaw) {
      return res.status(400).json({ message: 'Dados incompletos.' });
    }

    const start = new Date(startRaw);
    if (isNaN(start.getTime())) return res.status(400).json({ message: 'Data inválida.' });

    // check min 1 hour ahead
    const now = dayjs();
    if (dayjs(start).isBefore(now.add(MIN_HOURS_AHEAD, 'hour'))) {
      return res.status(400).json({ message: `Reservas devem ser feitas com antecedência mínima de ${MIN_HOURS_AHEAD} hora(s).` });
    }

    // default end
    const end = dayjs(start).add(DEFAULT_DURATION_MIN, 'minute').toDate();

    // check table exists and capacity
    const table = await Table.findOne({ number: tableNumber });
    if (!table) return res.status(404).json({ message: 'Mesa não encontrada.' });
    if (people > table.capacity) return res.status(400).json({ message: 'Número de pessoas maior que a capacidade da mesa.' });

    // check for overlaps
    const existing = await Reservation.find({
      tableNumber,
      status: { $ne: 'cancelado' },
      $or: [
        { start: { $lt: end }, end: { $gt: start } }
      ]
    });

    if (existing.length > 0) {
      return res.status(409).json({ message: 'Já existe reserva/ocupação para essa mesa no horário informado.' });
    }

    const reservation = new Reservation({
      customerName,
      customerContact,
      tableNumber,
      people,
      start,
      end,
      notes,
      status: 'reservado'
    });
    await reservation.save();
    console.log('Reserva criada', reservation._id);
    return res.status(201).json({ message: 'Reserva criada com sucesso.', reservation });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ message: 'Erro interno.' });
  }
}

export async function listReservations(req: Request, res: Response) {
  try {
    const { customerName, tableNumber, date, status } = req.query;
    const filter: any = {};
    if (customerName) filter.customerName = { $regex: `${customerName}`, $options: 'i' };
    if (tableNumber) filter.tableNumber = Number(tableNumber);
    if (status) filter.status = status;
    if (date) {
      const dayStart = dayjs(String(date)).startOf('day').toDate();
      const dayEnd = dayjs(String(date)).endOf('day').toDate();
      filter.start = { $gte: dayStart, $lte: dayEnd };
    }
    const list = await Reservation.find(filter).sort({ start: 1 });
    return res.json({ reservations: list });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erro interno.' });
  }
}

export async function updateReservation(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const updates = req.body;
    // If updating start, re-run overlap checks and min-ahead rule
    if (updates.start) {
      const newStart = new Date(updates.start);
      const newEnd = updates.end ? new Date(updates.end) : dayjs(newStart).add(DEFAULT_DURATION_MIN, 'minute').toDate();
      // min ahead
      if (dayjs(newStart).isBefore(dayjs().add(MIN_HOURS_AHEAD, 'hour'))) {
        return res.status(400).json({ message: `Reservas devem ser feitas com antecedência mínima de ${MIN_HOURS_AHEAD} hora(s).` });
      }
      const reservation = await Reservation.findById(id);
      if (!reservation) return res.status(404).json({ message: 'Reserva não encontrada.' });
      // check capacity if people changed
      if (updates.people || updates.tableNumber) {
        const table = await Table.findOne({ number: updates.tableNumber ?? reservation.tableNumber });
        if (!table) return res.status(404).json({ message: 'Mesa não encontrada.' });
        if ((updates.people ?? reservation.people) > table.capacity) return res.status(400).json({ message: 'Número de pessoas maior que a capacidade da mesa.' });
      }
      // overlap
      const conflicts = await Reservation.find({
        _id: { $ne: id },
        tableNumber: updates.tableNumber ?? reservation.tableNumber,
        status: { $ne: 'cancelado' },
        $or: [{ start: { $lt: newEnd }, end: { $gt: newStart } }]
      });
      if (conflicts.length > 0) return res.status(409).json({ message: 'Conflito de horário com outra reserva.' });
      updates.end = newEnd;
    }
    const updated = await Reservation.findByIdAndUpdate(id, updates, { new: true });
    if (!updated) return res.status(404).json({ message: 'Reserva não encontrada.' });
    console.log('Reserva atualizada', id);
    return res.json({ message: 'Reserva atualizada', reservation: updated });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erro interno.' });
  }
}

export async function cancelReservation(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const updated = await Reservation.findByIdAndUpdate(id, { status: 'cancelado' }, { new: true });
    if (!updated) return res.status(404).json({ message: 'Reserva não encontrada.' });
    console.log('Reserva cancelada', id);
    return res.json({ message: 'Reserva cancelada', reservation: updated });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erro interno.' });
  }
}

// utility to update statuses according to current time
export async function refreshStatuses() {
  const now = new Date();
  // ocupado: start <= now < end
  await Reservation.updateMany({ start: { $lte: now }, end: { $gt: now }, status: { $ne: 'cancelado' } }, { status: 'ocupado' });
  // finalizado: end <= now
  await Reservation.updateMany({ end: { $lte: now }, status: { $nin: ['finalizado','cancelado'] } }, { status: 'finalizado' });
  // reservado: start > now
  await Reservation.updateMany({ start: { $gt: now }, status: { $nin: ['reservado','cancelado'] } }, { status: 'reservado' });
}
