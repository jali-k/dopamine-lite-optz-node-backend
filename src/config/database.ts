import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import { AccessGroup } from '../models/AccessGroup';
import { Class } from '../models/Class';
import { Lecture } from '../models/Lecture';
// import { Note } from '../models/Note';

dotenv.config();

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  dialect: 'postgres',
  // models: [Class, Lecture, AccessGroup, Note],
  models: [Class, Lecture, AccessGroup],
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export default sequelize;