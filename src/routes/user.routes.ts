import { Router } from 'express';
import { userController } from '../controllers/user.controller';

const router = Router();

router.get('/', userController.getAllUsers);
router.get('/email', userController.getUserAdmin);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.post('/:id/login', userController.updateLastLogin);

export default router;