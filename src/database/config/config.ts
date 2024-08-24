import { Dialect } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const config: { url: string, dialect: Dialect } = {
    url: process.env.DATABASE_URL || '',
    dialect: 'postgres'
}