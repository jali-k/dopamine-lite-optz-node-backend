import { Lesson, Month } from "./lecture.types";

export interface INote {
  noteId: number;
  title: string;
  description?: string;
  date: Date;
  file?: string;
  uploadedAt: Date;
  accessGroupID: string;
  belongingMonth: Month;
  belongingLesson: Lesson;
  classIs: number;
}

export type CreateNoteDTO = Omit<INote, 'NoteID' | 'uploadedAt'>;
export type UpdateNoteDTO = Partial<INote>;