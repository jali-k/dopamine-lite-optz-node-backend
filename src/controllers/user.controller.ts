import { Request, Response } from 'express';
import { User } from '../models/User';
import { catchAsync } from '../utils/catchAsync';
import { ApiError } from '../middleware/error.midleware';
import { CreateUserDTO, UpdateUserDTO, UserRole } from '../types/user.types';

export const userController = {
  getAllUsers: catchAsync(async (req: Request, res: Response) => {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }
    });
    res.json({ success: true, data: users });
  }),

  getUserById: catchAsync(async (req: Request, res: Response) => {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] }
    });
    if (!user) {
      throw new ApiError(404, 'User not found');
    }
    res.json({ success: true, data: user });
  }),

  getUserAdmin: catchAsync(async (req: Request, res: Response) => {
    const email = req.query.email as string;
    const user = await User.findOne({
      where: { email },
      attributes: ['role']
    });
    if (!user) {
      throw new ApiError(404, 'User not found');
    }
    res.json({ success: true, data: { role: user.role } });
  }),

  createUser: catchAsync(async (req: Request<{}, {}, CreateUserDTO>, res: Response) => {
    const { password, ...userData } = req.body;
    const hashedPassword = await User.hashPassword(password);

    const newUser = await User.create({
      ...userData,
      password: hashedPassword,
      userID: 0,
      role: UserRole.STUDENT,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const userWithoutPassword = {
      ...newUser.toJSON(),
      password: undefined
    };

    res.status(201).json({ success: true, data: userWithoutPassword });
  }),

  updateUser: catchAsync(async (req: Request, res: Response) => {
    const { password, ...updateData } = req.body;

    if (password) {
      updateData.password = await User.hashPassword(password);
    }

    const [updatedRows] = await User.update(updateData, {
      where: { userID: req.params.id }
    });

    if (updatedRows === 0) {
      throw new ApiError(404, 'User not found');
    }

    res.json({ success: true, message: 'User updated successfully' });
  }),

  deleteUser: catchAsync(async (req: Request, res: Response) => {
    const deleted = await User.destroy({
      where: { userID: req.params.id }
    });

    if (!deleted) {
      throw new ApiError(404, 'User not found');
    }

    res.json({ success: true, message: 'User deleted successfully' });
  }),

  updateLastLogin: catchAsync(async (req: Request, res: Response) => {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    user.lastLogin = new Date();
    await user.save();

    res.json({ success: true, message: 'Last login updated successfully' });
  })
};