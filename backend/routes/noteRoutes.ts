import express from 'express';
import {
  deleteNote,
  getNotesArchived,
  getNotesNotArchived,
  postNote,
  putNote,
} from '../controllers/noteController';
import { protect } from '../middlewares/auth';

const router = express.Router();
router.route('/').get(protect, getNotesNotArchived).post(protect, postNote);
router.route('/archived').get(protect, getNotesArchived);
router.route('/:id').put(protect, putNote).delete(protect, deleteNote);

export default router;
