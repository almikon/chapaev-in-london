import * as bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { sequelize } from '../database/sequelize';
import { ChatController } from '../modules/chat/chat.controller';
import { ChatService } from '../modules/chat/chat.service';
import { CommentsService } from '../modules/comments/comments.service';
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
					commentsService: new CommentsService(sequelize),
				})
			],
			middleWares: [
				cors({
					origin: true,
					credentials: true
				}),
				express.json({ limit: '2MB' }),
				bodyParser.json(),
				bodyParser.urlencoded({ extended: true })
			],
			port: serverPort
		});

		app.listen();
	}
};
