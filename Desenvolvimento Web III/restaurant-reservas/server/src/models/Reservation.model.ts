import { Schema, model } from 'mongoose';

export type Status = 'reservado'|'ocupado'|'finalizado'|'cancelado';

export interface IReservation {
  customerName: string;
  customerContact: string;
  tableNumber: number;
  people: number;
  start: Date;
  end: Date;
  notes?: string;
  status: Status;
  createdAt?: Date;
}

const ReservationSchema = new Schema<IReservation>({
  customerName: { type: String, required: true },
  customerContact: { type: String, required: true },
  tableNumber: { type: Number, required: true },
  people: { type: Number, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  notes: { type: String },
  status: { type: String, enum: ['reservado','ocupado','finalizado','cancelado'], default: 'reservado' },
  createdAt: { type: Date, default: () => new Date() }
});

// index to speed queries by table and time
ReservationSchema.index({ tableNumber: 1, start: 1, end: 1 });

export const Reservation = model<IReservation>('Reservation', ReservationSchema);
