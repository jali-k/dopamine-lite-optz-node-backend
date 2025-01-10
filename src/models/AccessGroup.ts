import { Table, Model, Column, DataType, HasMany } from 'sequelize-typescript';
import { Lecture } from './Lecture';
// import { Note } from './Note';
import { IAccessGroup } from '../types/accessGroup.types';

@Table({
  tableName: 'access_groups',
  schema: 'dopamineLite',
  timestamps: true,
})
export class AccessGroup extends Model<IAccessGroup> {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
    field: 'accessgroupid', 
  })
  accessGroupID!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'name', 
  })
  name!: string;

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    defaultValue: [],
    field: 'accesslist', 
  })
  accessList!: string[];

  @HasMany(() => Lecture)
  lectures!: Lecture[];

  // @HasMany(() => Note)
  // notes!: Note[];
}