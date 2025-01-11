import { Request, Response } from 'express';
import { Note } from '../models/Note';
import { catchAsync } from '../utils/catchAsync';
import { ApiError } from '../middleware/error.midleware';
import { CreateNoteDTO, UpdateNoteDTO } from '../types/note.types';

export const noteController = {
  getAllNotes: catchAsync(async(req: Request, res: Response) => {
    const notes = await Note.findAll();
    res.json({ success: true, data: notes });
  }),

  getNoteById: catchAsync(async(req: Request, res: Response) => {
    const note = await Note.findByPk(req.params.id);
    if (!note) {
      throw new ApiError(404, 'Note not found');
    }
    res.json({ success: true, data: note });
  }),

  createNote: catchAsync(async(req: Request<{}, {}, CreateNoteDTO>, res: Response) => {
    const newNote = await Note.create(req.body);
    res.status(201).json({ success: true, data: newNote });
  }),

  updateNote: catchAsync(async(req: Request<UpdateNoteDTO>, res: Response) => {
    const [updatedRows] = await Note.update(req.body, {
      where: { noteId: req.params.noteId },
    });

    if (updatedRows === 0) {
      throw new ApiError(404, 'Note not found');
    }

    res.json({ success: true, message: 'Note updated successfully' });
  }),

  deleteNote: catchAsync(async(req: Request, res: Response) => {
    const deleted = await Note.destroy({
      where: { noteId: req.params.id },
    });

    if (!deleted) {
      throw new ApiError(404, 'Note not found');
    }

    res.json({ success: true, message: 'Note deleted successfully' });
  }),

}