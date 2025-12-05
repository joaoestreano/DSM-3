import { Request, Response } from 'express';
import { Table } from '../models/Table.model';

export async function listTables(req: Request, res: Response) {
  const tables = await Table.find().sort({ number: 1 });
  return res.json({ tables });
}
