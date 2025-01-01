import { Request, Response } from 'express';
import { Lecture } from '../models/Lecture';
import { catchAsync } from '../utils/catchAsync';
import { ApiError } from '../middleware/error.midleware';
import { CreateLectureDTO, UpdateLectureDTO } from '../types/lecture.types';

export const lectureController = {
  getAllLectures: catchAsync(async (req: Request, res: Response) => {
    const lectures = await Lecture.findAll();
    res.json({ success: true, data: lectures });
  }),

  getLectureById: catchAsync(async (req: Request, res: Response) => {
    const lecture = await Lecture.findByPk(req.params.id);
    if (!lecture) {
      throw new ApiError(404, 'Lecture not found');
    }
    res.json({ success: true, data: lecture });
  }),

  createLecture: catchAsync(async (req: Request<{}, {}, CreateLectureDTO>, res: Response) => {
    const newLecture = await Lecture.create(req.body);
    res.status(201).json({ success: true, data: newLecture });
  }),

  updateLecture: catchAsync(async (req: Request<UpdateLectureDTO>, res: Response) => {
    const [updatedRows] = await Lecture.update(req.body, {
      where: { lectureID: req.params.lectureID },
    });

    if (updatedRows === 0) {
      throw new ApiError(404, 'Lecture not found');
    }

    res.json({ success: true, message: 'Lecture updated successfully' });
  }),

  deleteLecture: catchAsync(async (req: Request, res: Response) => {
    const deleted = await Lecture.destroy({
      where: { lectureID: req.params.id },
    });

    if (!deleted) {
      throw new ApiError(404, 'Lecture not found');
    }

    res.json({ success: true, message: 'Lecture deleted successfully' });
  }),
};