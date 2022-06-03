import express from 'express';
import { getCategories, seedCategory } from '../controllers/categoryController';

const router = express.Router();
router.route('/').get(getCategories);
router.route('/seed').get(seedCategory);

export default router;
