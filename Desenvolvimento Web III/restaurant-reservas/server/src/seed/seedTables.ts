import { connectDB } from '../db';
import { Table } from '../models/Table.model';

const MONGO = process.env.MONGO_URI ?? 'mongodb://localhost:27017/reserva';

const seed = async () => {
  await connectDB(MONGO);
  const defaultTables = [
    { number: 1, capacity: 2, location: 'salão' },
    { number: 2, capacity: 2, location: 'salão' },
    { number: 3, capacity: 4, location: 'varanda' },
    { number: 4, capacity: 4, location: 'varanda' },
    { number: 5, capacity: 6, location: 'área interna' },
    { number: 6, capacity: 8, location: 'área interna' }
  ];
  for (const t of defaultTables) {
    await Table.updateOne({ number: t.number }, t, { upsert: true });
  }
  console.log('Tabelas seed concluído.');
  process.exit(0);
};

seed().catch(console.error);
