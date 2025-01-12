import { Router } from 'express';
import { accessGroupController } from '../controllers/accessGroup.controller';

const router = Router();

router.get('/', accessGroupController.getAllAccessGroups);
router.get('/:id', accessGroupController.getAccessGroupById);
router.post('/', accessGroupController.createAccessGroup);
router.put('/:accessGroupId', accessGroupController.updateAccessGroup);
router.delete('/:accessGroupId', accessGroupController.deleteAccessGroup);
router.get('/email/:email', accessGroupController.getAccessGroupsByEmail);

export default router;