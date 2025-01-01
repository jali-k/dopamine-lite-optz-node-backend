import { Router } from 'express';
import { accessGroupController } from '../controllers/accessGroup.controller';

const router = Router();

router.get('/', accessGroupController.getAllAccessGroups);
router.get('/:id', accessGroupController.getAccessGroupById);
router.post('/', accessGroupController.createAccessGroup);
router.put('/:id', accessGroupController.updateAccessGroup);
router.delete('/:id', accessGroupController.deleteAccessGroup);

export default router;