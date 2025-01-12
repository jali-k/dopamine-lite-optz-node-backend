import { Router } from 'express';
import { lectureController } from '../controllers/lecture.controller';

const router = Router();

router.get('/', lectureController.getAllLectures);
router.get('/:id', lectureController.getLectureById);
router.post('/', lectureController.createLecture);
router.put('/:id', lectureController.updateLecture);
router.delete('/:id', lectureController.deleteLecture);
router.get('/class/:classId', lectureController.getLectureByClassId);

export default router;