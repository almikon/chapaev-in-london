import { config } from 'dotenv';
import type { Dialect } from 'sequelize/types/sequelize';
import { ARGV_INDEX } from '../assets/constants';

config({
	path: '../../.env'
});

// команда запуска сервиса
export const ARGUMENTS = process.argv.slice(ARGV_INDEX);
export const SERVER_PORT = Number(process.env.SERVER_PORT) || 3001;

export const DB_DIALECT: Dialect =
  (process.env.DB_DIALECT as Dialect) || 'postgres';
export const DB_NAME = process.env.DB_NAME;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_PORT: number = Number(process.env.DB_PORT) || 5432;
export const DB_HOST = process.env.DB_HOST;
