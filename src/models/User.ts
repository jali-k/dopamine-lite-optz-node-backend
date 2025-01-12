import { Table, Model, Column, DataType, HasMany } from 'sequelize-typescript';
// import { VideoProgress } from './VideoProgress';
import { IUser, UserRole } from '../types/user.types';
import bcrypt from 'bcryptjs';

@Table({
  tableName: 'users',
  schema: 'dopamineLite',
  timestamps: true,
})
export class User extends Model<IUser> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  userID!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName!: string;

  @Column({
    type: DataType.ENUM(...Object.values(UserRole)),
    allowNull: false,
    defaultValue: UserRole.STUDENT,
  })
  role!: UserRole;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  isActive!: boolean;

  @Column(DataType.DATE)
  lastLogin?: Date;

  // @HasMany(() => VideoProgress)
  // videoProgress!: VideoProgress[];

  // Helper method to check if user has specific role
  hasRole(role: UserRole): boolean {
    return this.role === role;
  }

  // Helper method to check if user is admin
  isAdmin(): boolean {
    return this.role === UserRole.ADMIN;
  }

  // Hash password before saving
  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  // Compare password
  async comparePassword(candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
  }
}