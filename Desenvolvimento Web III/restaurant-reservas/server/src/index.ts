import express from 'express';
import path from 'path';
import morgan from 'morgan';
import cors from 'cors';
import { connectDB } from './db';
import reservationsRoutes from './routes/reservations';
import tablesRoutes from './routes/tables';
import { refreshStatuses } from './controllers/reservationsController';

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const MONGO = process.env.MONGO_URI ?? 'mongodb://localhost:27017/reserva';
const PORT = Number(process.env.PORT ?? 3000);

(async () => {
  await connectDB(MONGO);

  app.use('/api/reservations', reservationsRoutes);
  app.use('/api/tables', tablesRoutes);

  // serve frontend build (client/dist) placed into server/public
  const staticPath = path.join(__dirname, '..', 'public');
  app.use(express.static(staticPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(staticPath, 'index.html'));
  });

  // refresh statuses every 60s
  setInterval(() => {
    refreshStatuses().catch(console.error);
  }, 60 * 1000);

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
})();
