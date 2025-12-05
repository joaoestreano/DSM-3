import { Router } from 'express';
import { createReservation, listReservations, updateReservation, cancelReservation } from '../controllers/reservationsController';
const router = Router();

router.post('/', createReservation);
router.get('/', listReservations);
router.put('/:id', updateReservation);
router.delete('/:id', cancelReservation);

export default router;
