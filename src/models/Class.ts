import { Table, Model, Column, DataType, HasMany } from 'sequelize-typescript';
import { Lecture } from './Lecture';
// import { Note } from './Note';
import { CreateClassDTO, IClass } from '../types/class.types';

@Table({
  tableName: 'classes',
  schema: 'dopamineLite',
  timestamps: true,
})
export class Class extends Model<IClass, CreateClassDTO> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  classID!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @HasMany(() => Lecture)
  lectures!: Lecture[];

  // @HasMany(() => Note)
  // notes!: Note[];
}