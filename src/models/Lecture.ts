import { Table, Model, Column, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Class } from './Class';
import { AccessGroup } from './AccessGroup';
import { ILecture, Month, Lesson, CreateLectureDTO } from '../types/lecture.types';
// import { VideoProgress } from './VideoProgress';

@Table({
  tableName: 'lectures',
  schema: 'dopamineLite',
  timestamps: true,
})
export class Lecture extends Model<ILecture, CreateLectureDTO> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  lectureID!: number;

  @ForeignKey(() => Class)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  classID!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title!: string;

  @Column(DataType.STRING)
  description?: string;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  date!: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  handler!: string;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  uploadedAt!: Date;

  @ForeignKey(() => AccessGroup)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  accessGroupID!: string;

  @Column({
    type: DataType.ENUM(...Object.values(Month)),
    allowNull: false,
  })
  belongingMonth!: Month;

  @Column({
    type: DataType.ENUM(...Object.values(Lesson)),
    allowNull: false,
  })
  belongingLesson!: Lesson;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    defaultValue: 0,
    comment: 'Video duration in seconds',
  })
  duration!: number;

  // @HasMany(() => VideoProgress)
  // videoProgress!: VideoProgress[];

  @BelongsTo(() => Class)
  class!: Class;

  @BelongsTo(() => AccessGroup)
  accessGroup!: AccessGroup;
}