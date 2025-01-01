import { Table, Model, Column, DataType, HasMany } from 'sequelize-typescript';
import { Lecture } from './Lecture';
// import { Note } from './Note';
import { IAccessGroup } from '../types/accessGroup.types';

@Table({
  tableName: 'access_groups',
  timestamps: true,
})
export class AccessGroup extends Model<IAccessGroup> {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
  })
  accessGroupID!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    defaultValue: [],
  })
  accessList!: string[];

  @HasMany(() => Lecture)
  lectures!: Lecture[];

  // @HasMany(() => Note)
  // notes!: Note[];
}