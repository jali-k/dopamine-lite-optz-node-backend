import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Class } from './Class';
import { AccessGroup } from './AccessGroup';
import { ILecture, Month, Lesson, CreateLectureDTO } from '../types/lecture.types';

@Table({
  tableName: 'lectures',
  schema: 'dopamineLite',
  timestamps: false, 
})
export class Lecture extends Model<ILecture, CreateLectureDTO> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'lectureid', 
  })
  lectureID!: number;

  @ForeignKey(() => Class)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'classid', 
  })
  classID!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'title',
  })
  title!: string;

  @Column({
    type: DataType.TEXT,
    field: 'description',
  })
  description?: string;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
    field: 'date', 
  })
  date!: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'handler', 
  })
  handler!: string;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
    field: 'uploadedat', 
  })
  uploadedAt!: Date;

  @ForeignKey(() => AccessGroup)
  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'accessgroupid', 
  })
  accessGroupID!: string;

  @Column({
    type: DataType.ENUM(...Object.values(Month)),
    allowNull: false,
    field: 'belongingmonth', 
  })
  belongingMonth!: Month;

  @Column({
    type: DataType.ENUM(...Object.values(Lesson)),
    allowNull: false,
    field: 'belonginglesson',
  })
  belongingLesson!: Lesson;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    defaultValue: 0,
    field: 'duration', 
  })
  duration!: number;

  // @HasMany(() => VideoProgress)
  // videoProgress!: VideoProgress[];

  @BelongsTo(() => Class)
  class!: Class;

  @BelongsTo(() => AccessGroup)
  accessGroup!: AccessGroup;
}