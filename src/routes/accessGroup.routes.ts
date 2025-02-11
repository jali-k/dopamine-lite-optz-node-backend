import { Router } from 'express';
import { accessGroupController } from '../controllers/accessGroup.controller';

const router = Router();

router.get('/', accessGroupController.getAllAccessGroups);
router.get('/:accessGroupId', accessGroupController.getAccessGroupById);
router.post('/', accessGroupController.createAccessGroup);
router.put('/:accessGroupId', accessGroupController.updateAccessGroup);
router.delete('/:accessGroupId', accessGroupController.deleteAccessGroup);
router.get('/email', accessGroupController.getAccessGroupsByEmail);

export default router;