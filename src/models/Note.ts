import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Class } from './Class';
import { AccessGroup } from './AccessGroup';
import { CreateNoteDTO, INote } from '../types/note.types';
import { Month } from '../types/lecture.types';
import { Lesson } from '../types/lecture.types';

@Table({
  tableName: 'notes',
  schema: 'dopamineLite',
  timestamps: true,
})
export class Note extends Model<INote, CreateNoteDTO> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'noteId'
  })
  noteId!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'title'
  })
  title!: string;

  @Column(DataType.STRING)
  description?: string;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
    field: 'date'
  })
  date!: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'file'
  })
  file?: string;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
    field: 'uploadedAt'
  })
  uploadedAt!: Date;

  @ForeignKey(() => AccessGroup)
  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'accessGroupId'
  })
  accessGroupId!: string;

  @Column({
    type: DataType.ENUM(...Object.values(Month) as string[]),
    allowNull: false,
    field: 'belongingMonth'
  })
  belongingMonth!: Month;

  @Column({
    type: DataType.ENUM(...Object.values(Lesson) as string[]),
    allowNull: false,
    field: 'belongingLesson'
  })
  belongingLesson!: Lesson;

  @ForeignKey(() => Class)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'classId'
  })
  classId!: number;

  @BelongsTo(() => Class)
  class!: Class;

  @BelongsTo(() => AccessGroup)
  accessGroup!: AccessGroup;
}