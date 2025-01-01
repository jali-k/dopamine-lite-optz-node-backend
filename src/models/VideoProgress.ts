// import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
// import { User } from './User';
// import { Lecture } from './Lecture';
// import { IVideoProgress } from '../types/videoProgress.types';

// @Table({
//   tableName: 'video_progress',
//   timestamps: true,
// })
// export class VideoProgress extends Model<IVideoProgress> {
//   @Column({
//     type: DataType.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   })
//   progressID!: number;

//   @ForeignKey(() => User)
//   @Column({
//     type: DataType.INTEGER,
//     allowNull: false,
//   })
//   userID!: number;

//   @ForeignKey(() => Lecture)
//   @Column({
//     type: DataType.INTEGER,
//     allowNull: false,
//   })
//   lectureID!: number;

//   @Column({
//     type: DataType.INTEGER,
//     allowNull: false,
//     defaultValue: 0,
//   })
//   watchedSeconds!: number;

//   @Column({
//     type: DataType.INTEGER,
//     allowNull: false,
//   })
//   totalSeconds!: number;

//   @Column({
//     type: DataType.BOOLEAN,
//     allowNull: false,
//     defaultValue: false,
//   })
//   completed!: boolean;

//   @Column({
//     type: DataType.DATE,
//     allowNull: false,
//     defaultValue: DataType.NOW,
//   })
//   lastWatchedAt!: Date;

//   @BelongsTo(() => User)
//   user!: User;

//   @BelongsTo(() => Lecture)
//   lecture!: Lecture;

//   // Helper method to calculate progress percentage
//   getProgressPercentage(): number {
//     return (this.watchedSeconds / this.totalSeconds) * 100;
//   }
// }