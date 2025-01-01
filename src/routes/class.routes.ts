import { Router } from 'express';
import { classController } from '../controllers/class.controller';

const router = Router();

router.get('/', classController.getAllClasses);
router.get('/:id', classController.getClassById);
router.post('/', classController.createClass);
router.put('/:id', classController.updateClass);
router.delete('/:id', classController.deleteClass);

export default router;