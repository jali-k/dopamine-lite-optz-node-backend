// import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
// import { Class } from './Class';
// import { AccessGroup } from './AccessGroup';
// import { INote, Month, Lesson } from '../types/note.types';

// @Table({
//   tableName: 'notes',
//   timestamps: true,
// })
// export class Note extends Model<INote> {
//   @Column({
//     type: DataType.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   })
//   NoteID!: number;

//   @Column({
//     type: DataType.STRING,
//     allowNull: false,
//   })
//   title!: string;

//   @Column(DataType.STRING)
//   description?: string;

//   @Column({
//     type: DataType.DATE,
//     defaultValue: DataType.NOW,
//   })
//   date!: Date;

//   @Column(DataType.STRING)
//   file?: string;

//   @Column({
//     type: DataType.DATE,
//     defaultValue: DataType.NOW,
//   })
//   uploadedAt!: Date;

//   @ForeignKey(() => AccessGroup)
//   @Column({
//     type: DataType.STRING,
//     allowNull: false,
//   })
//   accessGroupID!: string;

//   @Column({
//     type: DataType.ENUM(...Object.values(Month)),
//     allowNull: false,
//   })
//   belongingMonth!: Month;

//   @Column({
//     type: DataType.ENUM(...Object.values(Lesson)),
//     allowNull: false,
//   })
//   belongingLesson!: Lesson;

//   @ForeignKey(() => Class)
//   @Column({
//     type: DataType.INTEGER,
//     allowNull: false,
//   })
//   classID!: number;

//   @BelongsTo(() => Class)
//   class!: Class;

//   @BelongsTo(() => AccessGroup)
//   accessGroup!: AccessGroup;
// }