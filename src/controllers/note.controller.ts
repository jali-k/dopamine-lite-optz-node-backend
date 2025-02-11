import { Request, Response } from 'express';
import { Note } from '../models/Note';
import { catchAsync } from '../utils/catchAsync';
import { ApiError } from '../middleware/error.midleware';
import { CreateNoteDTO, UpdateNoteDTO } from '../types/note.types';
import { Op } from 'sequelize';

export const noteController = {
  getAllNotes: catchAsync(async(req: Request, res: Response) => {
    const notes = await Note.findAll();
    res.json({ success: true, data: notes });
  }),

  getNoteById: catchAsync(async(req: Request, res: Response) => {
    const noteId = req.params.noteId;
    const note = await Note.findByPk(noteId);
    if (!note) {
      throw new ApiError(404, 'Note not found');
    }
    res.json({ success: true, data: note });
  }),

  getNoteByClassId: catchAsync(async (req: Request, res: Response) => {
    const classId = parseInt(req.query.classId as string, 10);
    const lectures = await Note.findAll({
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

  createNote: catchAsync(async(req: Request<{}, {}, CreateNoteDTO>, res: Response) => {
    const newNote = await Note.create(req.body);
    res.status(201).json({ success: true, data: newNote });
  }),

  updateNote: catchAsync(async(req: Request<UpdateNoteDTO>, res: Response) => {
    const noteId = req.params.noteId;
    const [updatedRows] = await Note.update(req.body, {
      where: { noteId: noteId },
    });

    if (updatedRows === 0) {
      throw new ApiError(404, 'Note not found');
    }

    res.json({ success: true, message: 'Note updated successfully' });
  }),

  deleteNote: catchAsync(async(req: Request, res: Response) => {
    const noteId = req.params.noteId;
    const deleted = await Note.destroy({
      where: { noteId: noteId },
    });

    if (!deleted) {
      throw new ApiError(404, 'Note not found');
    }

    res.json({ success: true, message: 'Note deleted successfully' });
  }),

}