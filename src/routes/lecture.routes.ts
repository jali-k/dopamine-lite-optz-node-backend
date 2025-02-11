import { Router } from 'express';
import { lectureController } from '../controllers/lecture.controller';

const router = Router();

router.get('/', lectureController.getAllLectures);
router.get('/:lectureId', lectureController.getLectureById);
router.post('/', lectureController.createLecture);
router.put('/:lectureId', lectureController.updateLecture);
router.delete('/:lectureId', lectureController.deleteLecture);
router.get('/class', lectureController.getLectureByClassId);

export default router;