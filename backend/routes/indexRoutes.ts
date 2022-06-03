import { Router } from 'express';
import userRoutes from './userRoutes';
import categoryRoutes from './categoryRoutes';
import notesRoutes from './noteRoutes';
const router = Router();

router.use('/users', userRoutes);
router.use('/notes', notesRoutes);

router.use('/category', categoryRoutes);

export default router;
