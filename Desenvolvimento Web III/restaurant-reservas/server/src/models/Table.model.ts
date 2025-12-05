import { Schema, model } from 'mongoose';

export interface ITable {
  number: number;
  capacity: number;
  location: string;
}

const TableSchema = new Schema<ITable>({
  number: { type: Number, required: true, unique: true },
  capacity: { type: Number, required: true },
  location: { type: String, required: true }
});

export const Table = model<ITable>('Table', TableSchema);
