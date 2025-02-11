import { Router } from 'express';
import { lectureController } from '../controllers/lecture.controller';

const router = Router();

router.get('/', lectureController.getAllLectures);
router.get('/class', lectureController.getLectureByClassId);
router.get('/:lectureId', lectureController.getLectureById);
router.post('/', lectureController.createLecture);
router.put('/:lectureId', lectureController.updateLecture);
router.delete('/:lectureId', lectureController.deleteLecture);

export default router;