import { Router } from 'express';
import { listTables } from '../controllers/tablesController';
const router = Router();
router.get('/', listTables);
export default router;
