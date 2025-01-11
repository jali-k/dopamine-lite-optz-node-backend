import { Router } from 'express';
import classRoutes from './class.routes';
import lectureRoutes from './lecture.routes';
import accessGroupRoutes from './accessGroup.routes';
import noteRoutes from './note.routes';
import userRoutes from './user.routes';
// import videoProgressRoutes from './videoProgress.routes';

const router = Router();

router.use('/classes', classRoutes);
router.use('/lectures', lectureRoutes);
router.use('/access-groups', accessGroupRoutes);
router.use('/notes', noteRoutes);
router.use('/users', userRoutes);

export default router;