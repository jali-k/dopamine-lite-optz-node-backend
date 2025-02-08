import { Request, Response } from 'express';
import { Class } from '../models/Class';
import { catchAsync } from '../utils/catchAsync';
import { ApiError } from '../middleware/error.midleware';
import { CreateClassDTO, UpdateClassDTO } from '../types/class.types';
import { Op } from 'sequelize';

export const classController = {
  getAllClasses: catchAsync(async (req: Request, res: Response) => {
    const classes = await Class.findAll();
    res.json({ success: true, data: classes });
  }),

  getClassById: catchAsync(async (req: Request, res: Response) => {
    const classItem = await Class.findByPk(req.params.classId);
    if (!classItem) {
      throw new ApiError(404, 'Class not found');
    }
    res.json({ success: true, data: classItem });
  }),

  getClassByName: catchAsync(async (req: Request, res: Response) => {
    const className = req.query.name as string;
    console.log(className);
    const classItem = await Class.findOne({
      where: {
        name: {
          [Op.iLike]: `%${className}%`,
        },
      },
    });
  
    if (!classItem) {
      throw new ApiError(404, 'Class not found');
    }
  
    res.json({ success: true, data: classItem });
  }),

  createClass: catchAsync(async (req: Request<{}, {}, CreateClassDTO>, res: Response) => {
    const newClass = await Class.create(req.body);
    res.status(201).json({ success: true, data: newClass });
  }),

  updateClass: catchAsync(async (req: Request<UpdateClassDTO>, res: Response) => {
    const [updatedRows] = await Class.update(req.body, {
      where: { classId: req.params.classId },
    });

    if (updatedRows === 0) {
      throw new ApiError(404, 'Class not found');
    }

    res.json({ success: true, message: 'Class updated successfully' });
  }),

  deleteClass: catchAsync(async (req: Request, res: Response) => {
    const deleted = await Class.destroy({
      where: { classId: req.params.classId },
    });

    if (!deleted) {
      throw new ApiError(404, 'Class not found');
    }

    res.json({ success: true, message: 'Class deleted successfully' });
  }),
};