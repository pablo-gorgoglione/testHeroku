import { Router } from 'express';
import userRoutes from './userRoutes';
import notesRoutes from './noteRoutes';
const router = Router();

router.use('/users', userRoutes);
router.use('/notes', notesRoutes);

export default router;
