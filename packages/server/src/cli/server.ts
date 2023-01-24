import * as bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { sequelize } from '../database/sequelize';
import { ChatController } from '../modules/chat/chat.controller';
import { ChatService } from '../modules/chat/chat.service';
import { UserController } from '../modules/users/user.controller';
import { UserService } from '../modules/users/user.service';
import { App } from './app';

export const server = {
	name: '--server',
	run: async (serverPort: number) => {
		await sequelize.sync({ force: true });

		const app = new App({
			controllers: [
				new ChatController({
					chatService: new ChatService(sequelize),
					userService: new UserService(sequelize),
				}),
				new UserController({
					userService: new UserService(sequelize),
				}),
			],
			middleWares: [
				cors({
					origin: true,
					credentials: true,
				}),
				express.json({ limit: '2MB' }),
				bodyParser.json(),
				bodyParser.urlencoded({ extended: true }),
			],
			port: serverPort,
		});

		app.listen();
	},
};
