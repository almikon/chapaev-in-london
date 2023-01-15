import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
// import { DB_DIALECT, DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from '../config/config.env';
import { ChatEntity } from '../modules/chat/chat.entity';
import { UserEntity } from '../modules/users/user.entity';

const DB_DIALECT = 'postgres';
const DB_NAME = 'chapaev';
const DB_USER = 'postgres';
const DB_PASSWORD = '7896348ZW';
const DB_HOST = 'localhost';
const DB_PORT = 5432;
const somethingIsNotDefined = [DB_DIALECT, DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT].some((it) => it === undefined);

console.log('DB_DIALECT, DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT', DB_DIALECT, DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT);
if (somethingIsNotDefined) {
	throw new Error('One or more ronmental variables are not defined');
}

const sequelizeOptions: SequelizeOptions = {
	host: DB_HOST,
	port: DB_PORT,
	username: DB_USER,
	password: DB_PASSWORD,
	database: DB_NAME,
	dialect: DB_DIALECT,
	models: [ChatEntity, UserEntity]
};

const sequelize = new Sequelize(sequelizeOptions);

export { sequelize };
