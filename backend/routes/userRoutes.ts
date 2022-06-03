import express from 'express';
import { getUser, login, register } from '../controllers/userController';
import { protect } from '../middlewares/auth';

const router = express.Router();
router.route('/').post(register).get(protect, getUser);
router.route('/login').post(login);

export default router;
