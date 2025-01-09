import { Lesson, Month } from "./lecture.types";

export interface INote {
  NoteID: number;
  title: string;
  description?: string;
  date: Date;
  file?: string;
  uploadedAt: Date;
  accessGroupID: string;
  belongingMonth: Month;
  belongingLesson: Lesson;
  classID: number;
}

export type CreateNoteDTO = Omit<INote, 'NoteID' | 'uploadedAt'>;
export type UpdateNoteDTO = Partial<INote>;