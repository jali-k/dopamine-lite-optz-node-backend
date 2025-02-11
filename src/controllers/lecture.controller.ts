import { Request, Response } from 'express';
import { Lecture } from '../models/Lecture';
import { catchAsync } from '../utils/catchAsync';
import { ApiError } from '../middleware/error.midleware';
import { CreateLectureDTO, UpdateLectureDTO } from '../types/lecture.types';
import { Op } from 'sequelize';

export const lectureController = {
  getAllLectures: catchAsync(async (req: Request, res: Response) => {
    const lectures = await Lecture.findAll();
    res.json({ success: true, data: lectures });
  }),

  getLectureById: catchAsync(async (req: Request, res: Response) => {
    const lectureId = req.params.lectureId;
    const lecture = await Lecture.findByPk(lectureId);
    if (!lecture) {
      throw new ApiError(404, 'Lecture not found');
    }
    res.json({ success: true, data: lecture });
  }),

  getLectureByClassId: catchAsync(async (req: Request, res: Response) => {
    const classId = parseInt(req.query.classId as string, 10);
    const lectures = await Lecture.findAll({
      where: {
        classId: {
          [Op.eq]: classId,
        },
      },
    });

    if (!lectures || lectures.length === 0) {
      res.json({ success: true, data: null });
    }

    res.json({ success: true, data: lectures });
  }),

  createLecture: catchAsync(async (req: Request<{}, {}, CreateLectureDTO>, res: Response) => {
    const newLecture = await Lecture.create(req.body);
    res.status(201).json({ success: true, data: newLecture });
  }),

  updateLecture: catchAsync(async (req: Request<UpdateLectureDTO>, res: Response) => {
    const lectureId = req.params.lectureId;
    const [updatedRows] = await Lecture.update(req.body, {
      where: { lectureId: lectureId },
    });

    if (updatedRows === 0) {
      throw new ApiError(404, 'Lecture not found');
    }

    res.json({ success: true, message: 'Lecture updated successfully' });
  }),

  deleteLecture: catchAsync(async (req: Request, res: Response) => {
    const lectureId = req.params.lectureId;
    const deleted = await Lecture.destroy({
      where: { lectureId: lectureId },
    });

    if (!deleted) {
      throw new ApiError(404, 'Lecture not found');
    }

    res.json({ success: true, message: 'Lecture deleted successfully' });
  }),
};