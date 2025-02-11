import { Router } from 'express';
import { classController } from '../controllers/class.controller';

const router = Router();

router.get('/name', classController.getClassByName);
router.get('/', classController.getAllClasses);
router.get('/:classId', classController.getClassById);
router.post('/', classController.createClass);
router.put('/:classId', classController.updateClass);
router.delete('/:classId', classController.deleteClass);

export default router;