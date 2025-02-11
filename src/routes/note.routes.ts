import { Router } from 'express';
import { noteController } from '../controllers/note.controller';

const router = Router();

router.get('/', noteController.getAllNotes);
router.get('/:noteId', noteController.getNoteById);
router.post('/', noteController.createNote);
router.put('/:noteId', noteController.updateNote);
router.delete('/:noteId', noteController.deleteNote);
router.get('/class', noteController.getNoteByClassId);

export default router;